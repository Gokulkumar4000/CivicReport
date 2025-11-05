import { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  return (
    <div className={`notification notification-${type}`}>
      <span className="material-symbols-outlined notification-icon">
        {icons[type] || icons.info}
      </span>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

export default Notification;
