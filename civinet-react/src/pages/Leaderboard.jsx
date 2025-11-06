import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLeaderboard } from '../hooks/useLeaderboard';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import './Leaderboard.css';

const Leaderboard = () => {
  const { isOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState('weekly');
  const { getLeaderboard } = useLeaderboard();
  const leaderboard = getLeaderboard(activeTab);

  return (
    <>
      <Sidebar />
      <div className={`flex flex-col has-bottom-nav main-content-with-sidebar ${!isOpen ? 'sidebar-collapsed' : ''}`} style={{minHeight: '100vh'}}>
      <header className="flex flex-col p-4 border-b border-gray">
        <h1 className="text-lg font-bold text-center">Leaderboard</h1>
        <div className="inspirational-banner mt-3">
          <span className="material-symbols-outlined" style={{fontSize: '2rem', color: 'var(--primary)'}}>emoji_events</span>
          <div style={{textAlign: 'center'}}>
            <p className="font-semibold" style={{color: 'var(--primary)', marginBottom: '0.25rem'}}>Every Report Makes a Difference</p>
            <p className="text-sm text-secondary">Together, we're building safer, stronger communities</p>
          </div>
        </div>
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

      <main className="flex-1 overflow-y-auto" style={{paddingBottom: '6rem'}}>
        {leaderboard.map((entry, index) => {
          const badges = ['🥇', '🥈', '🥉'];
          const isTopThree = entry.rank <= 3;
          return (
            <motion.div 
              key={entry.rank} 
              className={`leaderboard-item ${isTopThree ? 'leaderboard-item-top' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: isTopThree ? 1.02 : 1.01, x: 5 }}
            >
              <motion.div 
                className={`rank-number ${isTopThree ? 'top-3' : ''}`}
                animate={isTopThree ? { 
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {entry.rank}
                {isTopThree && <div className="rank-glow"></div>}
              </motion.div>
              {isTopThree && (
                <motion.div 
                  className="leader-badge-container"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="leader-badge">{badges[entry.rank - 1]}</span>
                  <div className="badge-shine"></div>
                </motion.div>
              )}
              <motion.div 
                className={`avatar-container ${isTopThree ? 'avatar-top' : ''}`}
                whileHover={isTopThree ? { scale: 1.1, rotate: 5 } : {}}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={entry.profileVisible ? entry.avatar : 'https://cdn.usegalileo.ai/sdxl10/d5e91f19-c2dd-4e44-a3a6-49e2d61af265.png'} 
                  alt={`${entry.name}'s profile picture`}
                  className="leaderboard-avatar"
                />
                {isTopThree && <div className="avatar-glow"></div>}
              </motion.div>
              <div className="leader-content">
                <p className={isTopThree ? 'leader-name-top' : ''}>{entry.profileVisible ? entry.name : 'Anonymous User'}</p>
                <div className="leader-stats">
                  <motion.span 
                    className={isTopThree ? 'stat-highlight' : ''}
                    animate={isTopThree ? {
                      textShadow: [
                        '0 0 10px rgba(255, 215, 0, 0.3)',
                        '0 0 20px rgba(255, 215, 0, 0.6)',
                        '0 0 10px rgba(255, 215, 0, 0.3)'
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {entry.points} pts
                  </motion.span>
                  <span>•</span>
                  <span>{entry.reportsSubmitted} reports</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </main>
      
      <BottomNav />
      </div>
    </>
  );
};

export default Leaderboard;
