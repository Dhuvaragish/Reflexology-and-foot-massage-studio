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

  // --- PROFILE DROPDOWN & CLIENT SANCTUARY CONTROLS ---
  updateProfileDropdown() {
    const user = this.getCurrentUser();
    const dropdowns = document.querySelectorAll('.profile-nav-dropdown');

    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.btn-profile-toggle');
      const userNameEl = dropdown.querySelector('#profile-user-name');
      const userMetaEl = dropdown.querySelector('#profile-user-meta');
      const avatarEl = dropdown.querySelector('#profile-avatar-initials');
      const authSlot = dropdown.querySelector('#profile-menu-auth-slot');

      if (user) {
        if (toggle) toggle.classList.add('has-session');
        const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

        if (userNameEl) userNameEl.textContent = user.name || 'Valued Guest';
        if (userMetaEl) userMetaEl.textContent = user.email || 'Sanctuary Member';
        if (avatarEl) {
          avatarEl.textContent = initials;
          avatarEl.setAttribute('aria-label', user.name || 'Account');
        }

        if (authSlot) {
          authSlot.innerHTML = `
            <button type="button" class="profile-menu-item profile-auth-signout" id="profile-action-signout" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span>Sign Out</span>
            </button>
          `;
          const signoutBtn = authSlot.querySelector('#profile-action-signout');
          if (signoutBtn) {
            signoutBtn.addEventListener('click', (e) => {
              e.preventDefault();
              dropdown.classList.remove('open');
              AuthManager.logout();
            });
          }
        }
      } else {
        if (toggle) toggle.classList.remove('has-session');
        if (userNameEl) userNameEl.textContent = 'Guest Client';
        if (userMetaEl) userMetaEl.textContent = 'Welcome to Sole Harmony';
        if (avatarEl) {
          avatarEl.textContent = 'G';
          avatarEl.setAttribute('aria-label', 'Guest Client');
        }

        if (authSlot) {
          authSlot.innerHTML = `
            <a href="login.html" class="profile-menu-item profile-auth-signin" id="profile-action-signin" role="menuitem">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              <span>Client Sign In</span>
            </a>
          `;
        }
      }
    });

    // Update Mobile Drawer Account Box if present
    const mobileBoxes = document.querySelectorAll('.mobile-profile-box');
    mobileBoxes.forEach(box => {
      const nameEl = box.querySelector('.mobile-profile-name');
      const metaEl = box.querySelector('.mobile-profile-meta');
      const avatarEl = box.querySelector('.mobile-profile-avatar');
      const authSlot = box.querySelector('.mobile-profile-auth-slot');

      if (user) {
        const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
        if (nameEl) nameEl.textContent = user.name || 'Valued Guest';
        if (metaEl) metaEl.textContent = user.email || 'Sanctuary Member';
        if (avatarEl) avatarEl.textContent = initials;
        if (authSlot) {
          authSlot.innerHTML = `
            <button type="button" class="mobile-profile-action-btn mobile-signout-btn" style="color:var(--color-danger); border-color:rgba(211,47,47,0.25);">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span>Sign Out</span>
            </button>
          `;
          const btn = authSlot.querySelector('.mobile-signout-btn');
          if (btn) {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              AuthManager.logout();
            });
          }
        }
      } else {
        if (nameEl) nameEl.textContent = 'Guest Client';
        if (metaEl) metaEl.textContent = 'Welcome to Sole Harmony';
        if (avatarEl) avatarEl.textContent = 'G';
        if (authSlot) {
          authSlot.innerHTML = `
            <a href="login.html" class="mobile-profile-action-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
              <span>Sign In</span>
            </a>
          `;
        }
      }
    });
  },

  // --- MODAL CONTROLS (Guest Profile & Studio Settings) ---
  initProfileModals() {
    // 1. My Profile Trigger
    document.querySelectorAll('#menu-btn-profile, .open-profile-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
        this.openProfileModal();
      });
    });

    // 2. My Bookings Trigger
    document.querySelectorAll('#menu-btn-bookings, .open-bookings-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
        this.navigateToBookings();
      });
    });

    // 3. Settings Trigger
    document.querySelectorAll('#menu-btn-settings, .open-settings-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-dropdown.open').forEach(d => d.classList.remove('open'));
        this.openSettingsModal();
      });
    });

    // 4. Modal Close Handlers
    document.querySelectorAll('.profile-modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('[data-close-modal]')) {
          modal.classList.remove('open');
        }
      });
    });

    // 5. Escape Key to Close Modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.profile-modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });

    // 6. Modal Settings Interactive Controls
    const settingsModal = document.getElementById('guest-settings-modal');
    if (settingsModal) {
      settingsModal.querySelectorAll('.theme-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const theme = btn.getAttribute('data-theme');
          if (window.ThemeManager) {
            if (typeof ThemeManager.applyTheme === 'function') ThemeManager.applyTheme(theme);
            else if (typeof ThemeManager.setTheme === 'function') ThemeManager.setTheme(theme);
          } else {
            document.documentElement.setAttribute('data-theme', theme);
            try { localStorage.setItem('wellness_studio_theme', theme); } catch(e) {}
          }
          this.syncSettingsModalStates();
        });
      });

      settingsModal.querySelectorAll('.dir-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const dir = btn.getAttribute('data-dir');
          if (window.LanguageManager) {
            if (typeof LanguageManager.applyDirection === 'function') LanguageManager.applyDirection(dir);
            else if (typeof LanguageManager.setDirection === 'function') LanguageManager.setDirection(dir);
          } else {
            document.documentElement.setAttribute('dir', dir);
            try { localStorage.setItem('wellness_studio_dir', dir); } catch(e) {}
          }
          this.syncSettingsModalStates();
        });
      });
    }
  },

  navigateToBookings() {
    try {
      const latestRaw = localStorage.getItem('wellness_latest_booking');
      if (latestRaw) {
        const booking = JSON.parse(latestRaw);
        if (booking && booking.reference) {
          window.location.href = `booking-confirmation.html?ref=${encodeURIComponent(booking.reference)}`;
          return;
        }
      }
    } catch(e) {}
    window.location.href = 'booking.html';
  },

  openProfileModal() {
    const modal = document.getElementById('guest-profile-modal');
    if (!modal) return;
    const user = this.getCurrentUser();

    const nameEl = modal.querySelector('#modal-profile-name');
    const emailEl = modal.querySelector('#modal-profile-email');
    const badgeEl = modal.querySelector('#modal-profile-badge');
    const avatarEl = modal.querySelector('#modal-profile-avatar');
    const dateEl = modal.querySelector('#modal-profile-date');
    const authBtnSlot = modal.querySelector('#modal-profile-auth-action');

    if (user) {
      const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
      if (nameEl) nameEl.textContent = user.name || 'Valued Guest';
      if (emailEl) emailEl.textContent = user.email || 'Registered Guest Account';
      if (badgeEl) {
        badgeEl.textContent = 'Sanctuary Member';
        badgeEl.style.backgroundColor = 'var(--color-primary-softest)';
        badgeEl.style.color = 'var(--color-primary)';
      }
      if (avatarEl) avatarEl.textContent = initials;
      if (dateEl) {
        const regDate = user.signedInAt || user.registeredAt;
        dateEl.textContent = regDate ? new Date(regDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Active Session';
      }
      if (authBtnSlot) {
        authBtnSlot.innerHTML = `
          <button type="button" class="btn-wellness btn-secondary-custom btn-sm" id="modal-signout-btn" style="color:var(--color-danger); border-color:rgba(211,47,47,0.3);">
            Sign Out
          </button>
        `;
        const signoutBtn = authBtnSlot.querySelector('#modal-signout-btn');
        if (signoutBtn) {
          signoutBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            AuthManager.logout();
          });
        }
      }
    } else {
      if (nameEl) nameEl.textContent = 'Guest Client';
      if (emailEl) emailEl.textContent = 'No account signed in';
      if (badgeEl) {
        badgeEl.textContent = 'Guest Access';
        badgeEl.style.backgroundColor = 'var(--bg-surface-soft)';
        badgeEl.style.color = 'var(--text-muted)';
      }
      if (avatarEl) avatarEl.textContent = 'G';
      if (dateEl) dateEl.textContent = 'Standard Guest';
      if (authBtnSlot) {
        authBtnSlot.innerHTML = `
          <a href="login.html" class="btn-wellness btn-primary-custom btn-sm">
            Sign In / Register
          </a>
        `;
      }
    }

    modal.classList.add('open');
  },

  openSettingsModal() {
    const modal = document.getElementById('guest-settings-modal');
    if (!modal) return;
    this.syncSettingsModalStates();
    modal.classList.add('open');
  },

  syncSettingsModalStates() {
    const modal = document.getElementById('guest-settings-modal');
    if (!modal) return;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';

    modal.querySelectorAll('.theme-select-btn').forEach(btn => {
      const match = btn.getAttribute('data-theme') === currentTheme;
      btn.classList.toggle('active', match);
    });

    modal.querySelectorAll('.dir-select-btn').forEach(btn => {
      const match = btn.getAttribute('data-dir') === currentDir;
      btn.classList.toggle('active', match);
    });
  },

  // --- HEADER AUTH UI (Public Navigation) ---
  updateHeaderAuthUI() {
    this.updateProfileDropdown();
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
      AuthManager.initProfileModals();
      AuthManager.initForms();
    });
  } else {
    AuthManager.updateHeaderAuthUI();
    AuthManager.initProfileModals();
    AuthManager.initForms();
  }
}

// Global export
if (typeof window !== 'undefined') {
  window.AuthManager = AuthManager;
}
