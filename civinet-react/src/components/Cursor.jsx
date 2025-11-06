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

    let followerTimeout;
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      if (followerTimeout) clearTimeout(followerTimeout);
      followerTimeout = setTimeout(() => {
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

    const attachedElements = new WeakSet();

    const attachHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea');
      interactiveElements.forEach(el => {
        if (!attachedElements.has(el)) {
          el.addEventListener('mouseenter', handleMouseEnter);
          el.addEventListener('mouseleave', handleMouseLeave);
          attachedElements.add(el);
        }
      });
    };

    document.addEventListener('mousemove', moveCursor);
    
    attachHoverListeners();

    let observerTimeout;
    const observer = new MutationObserver(() => {
      if (observerTimeout) clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        attachHoverListeners();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
      if (followerTimeout) clearTimeout(followerTimeout);
      if (observerTimeout) clearTimeout(observerTimeout);
      cursor.remove();
      follower.remove();
    };
  }, [location]);

  return null;
};

export default Cursor;
