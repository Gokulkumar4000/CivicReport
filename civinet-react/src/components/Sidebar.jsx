import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">CIVINET</h1>
        <p className="sidebar-tagline">Civic Reporting Platform</p>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/feed" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">home</span>
          <span>Home</span>
        </NavLink>
        
        <NavLink to="/report" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">photo_camera</span>
          <span>Report</span>
        </NavLink>
        
        <NavLink to="/all-reports" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">edit_document</span>
          <span>My Reports</span>
        </NavLink>
        
        <NavLink to="/leaderboard" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">leaderboard</span>
          <span>Leaderboard</span>
        </NavLink>
        
        <NavLink to="/profile" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <span className="material-symbols-outlined">person</span>
          <span>Profile</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <p className="text-xs text-secondary">© 2024 CIVINET</p>
      </div>
    </aside>
  );
};

export default Sidebar;
