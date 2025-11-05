import { useSidebar } from '../contexts/SidebarContext';
import './MenuButton.css';

const MenuButton = () => {
  const { toggle } = useSidebar();

  return (
    <button className="menu-button" onClick={toggle} aria-label="Toggle menu">
      <span className="material-symbols-outlined">menu</span>
    </button>
  );
};

export default MenuButton;
