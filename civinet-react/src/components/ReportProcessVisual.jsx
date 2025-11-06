import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ReportProcessVisual.css';

const ReportProcessVisual = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      icon: 'photo_camera',
      title: 'Report Issue',
      description: 'Capture and submit the problem',
      color: '#137fec'
    },
    {
      id: 2,
      icon: 'verified',
      title: 'AI Verification',
      description: 'System validates your report',
      color: '#10b981'
    },
    {
      id: 3,
      icon: 'send',
      title: 'Route to Authority',
      description: 'Sent to relevant department',
      color: '#f59e0b'
    },
    {
      id: 4,
      icon: 'engineering',
      title: 'Team Assigned',
      description: 'Local team takes action',
      color: '#8b5cf6'
    },
    {
      id: 5,
      icon: 'check_circle',
      title: 'Issue Resolved',
      description: 'Problem fixed & verified',
      color: '#22c55e'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="process-visual-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="process-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span 
          className="material-symbols-outlined process-icon"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          route
        </motion.span>
        <h3>How We Resolve Your Report</h3>
        <p>Watch your report journey from submission to resolution</p>
      </motion.div>

      <div className="process-timeline">
        {steps.map((step, index) => (
          <motion.div 
            key={step.id} 
            className="process-step-wrapper"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <motion.div 
              className={`process-step ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
              style={{ '--step-color': step.color }}
              animate={activeStep === index ? {
                boxShadow: [
                  `0 8px 30px ${step.color}33`,
                  `0 12px 40px ${step.color}66`,
                  `0 8px 30px ${step.color}33`
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="step-icon-container">
                <motion.span 
                  className="material-symbols-outlined step-icon"
                  animate={activeStep === index ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {step.icon}
                </motion.span>
                <AnimatePresence>
                  {index < activeStep && (
                    <motion.div 
                      className="check-overlay"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5, type: "spring" }}
                    >
                      <span className="material-symbols-outlined">done</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="step-glow"></div>
                {activeStep === index && (
                  <>
                    <div className="active-pulse"></div>
                    <div className="active-ring"></div>
                  </>
                )}
              </div>
              
              <motion.div 
                className="step-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="step-number">Step {step.id}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </motion.div>
            </motion.div>
            
            {index < steps.length - 1 && (
              <div className={`connector ${index < activeStep ? 'active' : ''}`}>
                <div className="connector-line"></div>
                <motion.div 
                  className="connector-progress" 
                  style={{ '--connector-color': step.color }}
                  initial={{ height: 0 }}
                  animate={{ height: index < activeStep ? '100%' : 0 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
                {index < activeStep && <div className="connector-flow"></div>}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="process-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="material-symbols-outlined">schedule</span>
          <div>
            <div className="stat-value">72hrs</div>
            <div className="stat-label">Avg Response</div>
          </div>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="material-symbols-outlined">verified_user</span>
          <div>
            <div className="stat-value">12,500+</div>
            <div className="stat-label">Resolved</div>
          </div>
        </motion.div>
        <motion.div 
          className="stat-card"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <span className="material-symbols-outlined">trending_up</span>
          <div>
            <div className="stat-value">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReportProcessVisual;
