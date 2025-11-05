import { useSidebar } from '../contexts/SidebarContext';
import './MenuButton.css';

const MenuButton = () => {
  const { toggle, isOpen } = useSidebar();

  return (
    <button 
      className={`menu-button ${!isOpen ? 'sidebar-collapsed' : ''}`} 
      onClick={toggle} 
      aria-label="Toggle menu"
    >
      <span className="material-symbols-outlined">menu</span>
    </button>
  );
};

export default MenuButton;
