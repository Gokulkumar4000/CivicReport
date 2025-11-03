import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIncidents } from '../hooks/useIncidents';
import BottomNav from '../components/BottomNav';

const Feed = () => {
  const { reports } = useIncidents();
  const [userLocation, setUserLocation] = useState('San Francisco');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In production, use reverse geocoding API
          console.log('Location:', position.coords);
        },
        (error) => console.log('Location error:', error)
      );
    }
  }, []);

  return (
    <div className="container has-bottom-nav">
      <header className="header-sticky">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
              <h1 className="text-lg font-bold">{userLocation}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/leaderboard" className="p-2">
                <span className="material-symbols-outlined text-secondary text-2xl">leaderboard</span>
              </Link>
              <Link to="/profile" className="p-2">
                <span className="material-symbols-outlined text-secondary text-2xl">person</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4" style={{paddingBottom: '6rem'}}>
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
  );
};

export default Feed;
