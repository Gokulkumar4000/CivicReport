import { cn } from '../../utils/cn';
import './Tag.css';

const Tag = ({ 
  children, 
  onRemove = null,
  variant = 'primary',
  className = '',
  ...props 
}) => {
  return (
    <span
      className={cn(
        'tag',
        `tag-${variant}`,
        className
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button 
          className="tag-remove" 
          onClick={onRemove}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </span>
  );
};

export default Tag;
