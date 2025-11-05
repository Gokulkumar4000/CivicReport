import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIncidents } from '../hooks/useIncidents';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import MenuButton from '../components/MenuButton';
import Notification from '../components/Notification';
import { useSidebar } from '../contexts/SidebarContext';
import { useNotification } from '../hooks/useNotification';

const Feed = () => {
  const { reports } = useIncidents();
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const { notifications, showNotification, removeNotification } = useNotification();
  const [userLocation, setUserLocation] = useState(() => {
    return localStorage.getItem('userCity') || 'San Francisco';
  });

  useEffect(() => {
    const savedLocation = localStorage.getItem('userCity');
    if (savedLocation) {
      setUserLocation(savedLocation);
    }
  }, []);

  return (
    <>
      <Sidebar />
      <MenuButton />
      <div className={`container has-bottom-nav main-content-with-sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`}>
      <header className="header-sticky">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              <h1 className="text-lg font-bold">{userLocation}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2" onClick={() => showNotification('No new notifications', 'info')}>
                <span className="material-symbols-outlined text-secondary text-2xl">notifications</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4" style={{paddingBottom: '6rem'}}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div 
            onClick={() => navigate('/leaderboard')}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all"
            style={{animation: 'fadeIn 0.5s ease-out'}}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">leaderboard</span>
              <h3 className="font-bold text-sm">Leaderboard</h3>
            </div>
            <p className="text-xs text-secondary">View top contributors</p>
          </div>
          
          <div 
            onClick={() => navigate('/all-reports')}
            className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl cursor-pointer hover:shadow-md transition-all"
            style={{animation: 'fadeIn 0.5s ease-out 0.1s backwards'}}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-green-600">edit_document</span>
              <h3 className="font-bold text-sm">My Reports</h3>
            </div>
            <p className="text-xs text-secondary">Track your reports</p>
          </div>
        </div>

        <h2 className="font-bold text-lg mb-3">Recent Reports</h2>
        {reports.slice(0, 5).map((report) => (
          <div key={report.id} className="card">
            <div className="card-header flex items-center gap-3">
              <div 
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: '#e3e8ee'
                }}
              />
              <div className="flex-1">
                <p className="font-bold">{report.title}</p>
                <p className="text-sm text-secondary">{report.location}</p>
              </div>
            </div>
            <img 
              src={report.image} 
              alt={report.title}
              style={{width: '100%', height: '300px', objectFit: 'cover'}}
            />
            <div className="card-body">
              <p className="text-sm">{report.description}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4">
                  <button className="action-btn flex items-center gap-1">
                    <span className="material-symbols-outlined">thumb_up</span>
                    <span>Like</span>
                  </button>
                  <button className="action-btn flex items-center gap-1">
                    <span className="material-symbols-outlined">comment</span>
                    <span>Comment</span>
                  </button>
                </div>
                <button className="action-btn">
                  <span className="material-symbols-outlined">bookmark</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <BottomNav />
      </div>
      
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  );
};

export default Feed;
