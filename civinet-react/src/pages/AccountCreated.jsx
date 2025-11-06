import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Auth.css';

const AccountCreated = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <motion.div 
            style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: '#22c55e', 
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.2
            }}
          >
            <motion.span 
              className="material-symbols-outlined" 
              style={{ 
                fontSize: '48px', 
                color: 'white',
                fontVariationSettings: "'FILL' 1"
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              check_circle
            </motion.span>
            <motion.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '3px solid #22c55e',
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>
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
