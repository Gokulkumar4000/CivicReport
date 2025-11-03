// CIVINET Component Library - Ready for React/Next.js conversion
// This file contains reusable component functions that can be easily converted to React components

// ============= UTILITY FUNCTIONS =============

// Language data
const translations = {
  en: {
    home: 'Home',
    features: 'Features',
    howItWorks: 'How It Works',
    successStories: 'Success Stories',
    leaderboard: 'Leaderboard',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    report: 'Report',
    profile: 'Profile',
    detectLocation: 'Detect Location',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    remove: 'Remove',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info'
  },
  hi: {
    home: 'होम',
    features: 'विशेषताएं',
    howItWorks: 'कैसे काम करता है',
    successStories: 'सफलता की कहानियां',
    leaderboard: 'लीडरबोर्ड',
    signUp: 'साइन अप करें',
    signIn: 'साइन इन करें',
    report: 'रिपोर्ट',
    profile: 'प्रोफ़ाइल',
    detectLocation: 'स्थान का पता लगाएं',
    submit: 'सबमिट करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    add: 'जोड़ें',
    remove: 'हटाएं',
    yes: 'हाँ',
    no: 'नहीं',
    loading: 'लोड हो रहा है...',
    success: 'सफलता',
    error: 'त्रुटि',
    warning: 'चेतावनी',
    info: 'जानकारी'
  }
};

// Current language (default to English)
let currentLanguage = localStorage.getItem('civinetLanguage') || 'en';

// Language switcher component
function createLanguageSwitcher(containerClass = 'lang-switch-default') {
  const switcher = document.createElement('button');
  switcher.className = `language-switcher ${containerClass}`;
  switcher.setAttribute('aria-label', 'Switch Language');
  
  const flag = currentLanguage === 'en' ? '🇺🇸' : '🇮🇳';
  const langText = currentLanguage === 'en' ? 'EN' : 'हिं';
  
  switcher.innerHTML = `
    <span class="lang-flag">${flag}</span>
    <span class="lang-text">${langText}</span>
  `;
  
  switcher.onclick = () => toggleLanguage();
  
  return switcher;
}

// Toggle language function
function toggleLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
  localStorage.setItem('civinetLanguage', currentLanguage);
  
  // Show notification
  showNotification(
    currentLanguage === 'en' ? 'Language changed to English' : 'भाषा हिंदी में बदल गई',
    'info'
  );
  
  // Reload page to apply new language
  setTimeout(() => window.location.reload(), 500);
}

// Get translation
function t(key) {
  return translations[currentLanguage][key] || key;
}

// Animation utility - can be converted to React hooks
function fadeInUp(element, delay = 0) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'all 0.6s ease';
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, delay);
}

function slideIn(element, direction = 'left', delay = 0) {
  const transforms = {
    left: 'translateX(-50px)',
    right: 'translateX(50px)',
    top: 'translateY(-50px)',
    bottom: 'translateY(50px)'
  };
  
  element.style.opacity = '0';
  element.style.transform = transforms[direction];
  element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translate(0, 0)';
  }, delay);
}

function scaleIn(element, delay = 0) {
  element.style.opacity = '0';
  element.style.transform = 'scale(0.8)';
  element.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
  }, delay);
}

// ============= NOTIFICATION COMPONENT =============
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  notification.innerHTML = `
    <span class="notification-icon">${icons[type] || icons.info}</span>
    <span class="notification-message">${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Auto dismiss
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============= LOCATION COMPONENT =============
let detectedLocation = null;

function createLocationButton(onLocationDetected) {
  const button = document.createElement('button');
  button.className = 'location-detect-btn';
  button.innerHTML = `
    <span class="material-symbols-outlined">my_location</span>
    <span class="location-btn-text">Detect Location</span>
    <span class="location-spinner" style="display:none;">
      <span class="spinner"></span>
    </span>
  `;
  
  button.onclick = async () => {
    if (!navigator.geolocation) {
      showNotification('Geolocation is not supported by your browser', 'error');
      return;
    }
    
    button.disabled = true;
    button.querySelector('.location-btn-text').textContent = 'Detecting...';
    button.querySelector('.location-spinner').style.display = 'inline-block';
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // For demo, use approximate location
        const location = {
          lat: latitude,
          lng: longitude,
          city: 'San Francisco',
          address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
        };
        
        detectedLocation = location;
        
        button.querySelector('.location-btn-text').textContent = 'Location Detected';
        button.querySelector('.location-spinner').style.display = 'none';
        button.classList.add('detected');
        
        showNotification('Location detected successfully', 'success');
        
        if (onLocationDetected) {
          onLocationDetected(location);
        }
        
        setTimeout(() => button.disabled = false, 500);
      },
      (error) => {
        button.querySelector('.location-btn-text').textContent = 'Detect Location';
        button.querySelector('.location-spinner').style.display = 'none';
        button.disabled = false;
        
        showNotification('Failed to detect location. Please enable location services.', 'error');
      }
    );
  };
  
  return button;
}

// ============= TAG INPUT COMPONENT =============
function createTagInput(container, existingTags = []) {
  const tags = [...existingTags];
  
  function render() {
    container.innerHTML = '';
    
    tags.forEach((tag, index) => {
      const tagElement = document.createElement('div');
      tagElement.className = 'tag-item animate-scale-in';
      tagElement.innerHTML = `
        <span class="tag-text">${tag}</span>
        <button class="tag-remove" data-index="${index}">
          <span class="material-symbols-outlined">close</span>
        </button>
      `;
      container.appendChild(tagElement);
    });
    
    const addButton = document.createElement('button');
    addButton.className = 'tag-add-btn';
    addButton.innerHTML = `
      <span class="material-symbols-outlined">add</span>
      <span>Add Tag</span>
    `;
    addButton.onclick = () => showTagInputDialog();
    container.appendChild(addButton);
    
    // Add remove listeners
    container.querySelectorAll('.tag-remove').forEach(btn => {
      btn.onclick = () => {
        const index = parseInt(btn.dataset.index);
        tags.splice(index, 1);
        render();
      };
    });
  }
  
  function showTagInputDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'tag-input-dialog';
    dialog.innerHTML = `
      <div class="tag-input-content">
        <h3>Add New Tag</h3>
        <input type="text" class="tag-input-field" placeholder="Enter tag name..." maxlength="20">
        <div class="tag-input-actions">
          <button class="btn-cancel">Cancel</button>
          <button class="btn-add">Add</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(dialog);
    setTimeout(() => dialog.classList.add('show'), 10);
    
    const input = dialog.querySelector('.tag-input-field');
    input.focus();
    
    dialog.querySelector('.btn-cancel').onclick = () => {
      dialog.classList.remove('show');
      setTimeout(() => dialog.remove(), 300);
    };
    
    dialog.querySelector('.btn-add').onclick = () => {
      const value = input.value.trim();
      if (value && !tags.includes(value)) {
        tags.push(value);
        render();
      }
      dialog.classList.remove('show');
      setTimeout(() => dialog.remove(), 300);
    };
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        dialog.querySelector('.btn-add').click();
      }
    });
    
    // Click outside to close
    dialog.onclick = (e) => {
      if (e.target === dialog) {
        dialog.classList.remove('show');
        setTimeout(() => dialog.remove(), 300);
      }
    };
  }
  
  function getTags() {
    return [...tags];
  }
  
  render();
  
  return { getTags };
}

// ============= MOBILE MENU COMPONENT =============
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    menuBtn.querySelector('.material-symbols-outlined').textContent = isOpen ? 'close' : 'menu';
    
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      menuBtn.querySelector('.material-symbols-outlined').textContent = 'menu';
      document.body.style.overflow = '';
    });
  });
}

// ============= COUNTER ANIMATION (Run Once) =============
const animatedCounters = new Set();

function animateCounter(element, target, duration = 2000) {
  // Check if already animated
  if (animatedCounters.has(element)) return;
  animatedCounters.add(element);
  
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuad = progress * (2 - progress);
    const current = Math.floor(start + (target - start) * easeOutQuad);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }
  
  requestAnimationFrame(update);
}

// ============= INTERSECTION OBSERVER UTILITY =============
function createScrollObserver(callback, options = {}) {
  const defaultOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target, entry);
      }
    });
  }, { ...defaultOptions, ...options });
}

// ============= LOADING COMPONENT =============
function createLoader(text = 'Loading...') {
  const loader = document.createElement('div');
  loader.className = 'loader-component';
  loader.innerHTML = `
    <div class="loader-spinner"></div>
    <p class="loader-text">${text}</p>
  `;
  return loader;
}

// ============= MODAL COMPONENT =============
function createModal(content, options = {}) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  if (options.title) {
    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = options.title;
    modalContent.appendChild(title);
  }
  
  if (typeof content === 'string') {
    const body = document.createElement('div');
    body.className = 'modal-body';
    body.innerHTML = content;
    modalContent.appendChild(body);
  } else {
    modalContent.appendChild(content);
  }
  
  if (options.actions) {
    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    options.actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = action.className || 'btn-primary';
      btn.textContent = action.text;
      btn.onclick = () => {
        if (action.onClick) action.onClick();
        closeModal();
      };
      actions.appendChild(btn);
    });
    modalContent.appendChild(actions);
  }
  
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  }
  
  // Close on overlay click
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
  
  setTimeout(() => modal.classList.add('show'), 10);
  
  return { close: closeModal };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    showNotification,
    createLocationButton,
    createTagInput,
    initMobileMenu,
    animateCounter,
    createScrollObserver,
    createLoader,
    createModal,
    createLanguageSwitcher,
    toggleLanguage,
    t,
    fadeInUp,
    slideIn,
    scaleIn
  };
}
