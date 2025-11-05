import { NavLink } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';
import './Sidebar.css';

const Sidebar = () => {
  const { isOpen } = useSidebar();
  
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        {isOpen ? (
          <>
            <h1 className="sidebar-logo">CIVINET</h1>
            <p className="sidebar-tagline">Civic Reporting Platform</p>
          </>
        ) : (
          <h1 className="sidebar-logo-collapsed">C</h1>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/feed" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="sidebar-link-text">Home</span>
        </NavLink>
        
        <NavLink to="/report" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">photo_camera</span>
          <span className="sidebar-link-text">Report</span>
        </NavLink>
        
        <NavLink to="/all-reports" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">edit_document</span>
          <span className="sidebar-link-text">My Reports</span>
        </NavLink>
        
        <NavLink to="/leaderboard" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">leaderboard</span>
          <span className="sidebar-link-text">Leaderboard</span>
        </NavLink>
        
        <NavLink to="/profile" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">person</span>
          <span className="sidebar-link-text">Profile</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <p className="text-xs text-secondary">© 2024 CIVINET</p>
      </div>
    </aside>
  );
};

export default Sidebar;
