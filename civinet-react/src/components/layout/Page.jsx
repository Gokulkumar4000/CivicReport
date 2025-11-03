import { cn } from '../../utils/cn';
import './Page.css';

const Page = ({ children, hasBottomNav = false, className = '' }) => {
  return (
    <div className={cn('page-container', hasBottomNav && 'has-bottom-nav', className)}>
      {children}
    </div>
  );
};

export default Page;
