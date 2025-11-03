import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Landing.css';

const Landing = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.id = 'cursor';
    follower.id = 'cursor-follower';
    
    if (window.innerWidth > 768) {
      document.body.appendChild(cursor);
      document.body.appendChild(follower);

      const moveCursor = (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
          follower.style.left = e.clientX + 'px';
          follower.style.top = e.clientY + 'px';
        }, 100);
      };

      document.addEventListener('mousemove', moveCursor);

      return () => {
        document.removeEventListener('mousemove', moveCursor);
        cursor.remove();
        follower.remove();
      };
    }
  }, []);

  return (
    <div className="landing-page">
      <Navbar />

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Bridge the Gap Between <span className="highlight">Citizens & Government</span>
            </h1>
            <p className="hero-description">
              Report civic issues instantly and get rapid responses from local authorities. 
              Your voice matters, and we make sure it's heard.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary-large">Sign In to Report</Link>
              <button className="btn btn-outline-large">Learn More</button>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" 
              alt="Citizens collaborating"
            />
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header">
          <h2>Why Choose CIVINET?</h2>
          <p>Empowering citizens with powerful tools for community engagement</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span className="material-symbols-outlined">notifications_active</span>
            </div>
            <h3>Real-Time Alerts</h3>
            <p>Get instant notifications on incident status updates and community issues.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="material-symbols-outlined">leaderboard</span>
            </div>
            <h3>Community Leaderboard</h3>
            <p>Earn points for reporting and track your impact on the community.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="material-symbols-outlined">photo_camera</span>
            </div>
            <h3>Photo Evidence</h3>
            <p>Upload images to document issues and strengthen your reports.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <h3>Auto Location</h3>
            <p>Automatic location detection makes reporting quick and accurate.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three simple steps to make a difference in your community</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Report an Issue</h3>
            <p>Take a photo and describe the problem you've encountered</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Track Progress</h3>
            <p>Monitor the status of your report in real-time</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>See Results</h3>
            <p>Watch as your community improves through collective action</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <span className="material-symbols-outlined">shield</span>
              CIVINET
            </h3>
            <p>Bridging the gap between citizens and government since 2025.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#leaderboard">Leaderboard</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CIVINET. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
