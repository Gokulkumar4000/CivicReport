import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Cursor.css';

const Cursor = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 768) {
      return;
    }

    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.id = 'custom-cursor';
    follower.id = 'custom-cursor-follower';
    
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
      }, 100);
    };

    const handleMouseEnter = () => {
      cursor.classList.add('hover');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
    };

    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    document.addEventListener('mousemove', moveCursor);
    
    attachHoverListeners();

    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      cursor.remove();
      follower.remove();
    };
  }, [location]);

  return null;
};

export default Cursor;
