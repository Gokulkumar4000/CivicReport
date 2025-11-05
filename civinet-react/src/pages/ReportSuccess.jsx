import { useNavigate } from 'react-router-dom';
import './Auth.css';

const ReportSuccess = () => {
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
            Report Submitted Successfully!
          </h1>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>
            Thank you for reporting this incident. Our team will review it shortly and take necessary action.
          </p>
          <button className="btn-primary" onClick={() => navigate('/feed')}>
            Go to Feed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportSuccess;
