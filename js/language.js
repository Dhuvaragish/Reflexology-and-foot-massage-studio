/**
 * Reflexology & Foot Massage Studio - Language & Direction Management (LTR & RTL)
 */

const LanguageManager = {
  STORAGE_KEY: 'wellness_studio_dir',

  init() {
    let saved = null;
    try {
      saved = localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {}

    const currentDir = document.documentElement.getAttribute('dir');
    const dir = saved || currentDir || 'ltr';
    this.applyDirection(dir, false);
    this.bindEvents();
  },

  applyDirection(dir, save = true) {
    const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', validDir);
    document.documentElement.setAttribute('lang', validDir === 'rtl' ? 'ar' : 'en');
    if (save) {
      try {
        localStorage.setItem(this.STORAGE_KEY, validDir);
      } catch (e) {}
    }
    this.updateUI(validDir);
  },

  getDirection() {
    return document.documentElement.getAttribute('dir') || 'ltr';
  },

  toggle() {
    const next = this.getDirection() === 'rtl' ? 'ltr' : 'rtl';
    this.applyDirection(next);
  },

  updateUI(dir) {
    const curDir = dir || this.getDirection();
    const isRtl = curDir === 'rtl';

    // Update any drawer/menu buttons
    document.querySelectorAll('.dir-select-btn').forEach(btn => {
      const btnDir = btn.getAttribute('data-dir');
      if (btnDir === curDir) {
        btn.classList.add('active');
        const check = btn.querySelector('.check-indicator');
        if (check) check.style.opacity = '1';
      } else {
        btn.classList.remove('active');
        const check = btn.querySelector('.check-indicator');
        if (check) check.style.opacity = '0';
      }
    });

    // Update pill-shaped direction toggle buttons
    document.querySelectorAll('.btn-dir-toggle').forEach(btn => {
      btn.classList.toggle('active', isRtl);
      const titleText = isRtl ? 'Switch to LTR Layout' : 'Switch Layout Direction';
      btn.setAttribute('title', titleText);
      btn.setAttribute('aria-label', titleText);
    });
  },

  bindEvents() {
    // Drawer / legacy direction buttons
    document.querySelectorAll('.dir-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selected = btn.getAttribute('data-dir');
        if (selected) {
          this.applyDirection(selected);
        }
      });
    });

    // Compact pill direction toggle button
    document.querySelectorAll('.btn-dir-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });
  }
};

// Immediate early application to prevent flash
(function() {
  try {
    const saved = localStorage.getItem('wellness_studio_dir');
    if (saved) {
      document.documentElement.setAttribute('dir', saved);
      document.documentElement.setAttribute('lang', saved === 'rtl' ? 'ar' : 'en');
    }
  } catch(e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  LanguageManager.init();
});

window.LanguageManager = LanguageManager;

