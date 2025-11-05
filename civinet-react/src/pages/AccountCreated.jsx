import { useNavigate } from 'react-router-dom';
import './Auth.css';

const AccountCreated = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            background: '#22c55e', 
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'white' }}>
              check_circle
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Account Created Successfully!
          </h1>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>
            Welcome to CIVINET! Your account has been created and verified.
          </p>
          <button className="btn-primary" onClick={() => navigate('/feed')}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
