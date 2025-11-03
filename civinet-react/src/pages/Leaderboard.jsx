import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLeaderboard } from '../hooks/useLeaderboard';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const { getLeaderboard } = useLeaderboard();
  const leaderboard = getLeaderboard(activeTab);

  return (
    <div className="flex flex-col" style={{height: '100vh'}}>
      <header className="flex items-center justify-between p-4 border-b border-gray">
        <Link to="/feed" style={{color: '#6b7280', textDecoration: 'none'}}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </Link>
        <h1 className="text-lg font-bold">Leaderboard</h1>
        <div style={{width: '2rem'}}></div>
      </header>

      <div className="border-b border-gray">
        <nav className="flex justify-around px-4">
          <button 
            className={`tab-link ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => setActiveTab('daily')}
          >
            Daily
          </button>
          <button 
            className={`tab-link ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveTab('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`tab-link ${activeTab === 'alltime' ? 'active' : ''}`}
            onClick={() => setActiveTab('alltime')}
          >
            All Time
          </button>
        </nav>
      </div>

      <main className="flex-1 overflow-y-auto">
        {leaderboard.map((entry) => (
          <div key={entry.rank} className="leaderboard-item">
            <div className={`rank-number ${entry.rank <= 3 ? 'top-3' : ''}`}>
              {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
            </div>
            <img 
              src={entry.avatar} 
              alt={entry.name}
              className="leaderboard-avatar"
            />
            <div className="leader-content">
              <p>{entry.profileVisible ? entry.name : 'Anonymous'}</p>
              <div className="leader-stats">
                <span>{entry.points} pts</span>
                <span>•</span>
                <span>{entry.reportsSubmitted} reports</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Leaderboard;
