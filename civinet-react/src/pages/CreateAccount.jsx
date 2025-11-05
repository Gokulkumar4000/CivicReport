import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const CreateAccount = () => {
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

  const handleSubmit = () => {
    navigate('/account-created');
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <header className="auth-header-enhanced">
          <div className="auth-icon-container">
            <span className="material-symbols-outlined" style={{fontSize: '4rem', color: 'var(--primary)'}}>
              group_add
            </span>
          </div>
          <h1 className="auth-title">Join the Movement</h1>
          <p className="auth-subtitle">Be the change your community needs</p>
          <div className="feature-highlights">
            <div className="feature-item">
              <span className="material-symbols-outlined">verified</span>
              <span>Verified Reporting</span>
            </div>
            <div className="feature-item">
              <span className="material-symbols-outlined">trending_up</span>
              <span>Track Progress</span>
            </div>
            <div className="feature-item">
              <span className="material-symbols-outlined">groups</span>
              <span>Community Impact</span>
            </div>
          </div>
        </header>
        <main className="auth-form">
          <div className="form-group">
            <label className="sr-only" htmlFor="name">Full Name</label>
            <input
              className="form-input"
              id="name"
              name="name"
              placeholder="Full Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              className="form-input"
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="sr-only" htmlFor="phone">Phone Number</label>
            <input
              className="form-input"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="sr-only" htmlFor="aadhar">Aadhar Number</label>
            <input
              className="form-input"
              id="aadhar"
              name="aadhar"
              placeholder="Aadhar Number"
              type="text"
              value={formData.aadhar}
              onChange={handleChange}
            />
          </div>

          <button className="btn-primary" onClick={handleSubmit}>
            Create Account
          </button>

          <button className="btn-secondary" onClick={() => navigate('/login')}>
            Already have an account? Sign In
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

export default CreateAccount;
