import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Landing.css';

const Landing = () => {
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [currentStory, setCurrentStory] = useState(0);
  const isInView = useInView(statsRef, { once: true });

  const stories = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=250&fit=crop",
      title: "Pothole Filled in 48 Hours",
      description: "Reported a dangerous pothole on Main Street. Fixed within 2 days!",
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop",
      title: "Street Lights Restored",
      description: "Dark street made safe again with new lighting installation",
    },
    {
      name: "Anita Desai",
      location: "Bangalore, Karnataka",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=250&fit=crop",
      title: "Park Cleanup Success",
      description: "Community park transformed after waste management report",
    },
  ];

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      animateCounters();
    }
  }, [isInView, hasAnimated]);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-bg-overlay"></div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Bridge the Gap Between <span className="highlight">Citizens & Government</span>
            </motion.h1>
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Report civic issues instantly and get rapid responses from local authorities. 
              Your voice matters, and we make sure it's heard.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link to="/login" className="btn btn-primary-large">
                <span>Sign In to Report</span>
                <span className="btn-glow"></span>
              </Link>
              <button className="btn btn-outline-large">Learn More</button>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="image-glow"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" 
              alt="Citizens collaborating"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        <div className="stats-glow"></div>
        <motion.div 
          className="stats-container"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {[
            { count: 15000, label: "Issues Reported" },
            { count: 12500, label: "Issues Resolved" },
            { count: 8500, label: "Active Citizens" },
            { count: null, label: "Avg Response Time", value: "72hrs" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-item"
              variants={itemVariants}
            >
              <div className="stat-number" data-count={stat.count}>
                {stat.value || '0+'}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose CIVINET?</h2>
          <p>Empowering citizens with powerful tools for community engagement</p>
        </motion.div>
        <motion.div 
          className="features-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { icon: "notifications_active", title: "Real-Time Alerts", desc: "Get instant notifications on incident status updates and community issues." },
            { icon: "leaderboard", title: "Community Leaderboard", desc: "Earn points for reporting and track your impact on the community." },
            { icon: "photo_camera", title: "Photo Evidence", desc: "Upload images to document issues and strengthen your reports." },
            { icon: "location_on", title: "Auto Location", desc: "Automatic location detection makes reporting quick and accurate." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="feature-card glass-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">
                <span className="material-symbols-outlined">{feature.icon}</span>
                <div className="icon-glow"></div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>How It Works</h2>
          <p>Three simple steps to make a difference in your community</p>
        </motion.div>
        <motion.div 
          className="steps-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { num: 1, title: "Report an Issue", desc: "Take a photo and describe the problem you've encountered" },
            { num: 2, title: "Track Progress", desc: "Monitor the status of your report in real-time" },
            { num: 3, title: "See Results", desc: "Watch as your community improves through collective action" }
          ].map((step, index) => (
            <motion.div 
              key={index}
              className="step"
              variants={itemVariants}
            >
              <motion.div 
                className="step-number"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {step.num}
              </motion.div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Success Stories - Improved Carousel */}
      <section className="success-stories" id="success-stories">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Success Stories</h2>
          <p>Real impact from real citizens in communities across the nation</p>
        </motion.div>
        <div className="carousel-container">
          <div className="carousel-track">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                className={`story-card glass-card ${index === currentStory ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={index === currentStory ? { 
                  opacity: 1, 
                  scale: 1,
                  x: 0
                } : { 
                  opacity: 0.3, 
                  scale: 0.9,
                  x: (index - currentStory) * 100 + '%'
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="story-header">
                  <img src={story.avatar} alt={story.name} className="story-avatar" />
                  <div className="story-info">
                    <h4>{story.name}</h4>
                    <p>{story.location}</p>
                  </div>
                </div>
                <img src={story.image} alt={story.title} className="story-image" />
                <h3 className="story-title">{story.title}</h3>
                <p>{story.description}</p>
                <span className="story-status">Resolved</span>
              </motion.div>
            ))}
          </div>
          <div className="slider-dots">
            {stories.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentStory ? 'active' : ''}`}
                onClick={() => setCurrentStory(index)}
                aria-label={`Story ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="leaderboard-section" id="leaderboard">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Community Leaderboard</h2>
          <p>Top contributors making a difference in their communities</p>
        </motion.div>
        <motion.div 
          className="leaderboard-container glass-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {[
            { rank: 1, name: "Arjun Mehta", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", reports: 245, resolved: 220, badge: "🥇" },
            { rank: 2, name: "Sneha Patel", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop", reports: 198, resolved: 180, badge: "🥈" },
            { rank: 3, name: "Vikram Singh", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", reports: 175, resolved: 160, badge: "🥉" },
            { rank: 4, name: "Meera Reddy", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop", reports: 142, resolved: 130, badge: "⭐" },
            { rank: 5, name: "Amit Joshi", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop", reports: 128, resolved: 115, badge: "⭐" }
          ].map((leader, index) => (
            <motion.div 
              key={index}
              className="leader-item"
              variants={itemVariants}
              whileHover={{ x: 10, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="leader-rank">{leader.rank}</div>
              <img src={leader.avatar} alt={leader.name} className="leader-avatar" />
              <div className="leader-info">
                <div className="leader-name">{leader.name}</div>
                <div className="leader-points">{leader.reports} reports • {leader.resolved} resolved</div>
              </div>
              <div className="leader-badge">{leader.badge}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg-glow"></div>
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of citizens already making their communities better</p>
          <Link to="/create-account" className="cta-btn-white">
            Get Started Today
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
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
