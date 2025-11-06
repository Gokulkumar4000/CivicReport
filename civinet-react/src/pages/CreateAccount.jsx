import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import './Auth.css';

const CreateAccount = () => {
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhar: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/feed');
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-split-left">
        <div className="auth-split-logo">
          <span className="material-symbols-outlined" style={{fontSize: '2rem', color: 'var(--primary)'}}>shield</span>
          <span className="logo-text">CIVINET</span>
        </div>
        
        <div className="auth-split-form">
          <h1 className="split-title">Join the Movement</h1>
          <p className="split-subtitle">Create your account and start making a difference</p>
          
          {step === 1 && (
            <>
              <div className="form-group-split">
                <label className="split-label" htmlFor="name">Full Name</label>
                <input
                  className="form-input-split"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group-split">
                <label className="split-label" htmlFor="email">Email Address</label>
                <input
                  className="form-input-split"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group-split">
                <label className="split-label" htmlFor="phone">Phone Number</label>
                <input
                  className="form-input-split"
                  id="phone"
                  name="phone"
                  placeholder="Enter your 10-digit phone number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group-split">
                <label className="split-label" htmlFor="aadhar">Aadhar Number</label>
                <input
                  className="form-input-split"
                  id="aadhar"
                  name="aadhar"
                  placeholder="Enter your Aadhar number"
                  type="text"
                  value={formData.aadhar}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button className="btn-split-primary" onClick={handleNext}>
            {step === 1 ? 'Continue' : 'Create Account'}
          </button>

          {step === 2 && (
            <button className="btn-split-secondary" onClick={handleBack}>
              Back
            </button>
          )}

          <div className="progress-dots">
            <span className={`dot ${step === 1 ? 'active' : 'completed'}`}></span>
            <span className={`dot ${step === 2 ? 'active' : ''}`}></span>
          </div>

          <div className="auth-split-divider">
            <span>Already have an account?</span>
          </div>

          <button className="btn-split-secondary" onClick={() => navigate('/login')}>
            Sign In
          </button>

          <p className="auth-split-footer-text">
            Secured by Govt. Standards | Data protected under Digital India compliance
          </p>
        </div>
      </div>

      <div className="auth-split-right">
        <div className="hero-content">
          <div className="hero-icon">
            <span className="material-symbols-outlined" style={{fontSize: '4rem'}}>volunteer_activism</span>
          </div>
          <h2 className="hero-title">Be the change, fast</h2>
          <p className="hero-description">
            Report issues, track progress, and see real impact in your community
          </p>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="material-symbols-outlined">verified</span>
              <span>Verified Reporting</span>
            </div>
            <div className="hero-feature">
              <span className="material-symbols-outlined">trending_up</span>
              <span>Track Progress</span>
            </div>
            <div className="hero-feature">
              <span className="material-symbols-outlined">groups</span>
              <span>Community Impact</span>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        title="Account Created Successfully!"
        message="Welcome to CIVINET! Your account has been created and verified. Start reporting issues and making a difference in your community."
        buttonText="Get Started"
      />
    </div>
  );
};

export default CreateAccount;
