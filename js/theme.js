/**
 * Reflexology & Foot Massage Studio - Theme Management (Light & Dark Mode)
 */

const ThemeManager = {
  STORAGE_KEY: 'wellness_studio_theme',

  init() {
    let saved = null;
    try {
      saved = localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {}

    const currentAttr = document.documentElement.getAttribute('data-theme');
    const theme = saved || currentAttr || 'light';
    this.applyTheme(theme, false);
    this.bindEvents();
  },

  applyTheme(theme, save = true) {
    const validTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', validTheme);
    if (save) {
      try {
        localStorage.setItem(this.STORAGE_KEY, validTheme);
      } catch (e) {}
    }
    this.updateUI(validTheme);
  },

  getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  toggle() {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  },

  updateUI(theme) {
    const curTheme = theme || this.getTheme();
    const isDark = curTheme === 'dark';

    // Update any drawer/menu buttons
    document.querySelectorAll('.theme-select-btn').forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme');
      if (btnTheme === curTheme) {
        btn.classList.add('active');
        const check = btn.querySelector('.check-indicator');
        if (check) check.style.opacity = '1';
      } else {
        btn.classList.remove('active');
        const check = btn.querySelector('.check-indicator');
        if (check) check.style.opacity = '0';
      }
    });

    // Update pill-shaped theme toggle buttons
    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
      btn.classList.toggle('active', isDark);
      const titleText = isDark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
      btn.setAttribute('title', titleText);
      btn.setAttribute('aria-label', titleText);

      const sun = btn.querySelector('.icon-sun-svg');
      const moon = btn.querySelector('.icon-moon-svg');
      if (sun) sun.style.display = isDark ? 'none' : 'block';
      if (moon) moon.style.display = isDark ? 'block' : 'none';
    });

    // Update any legacy mode icon symbols if present
    document.querySelectorAll('.mode-icon-symbol').forEach(icon => {
      icon.textContent = isDark ? '🌙' : '☀️';
    });
  },

  bindEvents() {
    // Legacy / drawer select buttons
    document.querySelectorAll('.theme-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selected = btn.getAttribute('data-theme');
        if (selected) {
          this.applyTheme(selected);
        }
      });
    });

    // Compact pill theme toggle button
    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });
  }
};

// Immediate early application to prevent flash of wrong theme
(function() {
  try {
    const saved = localStorage.getItem('wellness_studio_theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch(e) {}
})();

document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
});

window.ThemeManager = ThemeManager;

