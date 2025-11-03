import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <Link to="/feed" className={`nav-item ${isActive('/feed') ? 'active' : ''}`}>
        <span className="material-symbols-outlined">home</span>
        <span>Home</span>
      </Link>
      <Link to="/report" className={`nav-item ${isActive('/report') ? 'active' : ''}`}>
        <span className="material-symbols-outlined">add_circle</span>
        <span>Report</span>
      </Link>
      <Link to="/all-reports" className={`nav-item ${isActive('/all-reports') ? 'active' : ''}`}>
        <span className="material-symbols-outlined">list</span>
        <span>Reports</span>
      </Link>
      <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <span className="material-symbols-outlined">person</span>
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
