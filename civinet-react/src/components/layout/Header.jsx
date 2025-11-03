import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';
import './Header.css';

const Header = ({ 
  title, 
  onBack = null,
  actions = null,
  sticky = true,
  className = '' 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={cn('page-header', sticky && 'header-sticky', className)}>
      {onBack !== false && (
        <button className="header-back-btn" onClick={handleBack}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      )}
      {title && <h1 className="header-title">{title}</h1>}
      <div className="header-actions">{actions}</div>
    </header>
  );
};

export default Header;
