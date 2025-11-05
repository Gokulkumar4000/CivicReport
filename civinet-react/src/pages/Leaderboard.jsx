import { useState } from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import MenuButton from '../components/MenuButton';
import { useSidebar } from '../contexts/SidebarContext';

const Leaderboard = () => {
  const { isOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState('weekly');
  const { getLeaderboard } = useLeaderboard();
  const leaderboard = getLeaderboard(activeTab);

  return (
    <>
      <Sidebar />
      <MenuButton />
      <div className={`flex flex-col has-bottom-nav main-content-with-sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`} style={{minHeight: '100vh'}}>
      <header className="flex items-center justify-center p-4 border-b border-gray">
        <h1 className="text-lg font-bold">Leaderboard</h1>
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
        {leaderboard.map((entry, index) => {
          const badges = ['🥇', '🥈', '🥉'];
          return (
            <div key={entry.rank} className="leaderboard-item">
              <span className={`rank-number ${entry.rank <= 3 ? 'top-3' : ''}`}>{entry.rank}</span>
              {entry.rank <= 3 && <span className="leader-badge">{badges[entry.rank - 1]}</span>}
              <img 
                src={entry.profileVisible ? entry.avatar : 'https://cdn.usegalileo.ai/sdxl10/d5e91f19-c2dd-4e44-a3a6-49e2d61af265.png'} 
                alt={`${entry.name}'s profile picture`}
                className="leaderboard-avatar"
              />
              <div className="leader-content">
                <p>{entry.profileVisible ? entry.name : 'Anonymous User'}</p>
                <div className="leader-stats">
                  <span>{entry.points} pts</span>
                  <span>•</span>
                  <span>{entry.reportsSubmitted} reports</span>
                </div>
              </div>
            </div>
          );
        })}
      </main>
      
      <BottomNav />
      </div>
    </>
  );
};

export default Leaderboard;
