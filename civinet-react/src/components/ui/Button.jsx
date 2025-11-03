import { cn } from '../../utils/cn';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  icon = null,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full',
        disabled && 'btn-disabled',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="material-symbols-outlined btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
