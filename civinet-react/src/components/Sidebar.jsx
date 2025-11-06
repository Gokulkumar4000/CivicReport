import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../contexts/SidebarContext';
import './Sidebar.css';

const Sidebar = () => {
  const { isOpen, toggle } = useSidebar();
  
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    closed: { 
      x: -260,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  return (
    <>
      <motion.button
        className="floating-menu-button"
        onClick={toggle}
        aria-label="Toggle menu"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ 
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.8 : 1,
          pointerEvents: isOpen ? 'none' : 'auto'
        }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <span className="material-symbols-outlined">menu</span>
      </motion.button>

      <motion.aside 
        className="sidebar"
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className="sidebar-header">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                key="open-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="sidebar-header-content">
                  <motion.h1 
                    className="sidebar-logo"
                    variants={itemVariants}
                  >
                    CIVINET
                  </motion.h1>
                  <button 
                    className="menu-button-inside" 
                    onClick={toggle} 
                    aria-label="Toggle menu"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <motion.p 
                  className="sidebar-tagline"
                  variants={itemVariants}
                >
                  Civic Reporting Platform
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      
      <motion.nav className="sidebar-nav">
        <NavLink to="/feed" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">home</span>
          <AnimatePresence>
            {isOpen && (
              <motion.span 
                className="sidebar-link-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Home
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
        
        <NavLink to="/report" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">photo_camera</span>
          <AnimatePresence>
            {isOpen && (
              <motion.span 
                className="sidebar-link-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Report
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
        
        <NavLink to="/all-reports" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">edit_document</span>
          <AnimatePresence>
            {isOpen && (
              <motion.span 
                className="sidebar-link-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                My Reports
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
        
        <NavLink to="/leaderboard" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">leaderboard</span>
          <AnimatePresence>
            {isOpen && (
              <motion.span 
                className="sidebar-link-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Leaderboard
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
        
        <NavLink to="/profile" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">person</span>
          <AnimatePresence>
            {isOpen && (
              <motion.span 
                className="sidebar-link-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Profile
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      </motion.nav>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="sidebar-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs text-secondary">© 2024 CIVINET</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
    </>
  );
};

export default Sidebar;
