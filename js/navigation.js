/**
 * Reflexology & Foot Massage Studio - Navigation & Menu Interactions
 */

const Navigation = {
  init() {
    this.handleScroll();
    this.initMobileDrawer();
    this.highlightActivePage();
    this.initAccordions();
    this.initDropdowns();
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
  },

  handleScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  },

  initMobileDrawer() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const backdrop = document.querySelector('.mobile-drawer-backdrop');
    const closeBtn = document.querySelector('.mobile-drawer-close');

    if (!toggleBtn || !backdrop) return;

    const openDrawer = () => {
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeDrawer();
      }
    });

    // Close when clicking nav link inside mobile drawer
    const drawerLinks = backdrop.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  },

  highlightActivePage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link-custom, .mobile-nav-item');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPath = href.split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else if (currentPath === '' && (linkPath === 'index.html' || linkPath === '')) {
        link.classList.add('active');
      }
    });
  },

  initAccordions() {
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.wellness-accordion-header');
      if (!header) return;

      const item = header.closest('.wellness-accordion-item');
      if (!item) return;

      const parent = item.parentElement;
      const isOpen = item.classList.contains('active');

      // Close siblings if in accordion group
      if (parent && parent.classList.contains('accordion-single-open')) {
        parent.querySelectorAll('.wellness-accordion-item').forEach(sibling => {
          sibling.classList.remove('active');
        });
      }

      if (!isOpen) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  },

  initDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      const toggle = dropdown.querySelector('.nav-link-custom');
      if (!toggle) return;

      toggle.addEventListener('click', (e) => {
        if (dropdown.classList.contains('home-nav-dropdown') && (window.innerWidth < 992 || 'ontouchstart' in window)) {
          // If on touch device, toggle open
          if (!dropdown.classList.contains('open')) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.add('open');
          }
        } else if (toggle.tagName === 'BUTTON') {
          e.preventDefault();
          e.stopPropagation();
          const wasOpen = dropdown.classList.contains('open');
          document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
          if (!wasOpen) {
            dropdown.classList.add('open');
          }
        }
      });

      // Close when clicking an option inside
      dropdown.querySelectorAll('.home-menu-card, .home-demo-option-item, .dropdown-item-custom').forEach(opt => {
        opt.addEventListener('click', () => {
          dropdown.classList.remove('open');
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
      }
    });

    // Close dropdown after selecting a mode/direction option
    document.querySelectorAll('.theme-select-btn, .dir-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
        }, 150);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
});

window.Navigation = Navigation;
