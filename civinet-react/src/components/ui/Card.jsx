import { cn } from '../../utils/cn';
import './Card.css';

const Card = ({ 
  children, 
  header = null,
  footer = null,
  media = null,
  hoverable = false,
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'card',
        hoverable && 'card-hoverable',
        className
      )}
      {...props}
    >
      {media && <div className="card-media">{media}</div>}
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
