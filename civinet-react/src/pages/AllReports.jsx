import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIncidents } from '../hooks/useIncidents';
import { useNotification } from '../hooks/useNotification';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useSidebar } from '../contexts/SidebarContext';

const AllReports = () => {
  const { isOpen } = useSidebar();
  const { reports, filterReports, getStats, deleteReport } = useIncidents();
  const [activeFilter, setActiveFilter] = useState('all');
  const [reportToDelete, setReportToDelete] = useState(null);
  const filteredReports = filterReports(activeFilter);
  const stats = getStats();
  const { notifications, showNotification, removeNotification } = useNotification();

  const handleDeleteClick = (report) => {
    setReportToDelete(report);
  };

  const confirmDelete = (deleteData) => {
    if (reportToDelete) {
      deleteReport(reportToDelete.id);
      const reasonLabels = {
        'resolved': 'Issue Resolved',
        'duplicate': 'Duplicate Report',
        'spam': 'Spam/Fake',
        'wrong_location': 'Wrong Location',
        'mistake': 'Posted by Mistake',
        'other': 'Other Reason'
      };
      showNotification(`Report deleted: ${reasonLabels[deleteData.reason]}`, 'success');
      setReportToDelete(null);
    }
  };

  const cancelDelete = () => {
    setReportToDelete(null);
  };

  const handleFileComplaint = (complaintData) => {
    showNotification('Complaint filed successfully. Our team will review it shortly.', 'success');
    setReportToDelete(null);
    console.log('Complaint filed:', complaintData);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'solved': return '#22c55e';
      case 'pending': return '#eab308';
      case 'in-progress': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'solved': return 'Solved';
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      default: return status;
    }
  };

  const getStatusAnimation = (status) => {
    switch(status) {
      case 'solved':
        return {
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 10px rgba(34, 197, 94, 0.3)',
            '0 0 20px rgba(34, 197, 94, 0.6)',
            '0 0 10px rgba(34, 197, 94, 0.3)'
          ]
        };
      case 'in-progress':
        return {
          scale: [1, 1.02, 1],
          boxShadow: [
            '0 0 8px rgba(59, 130, 246, 0.3)',
            '0 0 15px rgba(59, 130, 246, 0.5)',
            '0 0 8px rgba(59, 130, 246, 0.3)'
          ]
        };
      case 'pending':
        return {
          scale: [1, 1.01, 1],
          boxShadow: [
            '0 0 5px rgba(234, 179, 8, 0.2)',
            '0 0 10px rgba(234, 179, 8, 0.4)',
            '0 0 5px rgba(234, 179, 8, 0.2)'
          ]
        };
      default:
        return {};
    }
  };

  return (
    <>
      <Sidebar />
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
      {reportToDelete && (
        <DeleteConfirmationModal
          reportTitle={reportToDelete.title}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          onFileComplaint={handleFileComplaint}
        />
      )}
      <div className={`flex flex-col min-h-screen has-bottom-nav main-content-with-sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`}>
      <header className="header-sticky">
        <div className="p-4">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-lg font-bold">My Reports</h1>
          </div>

          <motion.div 
            className="bg-white rounded-lg p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <motion.div
                animate={stats.solved >= 10 ? {
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0px rgba(34, 197, 94, 0)',
                    '0 0 20px rgba(34, 197, 94, 0.6)',
                    '0 0 0px rgba(34, 197, 94, 0)'
                  ]
                } : stats.solved >= 5 ? {
                  scale: [1, 1.02, 1],
                  boxShadow: [
                    '0 0 0px rgba(34, 197, 94, 0)',
                    '0 0 10px rgba(34, 197, 94, 0.4)',
                    '0 0 0px rgba(34, 197, 94, 0)'
                  ]
                } : {}}
                transition={{ duration: stats.solved >= 10 ? 2 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ padding: '0.5rem', borderRadius: '8px' }}
              >
                <motion.p 
                  className="text-2xl font-bold" 
                  style={{color: '#22c55e'}}
                  animate={stats.solved >= 10 ? {
                    textShadow: [
                      '0 0 10px rgba(34, 197, 94, 0.3)',
                      '0 0 20px rgba(34, 197, 94, 0.7)',
                      '0 0 10px rgba(34, 197, 94, 0.3)'
                    ]
                  } : stats.solved >= 5 ? {
                    textShadow: [
                      '0 0 5px rgba(34, 197, 94, 0.2)',
                      '0 0 12px rgba(34, 197, 94, 0.5)',
                      '0 0 5px rgba(34, 197, 94, 0.2)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {stats.solved >= 10 && (
                    <motion.span 
                      style={{display: 'inline-block', marginRight: '8px', fontSize: '1.5rem'}}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      🏆
                    </motion.span>
                  )}
                  {stats.solved >= 5 && stats.solved < 10 && (
                    <motion.span 
                      style={{display: 'inline-block', marginRight: '8px', fontSize: '1.5rem'}}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ⭐
                    </motion.span>
                  )}
                  {stats.solved}
                </motion.p>
                <p className="text-sm text-secondary">Issues Solved</p>
              </motion.div>
              <div className="text-right">
                <p className="text-sm font-medium">{stats.total} Total Cases</p>
                <p className="text-sm text-secondary">{stats.pending} Pending • {stats.inProgress} In Progress</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="border-b border-gray p-4">
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'pending', 'in-progress', 'solved'].map(filter => (
            <label key={filter} className="filter-label">
              <input 
                type="radio" 
                name="status-filter" 
                value={filter}
                checked={activeFilter === filter}
                onChange={(e) => setActiveFilter(e.target.value)}
              />
              <span className="filter-text">{filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4" style={{paddingBottom: '6rem'}}>
        <div id="reports-container">
          {filteredReports.map((report, index) => (
            <motion.div 
              key={report.id} 
              className="report-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div 
                className="report-thumb" 
                style={{backgroundImage: `url(${report.image})`}}
              />
              <div className="flex-1">
                <p className="font-bold">{report.title}</p>
                <div className="text-sm mt-1" style={{color: '#6b7280'}}>
                  <motion.span 
                    className="font-medium" 
                    style={{
                      color: getStatusColor(report.status),
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      display: 'inline-block',
                      background: `${getStatusColor(report.status)}15`,
                      border: `2px solid ${getStatusColor(report.status)}30`
                    }}
                    animate={getStatusAnimation(report.status)}
                    transition={{ 
                      duration: report.status === 'solved' ? 2 : report.status === 'in-progress' ? 2.5 : 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {report.status === 'solved' && (
                      <motion.span 
                        className="material-symbols-outlined" 
                        style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '4px', fontVariationSettings: "'FILL' 1"}}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        check_circle
                      </motion.span>
                    )}
                    {report.status === 'in-progress' && (
                      <motion.span 
                        className="material-symbols-outlined" 
                        style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '4px'}}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      >
                        sync
                      </motion.span>
                    )}
                    {report.status === 'pending' && (
                      <motion.span 
                        className="material-symbols-outlined" 
                        style={{fontSize: '16px', verticalAlign: 'middle', marginRight: '4px'}}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        schedule
                      </motion.span>
                    )}
                    Status: {getStatusText(report.status)}
                  </motion.span>
                </div>
                <p className="text-xs mt-1" style={{color: '#9ca3af'}}>Reported on {report.reportedDate}</p>
              </div>
              <button 
                className="delete-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(report);
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomNav />
      </div>
    </>
  );
};

export default AllReports;
