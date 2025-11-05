import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Landing.css';

const Landing = () => {
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target.toLocaleString() + '+';
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString() + '+';
        }
      }, 16);
    });
  };

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

      <section className="stats" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number" data-count="15000">0+</div>
            <div className="stat-label">Issues Reported</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="12500">0+</div>
            <div className="stat-label">Issues Resolved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-count="8500">0+</div>
            <div className="stat-label">Active Citizens</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">72hrs</div>
            <div className="stat-label">Avg Response Time</div>
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

      <section className="success-stories" id="success-stories">
        <div className="section-header">
          <h2>Success Stories</h2>
          <p>Real impact from real citizens in communities across the nation</p>
        </div>
        <div className="slider-container">
          <div className="slider">
            <div className="story-card">
              <div className="story-header">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" className="story-avatar" />
                <div className="story-info">
                  <h4>Priya Sharma</h4>
                  <p>Mumbai, Maharashtra</p>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop" alt="Pothole" className="story-image" />
              <h3 className="story-title">Pothole Filled in 48 Hours</h3>
              <p>Reported a dangerous pothole on Main Street. Fixed within 2 days!</p>
              <span className="story-status">Resolved</span>
            </div>

            <div className="story-card">
              <div className="story-header">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" className="story-avatar" />
                <div className="story-info">
                  <h4>Rajesh Kumar</h4>
                  <p>Delhi</p>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop" alt="Street Light" className="story-image" />
              <h3 className="story-title">Street Lights Restored</h3>
              <p>Dark street made safe again with new lighting installation</p>
              <span className="story-status">Resolved</span>
            </div>

            <div className="story-card">
              <div className="story-header">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="User" className="story-avatar" />
                <div className="story-info">
                  <h4>Anita Desai</h4>
                  <p>Bangalore, Karnataka</p>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=250&fit=crop" alt="Park" className="story-image" />
              <h3 className="story-title">Park Cleanup Success</h3>
              <p>Community park transformed after waste management report</p>
              <span className="story-status">Resolved</span>
            </div>
          </div>
        </div>
      </section>

      <section className="leaderboard-section" id="leaderboard">
        <div className="section-header">
          <h2>Community Leaderboard</h2>
          <p>Top contributors making a difference in their communities</p>
        </div>
        <div className="leaderboard-container">
          <div className="leader-item">
            <div className="leader-rank">1</div>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="Leader" className="leader-avatar" />
            <div className="leader-info">
              <div className="leader-name">Arjun Mehta</div>
              <div className="leader-points">245 reports • 220 resolved</div>
            </div>
            <div className="leader-badge">🥇</div>
          </div>

          <div className="leader-item">
            <div className="leader-rank">2</div>
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" alt="Leader" className="leader-avatar" />
            <div className="leader-info">
              <div className="leader-name">Sneha Patel</div>
              <div className="leader-points">198 reports • 180 resolved</div>
            </div>
            <div className="leader-badge">🥈</div>
          </div>

          <div className="leader-item">
            <div className="leader-rank">3</div>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Leader" className="leader-avatar" />
            <div className="leader-info">
              <div className="leader-name">Vikram Singh</div>
              <div className="leader-points">175 reports • 160 resolved</div>
            </div>
            <div className="leader-badge">🥉</div>
          </div>

          <div className="leader-item">
            <div className="leader-rank">4</div>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="Leader" className="leader-avatar" />
            <div className="leader-info">
              <div className="leader-name">Meera Reddy</div>
              <div className="leader-points">142 reports • 130 resolved</div>
            </div>
            <div className="leader-badge">⭐</div>
          </div>

          <div className="leader-item">
            <div className="leader-rank">5</div>
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" alt="Leader" className="leader-avatar" />
            <div className="leader-info">
              <div className="leader-name">Amit Joshi</div>
              <div className="leader-points">128 reports • 115 resolved</div>
            </div>
            <div className="leader-badge">⭐</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of citizens already making their communities better</p>
          <Link to="/create-account" className="cta-btn-white">Get Started Today</Link>
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
