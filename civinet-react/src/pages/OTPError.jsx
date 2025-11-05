import { useNavigate } from 'react-router-dom';
import './Auth.css';

const OTPError = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: '#ef4444', 
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'white' }}>
              error
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Invalid OTP
          </h1>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>
            The OTP you entered is incorrect or has expired. Please try again.
          </p>
          <button className="btn-primary" onClick={() => navigate('/login')}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPError;
