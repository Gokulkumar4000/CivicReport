import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="material-symbols-outlined">shield</span>
          CIVINET
        </Link>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#success-stories">Success Stories</a></li>
          <li><a href="#leaderboard">Leaderboard</a></li>
          
          <li className="mobile-auth-buttons">
            <Link to="/create-account" className="btn btn-outline">Sign Up</Link>
            <Link to="/login" className="btn btn-primary">Sign In</Link>
          </li>
        </ul>

        <div className="nav-actions">
          <div className="language-selector">
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect width='60' height='30' fill='%23B22234'/%3E%3Crect width='60' height='23.08' fill='%23fff'/%3E%3Crect width='60' height='15.38' fill='%23B22234'/%3E%3Crect width='60' height='7.69' fill='%23fff'/%3E%3Crect width='24' height='17.31' fill='%233C3B6E'/%3E%3C/svg%3E" 
              alt="EN" 
              className="flag-icon"
            />
            <span>EN</span>
          </div>
          <Link to="/create-account" className="btn btn-outline">Sign Up</Link>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
