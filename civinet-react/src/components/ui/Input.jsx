import { cn } from '../../utils/cn';
import './Input.css';

const Input = ({ 
  label,
  error,
  icon,
  className = '',
  ...props 
}) => {
  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}
      <div className="input-container">
        {icon && <span className="material-symbols-outlined input-icon">{icon}</span>}
        <input
          className={cn(
            'input-field',
            icon && 'input-with-icon',
            error && 'input-error',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
};

export default Input;
