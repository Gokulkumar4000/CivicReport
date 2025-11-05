import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [emailPhone, setEmailPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (emailPhone.trim() !== '') {
      setShowOtp(true);
    }
  };

  const handleVerifyOtp = () => {
    navigate('/feed');
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <header className="auth-header-enhanced">
          <div className="auth-icon-container">
            <span className="material-symbols-outlined" style={{fontSize: '4rem', color: 'var(--primary)'}}>
              how_to_reg
            </span>
          </div>
          <h1 className="auth-title">Welcome to CIVINET</h1>
          <p className="auth-subtitle">Empowering citizens, transforming communities</p>
          <div className="auth-stats">
            <div className="auth-stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Citizens</span>
            </div>
            <div className="auth-stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Issues Solved</span>
            </div>
            <div className="auth-stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </header>
        <main className="auth-form">
          <div className="form-group">
            <label className="sr-only" htmlFor="email-phone">Email / Phone</label>
            <input
              className="form-input"
              id="email-phone"
              placeholder="Email / Phone"
              type="text"
              value={emailPhone}
              onChange={(e) => setEmailPhone(e.target.value)}
            />
          </div>
          
          {!showOtp && (
            <button className="btn-primary" onClick={handleSendOtp}>
              Send OTP
            </button>
          )}

          {showOtp && (
            <div className="otp-section">
              <div className="form-group">
                <label className="sr-only" htmlFor="otp">Enter OTP</label>
                <input
                  className="form-input"
                  id="otp"
                  placeholder="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button className="btn-primary" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          )}

          <button className="btn-secondary" onClick={() => navigate('/create-account')}>
            Create Account
          </button>
        </main>
      </div>
      <footer className="auth-footer">
        <p>
          Secured by Govt. Standards | Data protected under Digital India compliance.
        </p>
      </footer>
    </div>
  );
};

export default Login;
