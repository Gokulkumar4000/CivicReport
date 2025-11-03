import { cn } from '../../utils/cn';
import './Badge.css';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  return (
    <span
      className={cn(
        'badge',
        `badge-${variant}`,
        `badge-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
