/**
 * Reflexology & Foot Massage Studio - Notifications & Toasts
 */

const Notifications = {
  getContainer() {
    let container = document.getElementById('wellness-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'wellness-toast-container';
      container.className = 'toast-container-custom';
      document.body.appendChild(container);
    }
    return container;
  },

  show(title, message, type = 'info', duration = 4500) {
    const container = this.getContainer();
    const toast = document.createElement('div');
    toast.className = `wellness-toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="wellness-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="wellness-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
      iconSvg = `<svg class="wellness-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="wellness-toast-content">
        <div class="wellness-toast-title">${title}</div>
        <div class="wellness-toast-msg">${message}</div>
      </div>
      <button type="button" class="wellness-toast-close" aria-label="Close notification">&times;</button>
    `;

    const closeBtn = toast.querySelector('.wellness-toast-close');
    closeBtn.addEventListener('click', () => {
      this.remove(toast);
    });

    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(toast);
      }, duration);
    }
  },

  remove(toast) {
    if (!toast || !toast.parentElement) return;
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 300);
  }
};

window.Notifications = Notifications;
