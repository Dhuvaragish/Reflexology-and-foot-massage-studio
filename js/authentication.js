/**
 * SOLE HARMONY - Client Authentication & Profile Manager
 * Handles guest session state, login, and registration.
 * NOTE: Strictly NO dashboard interface is required for this website.
 */

const AuthManager = {
  CLIENT_STORAGE_KEY: 'wellness_client_session',

  // --- CLIENT AUTHENTICATION ---
  getCurrentUser() {
    try {
      const data = localStorage.getItem(this.CLIENT_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(user) {
    try {
      localStorage.setItem(this.CLIENT_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {}
    this.updateHeaderAuthUI();
  },

  logout() {
    try {
      localStorage.removeItem(this.CLIENT_STORAGE_KEY);
    } catch (e) {}
    this.updateHeaderAuthUI();
    if (window.Notifications) {
      Notifications.show('Signed Out', 'You have been safely signed out of your account.', 'info');
    }
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 700);
  },

  // --- HEADER AUTH UI (Public Navigation) ---
  updateHeaderAuthUI() {
    const user = this.getCurrentUser();
    const authLinks = document.querySelectorAll('.auth-link-slot');

    authLinks.forEach(slot => {
      if (user) {
        const firstName = user.name ? user.name.split(' ')[0] : 'Account';
        slot.innerHTML = `
          <div class="nav-dropdown" style="display:inline-block;">
            <button type="button" class="btn-wellness btn-secondary-custom btn-sm inline-flex items-center gap-1.5 py-1 px-3" style="height:36px; font-size:0.8125rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>${firstName}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="nav-dropdown-menu dropdown-align-right" style="min-width: 190px;">
              <div class="px-3 py-2 border-b text-xs text-secondary" style="border-color: var(--border-color);">
                <div class="font-semibold text-main truncate">${user.name || 'Valued Guest'}</div>
                <div class="text-muted-custom truncate">${user.email}</div>
              </div>
              <a href="booking.html" class="dropdown-item-custom flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>Book Appointment</span>
              </a>
              <a href="services.html" class="dropdown-item-custom flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                <span>Services & Pricing</span>
              </a>
              <div class="border-t my-1" style="border-color: var(--border-color);"></div>
              <button type="button" class="dropdown-item-custom flex items-center gap-2 w-full text-left" id="header-logout-action-btn" style="color: var(--color-danger); border:none; background:none; cursor:pointer;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        `;

        const logoutBtn = slot.querySelector('#header-logout-action-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
          });
        }
      } else {
        slot.innerHTML = `
          <a href="login.html" class="header-auth-link" data-i18n="nav_signin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Client Sign In</span>
          </a>
        `;
      }
    });
  },

  // --- FORM HANDLERS (Login & Register) ---
  initForms() {
    // 1. Client Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      if (window.FormValidator) FormValidator.attach(loginForm);
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.FormValidator && !FormValidator.validateForm(loginForm)) return;

        const email = document.getElementById('login-email').value.trim();
        const mockUser = {
          email: email,
          name: email === 'guest@wellness.com' ? 'Eleanor Vance' : email.split('@')[0].replace('.', ' '),
          signedInAt: new Date().toISOString()
        };

        this.setCurrentUser(mockUser);
        if (window.Notifications) {
          Notifications.show('Welcome Back', 'Successfully signed in to your guest account.', 'success');
        }

        setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get('redirect') || 'index.html';
          window.location.href = redirect;
        }, 800);
      });
    }

    // 2. Client Register Form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      if (window.FormValidator) FormValidator.attach(registerForm);
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.FormValidator && !FormValidator.validateForm(registerForm)) return;

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const phone = document.getElementById('reg-phone') ? document.getElementById('reg-phone').value.trim() : '';

        const newUser = {
          name: name,
          email: email,
          phone: phone,
          registeredAt: new Date().toISOString()
        };

        this.setCurrentUser(newUser);
        if (window.Notifications) {
          Notifications.show('Account Created', 'Welcome to Sole Harmony. You can now proceed to book appointments.', 'success');
        }

        setTimeout(() => {
          window.location.href = 'booking.html';
        }, 900);
      });
    }
  }
};

// Initialize on DOM load
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      AuthManager.updateHeaderAuthUI();
      AuthManager.initForms();
    });
  } else {
    AuthManager.updateHeaderAuthUI();
    AuthManager.initForms();
  }
}

// Global export
if (typeof window !== 'undefined') {
  window.AuthManager = AuthManager;
}
