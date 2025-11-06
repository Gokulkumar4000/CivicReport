import { useState, useEffect } from 'react';
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
    <div className="process-visual-container">
      <div className="process-header">
        <span className="material-symbols-outlined process-icon">route</span>
        <h3>How We Resolve Your Report</h3>
        <p>Watch your report journey from submission to resolution</p>
      </div>

      <div className="process-timeline">
        {steps.map((step, index) => (
          <div key={step.id} className="process-step-wrapper">
            <div 
              className={`process-step ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
              style={{ '--step-color': step.color }}
            >
              <div className="step-icon-container">
                <span className="material-symbols-outlined step-icon">{step.icon}</span>
                {index < activeStep && (
                  <div className="check-overlay">
                    <span className="material-symbols-outlined">done</span>
                  </div>
                )}
                <div className="step-glow"></div>
                {activeStep === index && (
                  <>
                    <div className="active-pulse"></div>
                    <div className="active-ring"></div>
                  </>
                )}
              </div>
              
              <div className="step-content">
                <div className="step-number">Step {step.id}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`connector ${index < activeStep ? 'active' : ''}`}>
                <div className="connector-line"></div>
                <div className="connector-progress" style={{ '--connector-color': step.color }}></div>
                {index < activeStep && <div className="connector-flow"></div>}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="process-stats">
        <div className="stat-card">
          <span className="material-symbols-outlined">schedule</span>
          <div>
            <div className="stat-value">72hrs</div>
            <div className="stat-label">Avg Response</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined">verified_user</span>
          <div>
            <div className="stat-value">12,500+</div>
            <div className="stat-label">Resolved</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined">trending_up</span>
          <div>
            <div className="stat-value">95%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProcessVisual;
