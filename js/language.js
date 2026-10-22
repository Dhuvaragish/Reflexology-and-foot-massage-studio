/**
 * SOLE HARMONY - Layout Direction Manager (100% English in both LTR & RTL)
 * Controls visual layout direction (LTR / RTL) while maintaining English as the single source of truth.
 */

const LanguageManager = {
  STORAGE_DIR_KEY: 'wellness_studio_dir',
  STORAGE_LANG_KEY: 'wellness_studio_lang',

  currentLang: 'en',
  currentDir: 'ltr',

  init() {
    let savedDir = null;
    try {
      savedDir = localStorage.getItem(this.STORAGE_DIR_KEY);
      // Clean up legacy language key to enforce 100% English
      localStorage.setItem(this.STORAGE_LANG_KEY, 'en');
    } catch (e) {}

    const docDir = document.documentElement.getAttribute('dir') || 'ltr';
    this.currentDir = (savedDir === 'rtl' || docDir === 'rtl') ? 'rtl' : 'ltr';
    this.currentLang = 'en';

    this.applyDirection(this.currentDir, false);
    this.bindEvents();
  },

  /**
   * Applies the layout direction without changing content language.
   * Language is strictly 'en' in both modes.
   */
  applyDirection(dir, save = true) {
    const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
    this.currentDir = validDir;
    this.currentLang = 'en';

    // Strictly enforce English as document language
    document.documentElement.setAttribute('lang', 'en');
    document.documentElement.setAttribute('dir', validDir);

    if (save) {
      try {
        localStorage.setItem(this.STORAGE_DIR_KEY, validDir);
        localStorage.setItem(this.STORAGE_LANG_KEY, 'en');
      } catch (e) {}
    }

    // Ensure all data-i18n elements are rendered in English
    this.translateDOM('en');
    this.updateUI(validDir);

    // Dispatch events for other components
    window.dispatchEvent(new CustomEvent('directionChanged', { 
      detail: { dir: validDir, lang: 'en' } 
    }));
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { lang: 'en', dir: validDir } 
    }));
  },

  // Backwards compatibility for any callers expecting applyLanguage
  applyLanguage(lang, save = true) {
    const targetDir = lang === 'ar' || lang === 'rtl' ? 'rtl' : 'ltr';
    this.applyDirection(targetDir, save);
  },

  getLanguage() {
    return 'en';
  },

  getDirection() {
    return this.currentDir || 'ltr';
  },

  toggle() {
    const nextDir = this.currentDir === 'rtl' ? 'ltr' : 'rtl';
    this.applyDirection(nextDir, true);

    if (window.Notifications) {
      const msg = nextDir === 'rtl' 
        ? 'Layout direction switched to Right-to-Left (RTL)' 
        : 'Layout direction switched to Left-to-Right (LTR)';
      Notifications.show('Layout Direction', msg, 'info');
    }
  },

  /**
   * Translates DOM elements exclusively using English dictionary.
   * Arabic translation is completely excluded.
   */
  translateDOM(lang = 'en') {
    if (!window.StudioTranslations || !window.StudioTranslations.en) return;
    const dict = window.StudioTranslations.en;

    // 1. Text Content Translation (English only)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        const icon = el.querySelector('svg, i, .icon');
        if (icon) {
          const isIconFirst = el.firstElementChild === icon;
          const clonedIcon = icon.cloneNode(true);
          el.innerHTML = '';
          if (isIconFirst) {
            el.appendChild(clonedIcon);
            el.appendChild(document.createTextNode(' ' + dict[key]));
          } else {
            el.appendChild(document.createTextNode(dict[key] + ' '));
            el.appendChild(clonedIcon);
          }
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 2. Placeholders Translation (English only)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // 3. Titles Translation (English only)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.setAttribute('title', dict[key]);
      }
    });
  },

  updateUI(dir) {
    const isRtl = dir === 'rtl';

    // Update Layout Direction Toggle Buttons
    document.querySelectorAll('.btn-dir-toggle, .btn-lang-toggle').forEach(btn => {
      btn.classList.toggle('active', isRtl);
      const titleText = isRtl 
        ? 'Switch to Left-to-Right layout (LTR)' 
        : 'Switch to Right-to-Left layout (RTL)';
      btn.setAttribute('title', titleText);
      btn.setAttribute('aria-label', titleText);

      const labelSpan = btn.querySelector('.lang-label-text');
      if (labelSpan) {
        labelSpan.textContent = 'EN';
      }
    });

    // Update Drawer or Settings buttons
    document.querySelectorAll('.dir-select-btn').forEach(btn => {
      const btnDir = btn.getAttribute('data-dir');
      const isActive = btnDir === dir;
      btn.classList.toggle('active', isActive);
      const check = btn.querySelector('.check-indicator');
      if (check) check.style.opacity = isActive ? '1' : '0';
    });
  },

  bindEvents() {
    // Buttons with class .btn-dir-toggle or .btn-lang-toggle
    document.querySelectorAll('.btn-dir-toggle, .btn-lang-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    });

    // Drawer / legacy selection buttons
    document.querySelectorAll('.dir-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedDir = btn.getAttribute('data-dir');
        this.applyDirection(selectedDir, true);
      });
    });
  }
};

// Immediate early application to prevent flash of wrong layout direction while keeping lang="en"
(function() {
  try {
    const savedDir = localStorage.getItem('wellness_studio_dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    document.documentElement.setAttribute('lang', 'en');
  } catch(e) {}
})();

// Auto-run on DOMContentLoaded
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => LanguageManager.init());
  } else {
    LanguageManager.init();
  }
}

// Global export
if (typeof window !== 'undefined') {
  window.LanguageManager = LanguageManager;
}
