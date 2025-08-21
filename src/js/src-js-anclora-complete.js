/* =====================================================
   ANCLORA DESIGN SYSTEM - COMPLETE JAVASCRIPT v1.0.0
   Sistema completo de JavaScript con todas las funcionalidades
   ================================================== */

'use strict';

/* === GLOBAL NAMESPACE === */
window.Anclora = window.Anclora || {};

/* === THEME MANAGER === */
class AncloraThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    
    this.init();
  }

  init() {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('anclora-theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(this.prefersDark.matches ? 'dark' : 'light');
    }

    // Listen for system theme changes
    this.prefersDark.addListener((e) => {
      if (!localStorage.getItem('anclora-theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Listen for reduced motion preference
    this.prefersReducedMotion.addListener((e) => {
      document.documentElement.setAttribute('data-reduced-motion', e.matches);
      this.announcePreferenceChange('motion', e.matches ? 'reduced' : 'normal');
    });

    // Listen for high contrast preference
    this.prefersHighContrast.addListener((e) => {
      document.documentElement.setAttribute('data-high-contrast', e.matches);
      this.announcePreferenceChange('contrast', e.matches ? 'high' : 'normal');
    });

    // Set initial attributes
    document.documentElement.setAttribute('data-reduced-motion', this.prefersReducedMotion.matches);
    document.documentElement.setAttribute('data-high-contrast', this.prefersHighContrast.matches);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('anclora-theme', theme);
    
    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = theme === 'dark' ? '#0D1F22' : '#F8FAFC';

    // Announce theme change to screen readers
    this.announceThemeChange(theme);
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('anclora:theme-changed', { 
      detail: { theme, previousTheme: this.currentTheme }
    }));
  }

  toggleTheme() {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }

  announceThemeChange(theme) {
    const announcer = document.querySelector('[aria-live="polite"]') || 
                    document.querySelector('#announcements');
    
    if (announcer) {
      announcer.textContent = `Tema cambiado a ${theme === 'dark' ? 'oscuro' : 'claro'}`;
    }
  }

  announcePreferenceChange(type, value) {
    const announcer = document.querySelector('[aria-live="polite"]');
    if (announcer) {
      announcer.textContent = `Preferencia de ${type} cambiada a ${value}`;
    }
  }
}

/* === ACCESSIBILITY MANAGER === */
class AncloraAccessibilityManager {
  constructor() {
    this.focusedElement = null;
    this.keyboardNavigation = false;
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupAriaLiveRegions();
    this.setupSkipLinks();
  }

  setupKeyboardNavigation() {
    // Track keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.keyboardNavigation = true;
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      this.keyboardNavigation = false;
      document.body.classList.remove('keyboard-nav');
    });

    // Enhanced keyboard navigation for components
    document.addEventListener('keydown', (e) => {
      this.handleComponentKeyboard(e);
    });
  }

  setupFocusManagement() {
    document.addEventListener('focusin', (e) => {
      this.focusedElement = e.target;
    });

    document.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!document.activeElement || document.activeElement === document.body) {
          this.focusedElement = null;
        }
      }, 10);
    });
  }

  setupAriaLiveRegions() {
    // Create live regions if they don't exist
    if (!document.querySelector('[aria-live="polite"]')) {
      const politeRegion = document.createElement('div');
      politeRegion.setAttribute('aria-live', 'polite');
      politeRegion.setAttribute('aria-atomic', 'true');
      politeRegion.className = 'sr-only';
      politeRegion.id = 'announcements';
      document.body.appendChild(politeRegion);
    }

    if (!document.querySelector('[aria-live="assertive"]')) {
      const assertiveRegion = document.createElement('div');
      assertiveRegion.setAttribute('aria-live', 'assertive');
      assertiveRegion.setAttribute('aria-atomic', 'true');
      assertiveRegion.className = 'sr-only';
      assertiveRegion.id = 'urgent-announcements';
      document.body.appendChild(assertiveRegion);
    }
  }

  setupSkipLinks() {
    // Auto-create skip link if main content exists but skip link doesn't
    const mainContent = document.querySelector('main, #main-content, [role="main"]');
    const existingSkipLink = document.querySelector('.skip-link, [href="#main-content"]');
    
    if (mainContent && !existingSkipLink) {
      const skipLink = document.createElement('a');
      skipLink.href = '#' + (mainContent.id || 'main-content');
      skipLink.className = 'skip-link';
      skipLink.textContent = 'Saltar al contenido principal';
      
      if (!mainContent.id) {
        mainContent.id = 'main-content';
      }
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  }

  handleComponentKeyboard(e) {
    const { key, target } = e;
    
    // Enhanced modal keyboard handling
    if (target.closest('[role="dialog"]')) {
      this.handleModalKeyboard(e);
    }
    
    // Enhanced dropdown keyboard handling
    if (target.closest('[role="listbox"], [role="menu"]')) {
      this.handleDropdownKeyboard(e);
    }

    // Enhanced button keyboard handling
    if (target.matches('button, [role="button"]')) {
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        target.click();
      }
    }
  }

  handleModalKeyboard(e) {
    const modal = e.target.closest('[role="dialog"]');
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (e.key === 'Tab') {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    
    if (e.key === 'Escape') {
      this.closeModal(modal);
    }
  }

  handleDropdownKeyboard(e) {
    const dropdown = e.target.closest('[role="listbox"], [role="menu"]');
    const options = dropdown.querySelectorAll('[role="option"], [role="menuitem"]');
    const currentIndex = Array.from(options).indexOf(document.activeElement);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        options[nextIndex].focus();
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
        options[prevIndex].focus();
        break;
        
      case 'Home':
        e.preventDefault();
        options[0].focus();
        break;
        
      case 'End':
        e.preventDefault();
        options[options.length - 1].focus();
        break;
        
      case 'Escape':
        this.closeDropdown(dropdown);
        break;
    }
  }

  closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to trigger element
    const trigger = document.querySelector(`[aria-controls="${modal.id}"]`);
    if (trigger) {
      trigger.focus();
    }
  }

  closeDropdown(dropdown) {
    dropdown.style.display = 'none';
    dropdown.setAttribute('aria-hidden', 'true');
    
    // Return focus to trigger element
    const trigger = document.querySelector(`[aria-controls="${dropdown.id}"]`);
    if (trigger) {
      trigger.focus();
    }
  }

  announce(message, priority = 'polite') {
    const region = document.querySelector(`[aria-live="${priority}"]`);
    if (region) {
      // Clear first, then set message to ensure it's announced
      region.textContent = '';
      setTimeout(() => {
        region.textContent = message;
      }, 100);
    }
  }

  // Color contrast checker
  checkContrast(foreground, background) {
    const getLuminance = (color) => {
      const rgb = this.hexToRgb(color);
      const rsRGB = rgb.r / 255;
      const gsRGB = rgb.g / 255;
      const bsRGB = rgb.b / 255;

      const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
      const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
      const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio: Math.round(ratio * 100) / 100,
      AA: ratio >= 4.5,
      AAA: ratio >= 7,
      AALarge: ratio >= 3
    };
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}

/* === UX FEEDBACK MANAGER === */
class AncloraUXFeedback {
  constructor(options = {}) {
    this.options = {
      enableSounds: options.enableSounds !== false,
      enableHaptics: options.enableHaptics !== false,
      enableAnimations: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      debugMode: options.debugMode || false,
      ...options
    };

    this.isInitialized = false;
    this.activeAnimations = new Map();
    this.soundContext = null;
    this.hapticSupported = 'vibrate' in navigator;
    this.notificationCounter = 0;
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;

    this.setupEventListeners();
    this.initializeSoundSystem();
    this.setupIntersectionObserver();
    this.initializeComponents();
    
    this.isInitialized = true;
    this.log('🎭 Anclora UX Feedback System initialized');
  }

  // === SOUND SYSTEM ===
  initializeSoundSystem() {
    if (!this.options.enableSounds) return;

    try {
      this.soundContext = new (window.AudioContext || window.webkitAudioContext)();
      
      this.sounds = {
        click: { frequency: 800, duration: 100, type: 'sine' },
        success: { frequency: 660, duration: 200, type: 'triangle' },
        error: { frequency: 300, duration: 300, type: 'square' },
        notification: { frequency: 1000, duration: 150, type: 'sine' },
        typing: { frequency: 1200, duration: 50, type: 'triangle' }
      };
    } catch (e) {
      this.log('🔇 Audio context not available');
      this.options.enableSounds = false;
    }
  }

  playSound(type, volume = 0.1) {
    if (!this.options.enableSounds || !this.soundContext) return;

    const sound = this.sounds[type];
    if (!sound) return;

    try {
      const oscillator = this.soundContext.createOscillator();
      const gainNode = this.soundContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.soundContext.destination);

      oscillator.frequency.value = sound.frequency;
      oscillator.type = sound.type;
      
      gainNode.gain.setValueAtTime(0, this.soundContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.soundContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.soundContext.currentTime + sound.duration / 1000);

      oscillator.start(this.soundContext.currentTime);
      oscillator.stop(this.soundContext.currentTime + sound.duration / 1000);
    } catch (e) {
      this.log('🔇 Error playing sound:', e);
    }
  }

  // === HAPTIC FEEDBACK ===
  triggerHaptic(pattern = [100]) {
    if (!this.options.enableHaptics || !this.hapticSupported) return;
    
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      this.log('📳 Haptic feedback failed:', e);
    }
  }

  // === ANIMATIONS ===
  animateElement(element, animationName, options = {}) {
    if (!this.options.enableAnimations) return Promise.resolve();

    const {
      duration = 0.3,
      onComplete = null,
      removeAfter = true
    } = options;

    return new Promise((resolve) => {
      if (this.activeAnimations.has(element)) {
        this.activeAnimations.get(element).cancel();
      }

      element.classList.add(animationName);
      
      const cleanup = () => {
        if (removeAfter) {
          element.classList.remove(animationName);
        }
        this.activeAnimations.delete(element);
        if (onComplete) onComplete();
        resolve();
      };

      const handleAnimationEnd = (e) => {
        if (e.target === element) {
          element.removeEventListener('animationend', handleAnimationEnd);
          cleanup();
        }
      };

      element.addEventListener('animationend', handleAnimationEnd);
      
      const timeoutId = setTimeout(cleanup, duration * 1000 + 100);
      this.activeAnimations.set(element, { 
        cancel: () => {
          clearTimeout(timeoutId);
          element.removeEventListener('animationend', handleAnimationEnd);
          cleanup();
        }
      });
    });
  }

  // === NOTIFICATIONS ===
  showSuccess(message, element = null, options = {}) {
    this.playSound('success');
    this.triggerHaptic([100, 50, 100]);
    
    if (element) {
      this.animateElement(element, 'anclora-bounce');
    }

    return this.showNotification(message, 'success', options);
  }

  showError(message, element = null, options = {}) {
    this.playSound('error');
    this.triggerHaptic([200, 100, 200]);
    
    if (element) {
      this.animateElement(element, 'anclora-error-shake');
    }

    return this.showNotification(message, 'error', options);
  }

  showNotification(message, type = 'info', options = {}) {
    const {
      duration = 3000,
      position = 'top-right',
      persistent = false,
      actions = []
    } = options;

    this.notificationCounter++;
    const notificationId = `anclora-notification-${this.notificationCounter}`;

    const notification = document.createElement('div');
    notification.id = notificationId;
    notification.className = `anclora-notification anclora-notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    
    notification.innerHTML = `
      <div class="anclora-notification-content">
        <div class="anclora-notification-icon" aria-hidden="true">
          ${this.getIconForType(type)}
        </div>
        <div class="anclora-notification-message">${message}</div>
        ${actions.length ? `<div class="anclora-notification-actions">
          ${actions.map(action => `
            <button class="anclora-notification-btn" data-action="${action.id}">
              ${action.label}
            </button>
          `).join('')}
        </div>` : ''}
        <button class="anclora-notification-close" aria-label="Cerrar notificación">×</button>
      </div>
    `;

    this.positionNotification(notification, position);
    document.body.appendChild(notification);
    
    // Animate in
    this.animateElement(notification, 'anclora-fade-in', { removeAfter: false });

    this.setupNotificationListeners(notification, actions);

    if (!persistent && duration > 0) {
      setTimeout(() => {
        this.hideNotification(notification);
      }, duration);
    }

    // Announce to screen readers
    Anclora.accessibility.announce(message, type === 'error' ? 'assertive' : 'polite');

    return notification;
  }

  hideNotification(notification) {
    this.animateElement(notification, 'anclora-fade-out', {
      onComplete: () => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }
    });
  }

  // === PROGRESS BARS ===
  createProgressBar(container, options = {}) {
    const {
      initialValue = 0,
      showPercentage = true,
      animated = true
    } = options;

    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'anclora-progress';
    progressWrapper.setAttribute('role', 'progressbar');
    progressWrapper.setAttribute('aria-valuemin', '0');
    progressWrapper.setAttribute('aria-valuemax', '100');
    progressWrapper.setAttribute('aria-valuenow', initialValue.toString());
    
    const progressBar = document.createElement('div');
    progressBar.className = `anclora-progress-bar ${animated ? 'anclora-smooth' : ''}`;
    progressBar.style.width = `${initialValue}%`;
    
    if (showPercentage) {
      const percentageLabel = document.createElement('span');
      percentageLabel.className = 'anclora-progress-percentage';
      percentageLabel.textContent = `${initialValue}%`;
      percentageLabel.setAttribute('aria-hidden', 'true');
      progressWrapper.appendChild(percentageLabel);
    }

    progressWrapper.appendChild(progressBar);
    container.appendChild(progressWrapper);

    return {
      update: (value) => {
        const clampedValue = Math.max(0, Math.min(100, value));
        progressBar.style.width = `${clampedValue}%`;
        progressWrapper.setAttribute('aria-valuenow', clampedValue.toString());
        
        if (showPercentage) {
          progressWrapper.querySelector('.anclora-progress-percentage').textContent = `${clampedValue}%`;
        }

        if (clampedValue === 100) {
          this.playSound('success');
          this.triggerHaptic([100]);
          progressWrapper.setAttribute('aria-valuetext', 'Completado');
        } else if (clampedValue % 25 === 0 && clampedValue > 0) {
          this.playSound('notification', 0.05);
        }
      },
      destroy: () => {
        if (progressWrapper.parentNode) {
          progressWrapper.parentNode.removeChild(progressWrapper);
        }
      }
    };
  }

  // === LOADING STATES ===
  showLoading(element, options = {}) {
    const {
      message = 'Cargando...',
      type = 'shimmer'
    } = options;

    if (!element.dataset.originalContent) {
      element.dataset.originalContent = element.innerHTML;
    }

    element.classList.add('anclora-loading');
    
    switch (type) {
      case 'skeleton':
        element.innerHTML = this.createSkeletonContent(element);
        break;
      case 'spinner':
        element.innerHTML = `
          <div class="anclora-spinner" role="status" aria-label="${message}">
            <div class="anclora-spinner-icon" aria-hidden="true">⚡</div>
            <span class="sr-only">${message}</span>
          </div>
        `;
        break;
      case 'shimmer':
      default:
        element.classList.add('anclora-skeleton');
        element.setAttribute('aria-busy', 'true');
        element.setAttribute('aria-label', message);
        break;
    }

    return {
      hide: () => this.hideLoading(element)
    };
  }

  hideLoading(element) {
    element.classList.remove('anclora-loading', 'anclora-skeleton');
    element.removeAttribute('aria-busy');
    element.removeAttribute('aria-label');
    
    if (element.dataset.originalContent) {
      element.innerHTML = element.dataset.originalContent;
      delete element.dataset.originalContent;
    }
  }

  showLoadingOverlay(message, options = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'anclora-loading-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'loading-title');
    
    overlay.innerHTML = `
      <div class="anclora-loading-content">
        <div class="anclora-loading-spinner anclora-floating" aria-hidden="true">
          <div class="anclora-tech-icon">⚡</div>
        </div>
        <h3 id="loading-title">${message}</h3>
        <div class="anclora-loading-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    
    this.animateElement(overlay, 'anclora-fade-in', { removeAfter: false });
    
    // Focus trap
    overlay.focus();

    return {
      hide: () => {
        this.animateElement(overlay, 'anclora-fade-out', {
          onComplete: () => {
            if (overlay.parentNode) {
              overlay.parentNode.removeChild(overlay);
            }
          }
        });
      }
    };
  }

  // === TYPING EFFECTS ===
  typeText(element, text, options = {}) {
    const {
      speed = 50,
      cursor = true,
      sound = true,
      onComplete = null
    } = options;

    if (cursor) element.classList.add('anclora-typing');
    
    let index = 0;
    element.textContent = '';

    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text[index];
        
        if (sound && this.options.enableSounds) {
          this.playSound('typing', 0.02);
        }
        
        index++;
        setTimeout(typeChar, speed);
      } else {
        if (cursor) element.classList.remove('anclora-typing');
        if (onComplete) onComplete();
      }
    };

    typeChar();
  }

  // === EVENT LISTENERS ===
  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.btn-anclora, button, .btn, [role="button"]')) {
        this.handleButtonClick(e.target);
      }
    });

    document.addEventListener('focus', (e) => {
      if (e.target.matches('input, textarea, select')) {
        this.handleInputFocus(e.target);
      }
    }, true);

    window.matchMedia('(prefers-reduced-motion: reduce)').addListener((e) => {
      this.options.enableAnimations = !e.matches;
    });
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.ancloraAnimation;
          const delay = parseInt(element.dataset.ancloraDelay) || 0;
          
          if (animation) {
            setTimeout(() => {
              this.animateElement(element, animation);
            }, delay);
            
            this.observer.unobserve(element);
          }
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('[data-anclora-animation]').forEach(el => {
      this.observer.observe(el);
    });
  }

  initializeComponents() {
    document.querySelectorAll('[data-anclora-component]').forEach(el => {
      const component = el.dataset.ancloraComponent;
      const options = this.parseOptions(el.dataset.ancloraOptions);
      this.initializeComponent(el, component, options);
    });
  }

  handleButtonClick(button) {
    this.playSound('click');
    this.triggerHaptic([50]);
    
    if (this.options.enableAnimations) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }
  }

  handleInputFocus(input) {
    this.playSound('click', 0.03);
    
    if (this.options.enableAnimations) {
      this.animateElement(input, 'anclora-fade-in');
    }
  }

  // === UTILITIES ===
  getIconForType(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  positionNotification(notification, position) {
    const positions = {
      'top-right': { top: '20px', right: '20px' },
      'top-left': { top: '20px', left: '20px' },
      'bottom-right': { bottom: '20px', right: '20px' },
      'bottom-left': { bottom: '20px', left: '20px' },
      'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' }
    };

    Object.assign(notification.style, {
      position: 'fixed',
      zIndex: '9999',
      ...positions[position]
    });
  }

  setupNotificationListeners(notification, actions) {
    const closeBtn = notification.querySelector('.anclora-notification-close');
    closeBtn?.addEventListener('click', () => this.hideNotification(notification));

    actions.forEach(action => {
      const btn = notification.querySelector(`[data-action="${action.id}"]`);
      btn?.addEventListener('click', () => {
        action.callback && action.callback();
        if (action.closeOnClick !== false) {
          this.hideNotification(notification);
        }
      });
    });

    setTimeout(() => {
      const clickOutsideListener = (e) => {
        if (!notification.contains(e.target)) {
          this.hideNotification(notification);
          document.removeEventListener('click', clickOutsideListener);
        }
      };
      document.addEventListener('click', clickOutsideListener);
    }, 100);
  }

  createSkeletonContent(element) {
    const height = element.offsetHeight || 20;
    return `<div class="anclora-skeleton" style="height: ${height}px; border-radius: 4px;"></div>`;
  }

  parseOptions(optionsString) {
    try {
      return JSON.parse(optionsString || '{}');
    } catch {
      return {};
    }
  }

  log(message, ...args) {
    if (this.options.debugMode) {
      console.log(`[Anclora UX] ${message}`, ...args);
    }
  }
}

/* === COMPONENT TESTER === */
class AncloraComponentTester {
  constructor(options = {}) {
    this.options = {
      editorSelector: '#codeEditor',
      previewSelector: '#previewFrame',
      debounceDelay: 500,
      ...options
    };

    this.currentCode = '';
    this.debounceTimer = null;
    this.isProcessing = false;
    
    this.init();
  }

  init() {
    this.setupElements();
    this.setupEventListeners();
    this.loadExamples();
  }

  setupElements() {
    this.codeEditor = document.querySelector(this.options.editorSelector);
    this.previewFrame = document.querySelector(this.options.previewSelector);
    this.charCount = document.querySelector('#charCount');
    this.frameworkBadge = document.querySelector('#frameworkBadge');
    this.testBtn = document.querySelector('#testBtn');
    this.clearBtn = document.querySelector('#clearBtn');
    
    if (!this.codeEditor || !this.previewFrame) {
      console.error('Required elements not found');
      return;
    }
  }

  setupEventListeners() {
    // Code editor events
    this.codeEditor?.addEventListener('input', () => {
      this.updateCharCount();
      this.detectFramework();
      this.debouncedUpdate();
    });

    this.codeEditor?.addEventListener('paste', () => {
      setTimeout(() => {
        this.updateCharCount();
        this.detectFramework();
        this.debouncedUpdate();
      }, 10);
    });

    // Button events
    this.testBtn?.addEventListener('click', () => this.processComponent());
    this.clearBtn?.addEventListener('click', () => this.clearEditor());

    // Example buttons
    document.querySelector('#tailwindExampleBtn')?.addEventListener('click', () => {
      this.loadExample('tailwind');
    });

    document.querySelector('#chakraExampleBtn')?.addEventListener('click', () => {
      this.loadExample('chakra');
    });
  }

  updateCharCount() {
    if (this.charCount && this.codeEditor) {
      const count = this.codeEditor.value.length;
      this.charCount.textContent = `${count} caracteres`;
      
      // Update accessibility
      this.codeEditor.setAttribute('aria-label', `Editor de código. ${count} caracteres escritos.`);
    }
  }

  detectFramework() {
    if (!this.codeEditor || !this.frameworkBadge) return;

    const code = this.codeEditor.value.toLowerCase();
    let framework = 'Ningún framework';

    if (code.includes('class=') && (code.includes('flex') || code.includes('grid') || code.includes('p-') || code.includes('m-') || code.includes('bg-'))) {
      framework = 'Tailwind CSS detectado';
    } else if (code.includes('chakra') || code.includes('colorscheme') || code.includes('variant=')) {
      framework = 'Chakra UI detectado';
    } else if (code.includes('class=') || code.includes('style=')) {
      framework = 'HTML/CSS detectado';
    }

    this.frameworkBadge.textContent = framework;
    
    // Announce framework detection
    if (framework !== 'Ningún framework') {
      Anclora.accessibility.announce(`${framework}`);
    }
  }

  debouncedUpdate() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      if (this.codeEditor.value.trim() && this.codeEditor.value !== this.currentCode) {
        this.processComponent();
      }
    }, this.options.debounceDelay);
  }

  async processComponent() {
    if (this.isProcessing) return;

    const code = this.codeEditor?.value?.trim();
    if (!code) {
      Anclora.ux.showError('Por favor ingresa código para probar');
      return;
    }

    this.isProcessing = true;
    this.currentCode = code;

    try {
      // Show loading
      const loader = Anclora.ux.showLoading(this.previewFrame.parentElement, {
        message: 'Procesando componente...',
        type: 'shimmer'
      });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Create preview HTML
      const previewHTML = this.createPreviewHTML(code);
      
      // Update preview frame
      this.updatePreview(previewHTML);
      
      // Hide loading
      loader.hide();
      
      // Show success feedback
      Anclora.ux.showSuccess('¡Componente procesado exitosamente!');
      
    } catch (error) {
      console.error('Error processing component:', error);
      Anclora.ux.showError('Error al procesar el componente: ' + error.message);
    } finally {
      this.isProcessing = false;
    }
  }

  createPreviewHTML(code) {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  brand: {
                    700: '#213A57',
                    600: '#0B6477', 
                    500: '#14919B',
                    400: '#0AD1C8',
                    300: '#45DFB1',
                    200: '#80ED99'
                  }
                }
              }
            }
          }
        </script>
        <style>
          body { 
            font-family: 'Inter', system-ui, sans-serif; 
            padding: 20px;
            background: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        ${code}
      </body>
      </html>
    `;
  }

  updatePreview(html) {
    if (!this.previewFrame) return;

    // Create blob URL for preview
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    this.previewFrame.src = url;
    this.previewFrame.style.display = 'block';
    
    // Hide default preview message
    const previewStatus = document.querySelector('#previewStatus');
    if (previewStatus) {
      previewStatus.style.display = 'none';
    }

    // Cleanup blob URL after load
    this.previewFrame.onload = () => {
      URL.revokeObjectURL(url);
    };
  }

  clearEditor() {
    if (this.codeEditor) {
      this.codeEditor.value = '';
      this.updateCharCount();
      this.detectFramework();
      
      // Reset preview
      if (this.previewFrame) {
        this.previewFrame.style.display = 'none';
      }
      
      const previewStatus = document.querySelector('#previewStatus');
      if (previewStatus) {
        previewStatus.style.display = 'flex';
      }
      
      Anclora.accessibility.announce('Editor limpiado');
    }
  }

  loadExamples() {
    this.examples = {
      tailwind: `<div class="bg-gradient-to-r from-brand-600 to-brand-400 p-6 rounded-xl text-white shadow-lg max-w-md mx-auto">
  <h2 class="text-2xl font-bold mb-2">¡Hola desde Tailwind!</h2>
  <p class="text-brand-100 mb-4">Este es un ejemplo con los colores de Anclora</p>
  <button class="bg-white text-brand-600 px-4 py-2 rounded-lg font-medium hover:bg-brand-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600">
    Botón Ejemplo
  </button>
</div>`,

      chakra: `<div style="background: linear-gradient(90deg, #0B6477, #14919B); padding: 1.5rem; border-radius: 0.75rem; color: white; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); max-width: 28rem; margin: 0 auto;">
  <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem;">¡Hola desde Chakra!</</h2>
  <p style="color: rgba(255, 255, 255, 0.9); margin-bottom: 1rem;">Ejemplo con colores Anclora</p>
  <button style="background: white; color: #0B6477; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s;" 
          onmouseover="this.style.background='#F8FAFC'" 
          onmouseout="this.style.background='white'">
    Botón Chakra
  </button>
</div>`
    };
  }

  loadExample(type) {
    if (this.examples[type] && this.codeEditor) {
      this.codeEditor.value = this.examples[type];
      this.updateCharCount();
      this.detectFramework();
      
      Anclora.accessibility.announce(`Ejemplo de ${type} cargado en el editor`);
      
      // Process automatically
      setTimeout(() => {
        this.processComponent();
      }, 500);
    }
  }
}

/* === INITIALIZATION === */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all Anclora systems
  Anclora.theme = new AncloraThemeManager();
  Anclora.accessibility = new AncloraAccessibilityManager();
  Anclora.ux = new AncloraUXFeedback({
    debugMode: window.location.hostname === 'localhost'
  });
  Anclora.tester = new AncloraComponentTester();

  // Setup theme toggle if exists
  const themeToggle = document.querySelector('#themeToggle, #colorThemeBtn');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      Anclora.theme.toggleTheme();
      Anclora.ux.playSound('click');
    });
  }

  // Initialize feather icons if available
  if (window.feather) {
    feather.replace();
  }

  // Welcome message
  setTimeout(() => {
    Anclora.ux.showNotification(
      '¡Sistema Anclora inicializado correctamente! 🎯', 
      'success', 
      { 
        duration: 3000,
        position: 'bottom-right'
      }
    );
  }, 1000);

  console.log('🌟 Anclora Design System v1.0.0 loaded successfully');
});

/* === EXPORTS === */
window.Anclora = {
  theme: null,
  accessibility: null,  
  ux: null,
  tester: null,
  version: '1.0.0'
};