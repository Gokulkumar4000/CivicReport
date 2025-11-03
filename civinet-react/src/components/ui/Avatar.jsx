import { cn } from '../../utils/cn';
import './Avatar.css';

const Avatar = ({ 
  src, 
  alt = 'Avatar',
  size = 'md',
  fallback = null,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'avatar',
        `avatar-${size}`,
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="avatar-img" />
      ) : (
        <div className="avatar-fallback">
          {fallback || <span className="material-symbols-outlined">person</span>}
        </div>
      )}
    </div>
  );
};

export default Avatar;
