/**
 * Reflexology & Foot Massage Studio - Client Authentication
 * Note: Demonstration authentication strictly decoupled from any dashboard!
 */

const AuthManager = {
  STORAGE_KEY: 'wellness_client_session',

  getCurrentUser() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(user) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.updateHeaderAuthUI();
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateHeaderAuthUI();
    if (window.Notifications) {
      Notifications.show('Signed Out', 'You have been safely signed out.', 'info');
    }
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);
  },

  updateHeaderAuthUI() {
    const user = this.getCurrentUser();
    const authLinks = document.querySelectorAll('.auth-link-slot');

    authLinks.forEach(slot => {
      if (user) {
        slot.innerHTML = `
          <div class="inline-flex items-center gap-2" style="height:38px;">
            <span class="badge-wellness" style="background-color: var(--color-primary-soft); display:inline-flex; align-items:center; gap:0.35rem; height:32px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              ${user.name.split(' ')[0]}
            </span>
            <button type="button" class="btn-wellness btn-secondary-custom btn-sm py-1 px-2" id="client-signout-btn" style="font-size:0.75rem; height:32px;">Sign Out</button>
          </div>
        `;
        const signoutBtn = slot.querySelector('#client-signout-btn');
        if (signoutBtn) {
          signoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
          });
        }
      } else {
        slot.innerHTML = `
          <a href="login.html" class="header-auth-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Client Sign In</span>
          </a>
        `;
      }
    });
  },

  initForms() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      if (window.FormValidator) FormValidator.attach(loginForm);
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.FormValidator && !FormValidator.validateForm(loginForm)) return;

        const email = document.getElementById('login-email').value.trim();
        const mockUser = {
          email: email,
          name: email.split('@')[0].replace('.', ' '),
          signedInAt: new Date().toISOString()
        };

        this.setCurrentUser(mockUser);
        if (window.Notifications) {
          Notifications.show('Welcome Back', 'Successfully signed in to your studio guest account.', 'success');
        }

        // Redirect to booking or home - STRICTLY NO DASHBOARD
        setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get('redirect') || 'booking.html';
          window.location.href = redirect;
        }, 1200);
      });
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      if (window.FormValidator) FormValidator.attach(registerForm);
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.FormValidator && !FormValidator.validateForm(registerForm)) return;

        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const mockUser = {
          name: name,
          email: email,
          signedInAt: new Date().toISOString()
        };

        this.setCurrentUser(mockUser);
        if (window.Notifications) {
          Notifications.show('Registration Complete', 'Your studio account is ready for instant booking.', 'success');
        }

        setTimeout(() => {
          window.location.href = 'booking.html';
        }, 1200);
      });
    }

    // Forgot password form
    const forgotForm = document.getElementById('forgot-password-form');
    if (forgotForm) {
      if (window.FormValidator) FormValidator.attach(forgotForm);
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.FormValidator && !FormValidator.validateForm(forgotForm)) return;

        const email = document.getElementById('forgot-email').value.trim();
        if (window.Notifications) {
          Notifications.show(
            'Recovery Link Dispatched',
            `A confidential password reset email was sent to ${email}.`,
            'success',
            6000
          );
        }
        forgotForm.reset();
      });
    }

    // Password Show/Hide Toggle Control
    this.initPasswordToggle();

    // Social Authentication (Google & Apple)
    this.initSocialAuth();
  },

  initPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-password-btn');
    const passwordInput = document.getElementById('login-password');
    if (!toggleBtn || !passwordInput) return;

    const eyeIcon = toggleBtn.querySelector('.icon-eye');
    const eyeOffIcon = toggleBtn.querySelector('.icon-eye-off');

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

      if (eyeIcon) eyeIcon.style.display = isPassword ? 'none' : 'block';
      if (eyeOffIcon) eyeOffIcon.style.display = isPassword ? 'block' : 'none';

      const label = isPassword ? 'Hide password' : 'Show password';
      toggleBtn.setAttribute('aria-label', label);
      toggleBtn.setAttribute('title', label);
    });
  },

  initSocialAuth() {
    const handleSocialAuth = (provider) => {
      const providerName = provider === 'google' ? 'Google' : 'Apple';
      
      // In this client-side studio site, external OAuth providers (Google Identity / Apple ID) 
      // are not configured with a backend authentication endpoint.
      const isProviderConfigured = false;

      if (!isProviderConfigured) {
        const message = `${providerName} sign-in is not configured yet.`;
        
        if (window.Notifications) {
          Notifications.show(`${providerName} Sign-In`, message, 'info');
        }

        const alertBox = document.getElementById('auth-alert-box');
        if (alertBox) {
          alertBox.textContent = message;
          alertBox.className = 'auth-alert-message auth-alert-info';
          alertBox.style.display = 'block';
        }
      }
    };

    const googleBtn = document.getElementById('google-signin-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSocialAuth('google');
      });
    }

    const appleBtn = document.getElementById('apple-signin-btn');
    if (appleBtn) {
      appleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleSocialAuth('apple');
      });
    }

    // Dismiss alert box on user input
    const loginEmail = document.getElementById('login-email');
    const loginPass = document.getElementById('login-password');
    const alertBox = document.getElementById('auth-alert-box');
    if (alertBox) {
      [loginEmail, loginPass].forEach(input => {
        if (input) {
          input.addEventListener('input', () => {
            alertBox.style.display = 'none';
          });
        }
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuthManager.updateHeaderAuthUI();
  AuthManager.initForms();
});

window.AuthManager = AuthManager;
