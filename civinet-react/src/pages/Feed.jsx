import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useIncidents } from '../hooks/useIncidents';
import { useLeaderboard } from '../hooks/useLeaderboard';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import Notification from '../components/Notification';
import { useSidebar } from '../contexts/SidebarContext';
import { useNotification } from '../hooks/useNotification';

const Feed = () => {
  const { reports, getStats } = useIncidents();
  const { getLeaderboard } = useLeaderboard();
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const { notifications, showNotification, removeNotification } = useNotification();
  const [userLocation, setUserLocation] = useState(() => {
    return localStorage.getItem('userCity') || 'San Francisco';
  });
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [dislikedPosts, setDislikedPosts] = useState(new Set());

  const leaderboardData = getLeaderboard('daily');
  const stats = getStats();

  useEffect(() => {
    const savedLocation = localStorage.getItem('userCity');
    if (savedLocation) {
      setUserLocation(savedLocation);
    }
  }, []);

  const handleLike = (reportId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reportId)) {
        newSet.delete(reportId);
      } else {
        newSet.add(reportId);
        // Remove from disliked if it was disliked
        setDislikedPosts(prevDisliked => {
          const newDisliked = new Set(prevDisliked);
          newDisliked.delete(reportId);
          return newDisliked;
        });
      }
      return newSet;
    });
  };

  const handleDislike = (reportId) => {
    setDislikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reportId)) {
        newSet.delete(reportId);
      } else {
        newSet.add(reportId);
        // Remove from liked if it was liked
        setLikedPosts(prevLiked => {
          const newLiked = new Set(prevLiked);
          newLiked.delete(reportId);
          return newLiked;
        });
      }
      return newSet;
    });
  };

  return (
    <>
      <Sidebar />
      <div className={`feed-container has-bottom-nav main-content-with-sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`}>
        <div className="feed-main-content">
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
            <div className="grid grid-cols-2 gap-4 mb-6 mobile-only">
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
                      <button 
                        className={`action-btn flex items-center gap-1 ${likedPosts.has(report.id) ? 'active-like' : ''}`}
                        onClick={() => handleLike(report.id)}
                      >
                        <span className="material-symbols-outlined">{likedPosts.has(report.id) ? 'thumb_up' : 'thumb_up'}</span>
                        <span>Like</span>
                      </button>
                      <button 
                        className={`action-btn flex items-center gap-1 ${dislikedPosts.has(report.id) ? 'active-dislike' : ''}`}
                        onClick={() => handleDislike(report.id)}
                      >
                        <span className="material-symbols-outlined">{dislikedPosts.has(report.id) ? 'thumb_down' : 'thumb_down'}</span>
                        <span>Dislike</span>
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

        {/* Desktop Right Sidebar Widgets */}
        <aside className="feed-right-sidebar">
          {/* Leaderboard Widget */}
          <div className="widget">
            <div className="widget-header">
              <h3 className="widget-title">
                <span className="material-symbols-outlined">leaderboard</span>
                Daily Leaderboard
              </h3>
            </div>
            <div className="widget-content">
              {leaderboardData.map((user) => (
                <div key={user.rank} className="leaderboard-mini-item">
                  <div className="rank-badge">{user.rank}</div>
                  <img src={user.avatar} alt={user.name} className="mini-avatar" />
                  <div className="flex-1">
                    <p className="user-name">{user.name}</p>
                    <p className="user-points">{user.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Widget */}
          <div className="widget">
            <div className="widget-header">
              <h3 className="widget-title">
                <span className="material-symbols-outlined">analytics</span>
                Community Stats
              </h3>
            </div>
            <div className="widget-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-value">{stats.total}</div>
                  <div className="stat-label">Total Reports</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.solved}</div>
                  <div className="stat-label">Resolved</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.pending}</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.solvedPercentage}%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Widget */}
          <div className="widget">
            <div className="widget-header">
              <h3 className="widget-title">
                <span className="material-symbols-outlined">history</span>
                Recent Reports
              </h3>
            </div>
            <div className="widget-content">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="activity-item" 
                  onClick={() => showNotification(`Viewing: ${report.title}`, 'info')}
                  style={{cursor: 'pointer'}}
                >
                  <img src={report.image} alt={report.title} className="activity-thumb" />
                  <div className="flex-1">
                    <p className="activity-title">{report.title}</p>
                    <p className="activity-location">{report.location}</p>
                    <span className={`status-badge status-${report.status}`}>{report.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
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
