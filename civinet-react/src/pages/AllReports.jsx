import { useState } from 'react';
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

          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold" style={{color: '#22c55e'}}>{stats.solved}</p>
                <p className="text-sm text-secondary">Issues Solved</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{stats.total} Total Cases</p>
                <p className="text-sm text-secondary">{stats.pending} Pending • {stats.inProgress} In Progress</p>
              </div>
            </div>
          </div>
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
          {filteredReports.map(report => (
            <div key={report.id} className="report-card">
              <div 
                className="report-thumb" 
                style={{backgroundImage: `url(${report.image})`}}
              />
              <div className="flex-1">
                <p className="font-bold">{report.title}</p>
                <p className="text-sm mt-1" style={{color: '#6b7280'}}>
                  <span className="font-medium" style={{color: getStatusColor(report.status)}}>
                    Status: {getStatusText(report.status)}
                  </span>
                </p>
                <p className="text-xs mt-1" style={{color: '#9ca3af'}}>Reported on {report.reportedDate}</p>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteClick(report)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
      </div>
    </>
  );
};

export default AllReports;
