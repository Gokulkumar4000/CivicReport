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
  const [likeCounts, setLikeCounts] = useState({});
  const [dislikeCounts, setDislikeCounts] = useState({});

  const leaderboardData = getLeaderboard('daily');
  const stats = getStats();

  useEffect(() => {
    const savedLocation = localStorage.getItem('userCity');
    if (savedLocation) {
      setUserLocation(savedLocation);
    }
  }, []);

  // Initialize like/dislike counts for new reports
  useEffect(() => {
    if (reports.length > 0) {
      setLikeCounts(prevCounts => {
        let hasChanges = false;
        const newCounts = {...prevCounts};
        
        reports.forEach(report => {
          if (newCounts[report.id] === undefined) {
            // Only initialize if not already set - use report id for deterministic value
            const seed = parseInt(report.id) || report.id.length;
            newCounts[report.id] = ((seed * 7) % 45) + 5;
            hasChanges = true;
          }
        });
        
        // Only return new object if there were actually changes
        return hasChanges ? newCounts : prevCounts;
      });
      
      setDislikeCounts(prevCounts => {
        let hasChanges = false;
        const newCounts = {...prevCounts};
        
        reports.forEach(report => {
          if (newCounts[report.id] === undefined) {
            // Only initialize if not already set - use report id for deterministic value
            const seed = parseInt(report.id) || report.id.length;
            newCounts[report.id] = ((seed * 3) % 10) + 1;
            hasChanges = true;
          }
        });
        
        // Only return new object if there were actually changes
        return hasChanges ? newCounts : prevCounts;
      });
    }
  }, [reports]);

  const handleLike = (reportId) => {
    const wasLiked = likedPosts.has(reportId);
    const wasDisliked = dislikedPosts.has(reportId);
    
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (wasLiked) {
        newSet.delete(reportId);
        // Decrease like count
        setLikeCounts(counts => ({...counts, [reportId]: (counts[reportId] || 0) - 1}));
      } else {
        newSet.add(reportId);
        // Increase like count
        setLikeCounts(counts => ({...counts, [reportId]: (counts[reportId] || 0) + 1}));
        
        // Remove from disliked if it was disliked
        if (wasDisliked) {
          setDislikedPosts(prevDisliked => {
            const newDisliked = new Set(prevDisliked);
            newDisliked.delete(reportId);
            return newDisliked;
          });
          // Decrease dislike count
          setDislikeCounts(counts => ({...counts, [reportId]: (counts[reportId] || 0) - 1}));
        }
      }
      return newSet;
    });
  };

  const handleDislike = (reportId) => {
    const wasDisliked = dislikedPosts.has(reportId);
    const wasLiked = likedPosts.has(reportId);
    
    setDislikedPosts(prev => {
      const newSet = new Set(prev);
      if (wasDisliked) {
        newSet.delete(reportId);
        // Decrease dislike count
        setDislikeCounts(counts => ({...counts, [reportId]: (counts[reportId] || 0) - 1}));
      } else {
        newSet.add(reportId);
        // Increase dislike count
        setDislikeCounts(counts => ({...counts, [reportId]: (counts[reportId] || 0) + 1}));
        
        // Remove from liked if it was liked
        if (wasLiked) {
          setLikedPosts(prevLiked => {
            const newLiked = new Set(prevLiked);
            newLiked.delete(reportId);
            return newLiked;
          });
          // Decrease like count
          setLikeCounts(counts => ({...counts, [reportId]: (counts[reportId] || 0) - 1}));
        }
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
                  <button 
                    className="p-2 mobile-only-icon" 
                    onClick={() => navigate('/leaderboard')}
                  >
                    <span className="material-symbols-outlined text-secondary text-2xl">leaderboard</span>
                  </button>
                  <button className="p-2" onClick={() => showNotification('No new notifications', 'info')}>
                    <span className="material-symbols-outlined text-secondary text-2xl">notifications</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 space-y-4" style={{paddingBottom: '6rem'}}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-lg">Recent Reports</h2>
              <button 
                onClick={() => navigate('/all-reports')}
                className="text-sm font-medium text-primary hover:underline"
              >
                View All
              </button>
            </div>
            {reports.slice(0, 3).map((report) => (
              <div key={report.id} className="instagram-post">
                <div className="post-header">
                  <div className="flex items-center gap-2">
                    <div className="post-avatar">
                      <span className="material-symbols-outlined" style={{fontSize: '1.5rem', color: 'var(--primary)'}}>account_circle</span>
                    </div>
                    <div>
                      <p className="post-username">Community Reporter</p>
                      <p className="post-location">{report.location}</p>
                    </div>
                  </div>
                  <span className={`status-badge status-${report.status}`}>
                    {report.status}
                  </span>
                </div>
                
                <img 
                  src={report.image} 
                  alt={report.title}
                  className="post-image"
                />
                
                <div className="post-content">
                  <div className="post-actions">
                    <button 
                      className={`post-action-btn ${likedPosts.has(report.id) ? 'active-like' : ''}`}
                      onClick={() => handleLike(report.id)}
                    >
                      <span className="material-symbols-outlined">{likedPosts.has(report.id) ? 'favorite' : 'favorite_border'}</span>
                    </button>
                    <button className="post-action-btn">
                      <span className="material-symbols-outlined">mode_comment</span>
                    </button>
                    <button className="post-action-btn">
                      <span className="material-symbols-outlined">share</span>
                    </button>
                  </div>
                  
                  <div className="post-likes">
                    <span className="font-bold">{likeCounts[report.id] || 0} likes</span>
                  </div>
                  
                  <div className="post-caption">
                    <span className="font-bold">{report.title}</span>
                    <p className="post-description">{report.description}</p>
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
              {leaderboardData.slice(0, 5).map((user) => (
                <div key={user.rank} className="leaderboard-mini-item">
                  <div className="rank-badge">{user.rank}</div>
                  <img src={user.avatar} alt={user.name} className="mini-avatar" />
                  <div className="flex-1">
                    <p className="user-name">{user.name}</p>
                    <p className="user-points">{user.points} pts</p>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => navigate('/leaderboard')}
                className="view-more-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginTop: '1rem',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                View Leaderboard
              </button>
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
              <button 
                onClick={() => navigate('/all-reports')}
                className="view-more-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  marginTop: '1rem',
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                View Complete Report Status
              </button>
            </div>
          </div>

          {/* Recent Activity Widget */}
          <div className="widget">
            <div className="widget-header">
              <h3 className="widget-title">
                <span className="material-symbols-outlined">history</span>
                Recent Activity
              </h3>
            </div>
            <div className="widget-content">
              {reports.slice(0, 4).map((report) => (
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
