import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import './Auth.css';

const Login = () => {
  const [emailPhone, setEmailPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (emailPhone.trim() !== '') {
      setShowOtp(true);
    }
  };

  const handleVerifyOtp = () => {
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/feed');
  };

  return (
    <div className="auth-split-container">
      <div className="auth-split-left">
        <div className="auth-split-logo">
          <span className="material-symbols-outlined" style={{fontSize: '2rem', color: 'var(--primary)'}}>shield</span>
          <span className="logo-text">CIVINET</span>
        </div>
        
        <div className="auth-split-form">
          <h1 className="split-title">Welcome back</h1>
          <p className="split-subtitle">Sign in to continue making an impact in your community</p>
          
          <div className="form-group-split">
            <label className="split-label" htmlFor="email-phone">Email or Phone</label>
            <input
              className="form-input-split"
              id="email-phone"
              placeholder="Enter your email or phone number"
              type="text"
              value={emailPhone}
              onChange={(e) => setEmailPhone(e.target.value)}
            />
          </div>
          
          {!showOtp && (
            <button className="btn-split-primary" onClick={handleSendOtp}>
              Send OTP
            </button>
          )}

          {showOtp && (
            <>
              <div className="form-group-split">
                <label className="split-label" htmlFor="otp">One-Time Password</label>
                <input
                  className="form-input-split"
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button className="btn-split-primary" onClick={handleVerifyOtp}>
                Verify & Sign In
              </button>
            </>
          )}

          <div className="auth-split-divider">
            <span>Don't have an account?</span>
          </div>

          <button className="btn-split-secondary" onClick={() => navigate('/create-account')}>
            Create Account
          </button>

          <p className="auth-split-footer-text">
            Secured by Govt. Standards | Data protected under Digital India compliance
          </p>
        </div>
      </div>

      <div className="auth-split-right">
        <div className="hero-content">
          <div className="hero-icon">
            <span className="material-symbols-outlined" style={{fontSize: '4rem'}}>groups</span>
          </div>
          <h2 className="hero-title">Community to impact, fast</h2>
          <p className="hero-description">
            Join thousands of citizens making real change in their neighborhoods
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">50K+</div>
              <div className="hero-stat-label">Active Citizens</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">10K+</div>
              <div className="hero-stat-label">Issues Resolved</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">200+</div>
              <div className="hero-stat-label">Cities</div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="Welcome Back!"
        message="You've successfully signed in. Let's continue making an impact in your community."
        buttonText="Go to Feed"
      />
    </div>
  );
};

export default Login;
