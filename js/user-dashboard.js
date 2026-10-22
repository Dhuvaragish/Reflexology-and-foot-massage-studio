/**
 * SOLE HARMONY - Customer Portal (User Dashboard) Logic
 * Manages upcoming appointments, past treatment history, rescheduling,
 * cancellation, personal profile preferences, and sidebar tab navigation.
 */

const UserDashboard = {
  activeTab: 'overview',
  bookings: [],
  currentUser: null,

  init() {
    this.initUser();
    this.loadBookings();
    this.render();
    this.bindEvents();
    this.setupDatePickers();
  },

  initUser() {
    this.currentUser = window.AuthManager ? AuthManager.getCurrentUser() : null;
    if (!this.currentUser) {
      // Provide default demo client session
      this.currentUser = {
        name: "Eleanor Vance",
        email: "guest@wellness.com",
        phone: "(555) 392-8172",
        pressure: "Medium",
        notes: "Prefers lemongrass aromatherapy. Chronic tightness in medial arches from running."
      };
      if (window.AuthManager) {
        AuthManager.setCurrentUser(this.currentUser);
      }
    }

    // Populate user details across dashboard
    const nameEls = document.querySelectorAll('#user-display-name, #welcome-username');
    nameEls.forEach(el => el.textContent = this.currentUser.name);

    const emailEl = document.getElementById('user-display-email');
    if (emailEl) emailEl.textContent = this.currentUser.email;

    const initialsEl = document.getElementById('user-avatar-initials');
    if (initialsEl && this.currentUser.name) {
      const parts = this.currentUser.name.split(' ');
      initialsEl.textContent = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0][0].toUpperCase();
    }

    // Fill profile fields
    const profName = document.getElementById('prof-name');
    if (profName) profName.value = this.currentUser.name || '';
    const profEmail = document.getElementById('prof-email');
    if (profEmail) profEmail.value = this.currentUser.email || '';
    const profPhone = document.getElementById('prof-phone');
    if (profPhone) profPhone.value = this.currentUser.phone || '(555) 392-8172';
    const profPressure = document.getElementById('prof-pressure');
    if (profPressure && this.currentUser.pressure) profPressure.value = this.currentUser.pressure;
    const profNotes = document.getElementById('prof-notes');
    if (profNotes && this.currentUser.notes) profNotes.value = this.currentUser.notes;
  },

  loadBookings() {
    let stored = [];
    try {
      const raw = localStorage.getItem('wellness_studio_bookings');
      if (raw) stored = JSON.parse(raw);
    } catch (e) {
      console.warn('Error reading wellness_studio_bookings', e);
    }

    // If no bookings exist yet in this browser, provide realistic sample appointments
    if (!stored || stored.length === 0) {
      stored = [
        {
          id: "REF-84912",
          serviceId: "traditional-foot-reflexology",
          serviceName: "Traditional Foot Reflexology",
          therapistId: "therapist-mei-ling",
          therapistName: "Master Mei-Ling Chen",
          durationMinutes: 60,
          date: "2026-10-25",
          dateFormatted: "Saturday, Oct 25, 2026",
          time: "10:30 AM",
          guestName: "Eleanor Vance",
          guestEmail: "guest@wellness.com",
          guestPhone: "(555) 392-8172",
          pressurePreference: "Medium",
          notes: "Focus on sole arches and tension release.",
          totalPrice: 81.00,
          status: "Confirmed",
          createdAt: "2026-10-20T10:00:00Z"
        },
        {
          id: "REF-71204",
          serviceId: "relaxing-foot-massage",
          serviceName: "Relaxing Foot Massage",
          therapistId: "therapist-kenji",
          therapistName: "Kenji Sato",
          durationMinutes: 60,
          date: "2026-09-14",
          dateFormatted: "Monday, Sep 14, 2026",
          time: "3:00 PM",
          guestName: "Eleanor Vance",
          guestEmail: "guest@wellness.com",
          guestPhone: "(555) 392-8172",
          pressurePreference: "Medium",
          notes: "Lavender oils requested.",
          totalPrice: 73.44,
          status: "Completed",
          createdAt: "2026-09-10T14:30:00Z"
        },
        {
          id: "REF-65391",
          serviceId: "head-neck-shoulder-massage",
          serviceName: "Head, Neck & Shoulder Massage",
          therapistId: "therapist-ananya",
          therapistName: "Ananya Sharma",
          durationMinutes: 45,
          date: "2026-08-02",
          dateFormatted: "Sunday, Aug 2, 2026",
          time: "11:00 AM",
          guestName: "Eleanor Vance",
          guestEmail: "guest@wellness.com",
          guestPhone: "(555) 392-8172",
          pressurePreference: "Firm",
          notes: "Upper back tightness.",
          totalPrice: 62.64,
          status: "Completed",
          createdAt: "2026-07-28T16:15:00Z"
        }
      ];
      try {
        localStorage.setItem('wellness_studio_bookings', JSON.stringify(stored));
      } catch (e) {}
    }

    this.bookings = stored;
  },

  render() {
    this.updateCounters();
    this.renderSpotlight();
    this.renderUpcomingList();
    this.renderHistoryList();
  },

  getUpcomingBookings() {
    return this.bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  },

  getPastBookings() {
    return this.bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');
  },

  updateCounters() {
    const upcoming = this.getUpcomingBookings();
    const completed = this.bookings.filter(b => b.status === 'Completed');

    const upCountEl = document.getElementById('stat-upcoming-count');
    if (upCountEl) upCountEl.textContent = upcoming.length;

    const navUpCount = document.getElementById('nav-upcoming-count');
    if (navUpCount) navUpCount.textContent = upcoming.length;

    const compCountEl = document.getElementById('stat-completed-count');
    if (compCountEl) compCountEl.textContent = completed.length;

    const ptsCountEl = document.getElementById('stat-points-count');
    if (ptsCountEl) ptsCountEl.textContent = completed.length * 100 + 50;
  },

  renderSpotlight() {
    const container = document.getElementById('spotlight-upcoming-container');
    if (!container) return;

    const upcoming = this.getUpcomingBookings();
    if (upcoming.length === 0) {
      container.innerHTML = `
        <div class="card-wellness p-6 rounded-2xl text-center">
          <p class="text-secondary text-sm mb-3">You have no upcoming reflexology appointments scheduled.</p>
          <a href="../booking.html" class="btn-wellness btn-primary-custom btn-sm inline-flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Book Your Next Session</span>
          </a>
        </div>
      `;
      return;
    }

    const appt = upcoming[0];
    container.innerHTML = `
      <div class="appointment-card p-5">
        <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <span class="status-badge status-${appt.status.toLowerCase()} mb-2">${appt.status}</span>
            <h4 class="font-heading text-lg font-bold text-main mb-1">${appt.serviceName}</h4>
            <span class="text-xs text-muted-custom">Booking Ref: <strong class="text-primary-custom">${appt.id}</strong></span>
          </div>
          <div class="text-right">
            <span class="font-heading text-xl font-bold text-main block">$${appt.totalPrice ? appt.totalPrice.toFixed(2) : '75.00'}</span>
            <span class="text-xs text-muted-custom block">${appt.durationMinutes} Minutes</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl mb-4" style="background:var(--bg-surface-soft); border:1px solid var(--border-color);">
          <div>
            <span class="text-xs text-muted-custom block mb-0.5">Assigned Specialist</span>
            <strong class="text-main text-xs">${appt.therapistName || 'Master Practitioner'}</strong>
          </div>
          <div>
            <span class="text-xs text-muted-custom block mb-0.5">Date & Time</span>
            <strong class="text-main text-xs">${appt.dateFormatted || appt.date} • ${appt.time}</strong>
          </div>
          <div>
            <span class="text-xs text-muted-custom block mb-0.5">Pressure Preference</span>
            <strong class="text-main text-xs">${appt.pressurePreference || 'Medium'}</strong>
          </div>
        </div>

        <div class="flex items-center justify-between flex-wrap gap-2 pt-2 border-t" style="border-color:var(--border-color);">
          <span class="text-xs text-muted-custom">Payment upon arrival at studio reception</span>
          <div class="flex items-center gap-2">
            <button type="button" class="btn-wellness btn-secondary-custom btn-sm" onclick="openDetailsModal('${appt.id}')">View Details</button>
            <button type="button" class="btn-wellness btn-outline-custom btn-sm" onclick="openRescheduleModal('${appt.id}')">Reschedule</button>
            <button type="button" class="btn-wellness btn-sm" style="background:var(--color-danger-bg); color:var(--color-danger); border:1px solid var(--color-danger);" onclick="openCancelModal('${appt.id}')">Cancel</button>
          </div>
        </div>
      </div>
    `;
  },

  renderUpcomingList() {
    const list = document.getElementById('upcoming-appointments-list');
    if (!list) return;

    const upcoming = this.getUpcomingBookings();
    if (upcoming.length === 0) {
      list.innerHTML = `
        <div class="card-wellness p-8 rounded-2xl text-center">
          <div class="mb-3 text-2xl">🌿</div>
          <h4 class="font-heading text-lg font-bold text-main mb-2">No Upcoming Appointments</h4>
          <p class="text-secondary text-sm max-w-md mx-auto mb-4">You currently have no scheduled reflexology sessions. Treat yourself to restorative wellness today.</p>
          <a href="../booking.html" class="btn-wellness btn-primary-custom btn-sm">Reserve a Session</a>
        </div>
      `;
      return;
    }

    list.innerHTML = upcoming.map(appt => `
      <div class="appointment-card">
        <div class="flex items-start justify-between flex-wrap gap-3 mb-3">
          <div>
            <span class="status-badge status-${appt.status.toLowerCase()} mb-2">${appt.status}</span>
            <h4 class="font-heading text-base font-bold text-main mb-1">${appt.serviceName}</h4>
            <span class="text-xs text-muted-custom">Ref: <strong class="text-primary-custom">${appt.id}</strong></span>
          </div>
          <div class="text-right">
            <span class="font-heading text-lg font-bold text-main block">$${appt.totalPrice ? appt.totalPrice.toFixed(2) : '75.00'}</span>
            <span class="text-xs text-muted-custom block">${appt.durationMinutes}m</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs p-3 rounded-lg mb-3" style="background:var(--bg-surface-soft);">
          <div><span class="text-muted-custom block">Practitioner:</span> <span class="font-semibold text-main">${appt.therapistName || 'Master Practitioner'}</span></div>
          <div><span class="text-muted-custom block">Date:</span> <span class="font-semibold text-main">${appt.dateFormatted || appt.date}</span></div>
          <div><span class="text-muted-custom block">Time:</span> <span class="font-semibold text-main">${appt.time}</span></div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2 border-t" style="border-color:var(--border-color);">
          <button type="button" class="btn-wellness btn-secondary-custom btn-sm" onclick="openDetailsModal('${appt.id}')">Details</button>
          <button type="button" class="btn-wellness btn-outline-custom btn-sm" onclick="openRescheduleModal('${appt.id}')">Reschedule</button>
          <button type="button" class="btn-wellness btn-sm" style="background:var(--color-danger-bg); color:var(--color-danger); border:1px solid var(--color-danger);" onclick="openCancelModal('${appt.id}')">Cancel</button>
        </div>
      </div>
    `).join('');
  },

  renderHistoryList() {
    const list = document.getElementById('history-appointments-list');
    if (!list) return;

    const history = this.getPastBookings();
    if (history.length === 0) {
      list.innerHTML = `
        <div class="card-wellness p-6 rounded-2xl text-center">
          <p class="text-secondary text-sm mb-0">No past treatment history found.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = history.map(appt => `
      <div class="appointment-card opacity-95">
        <div class="flex items-start justify-between flex-wrap gap-2 mb-2">
          <div>
            <span class="status-badge status-${appt.status.toLowerCase()} mb-1">${appt.status}</span>
            <h4 class="font-heading text-base font-bold text-main mb-0.5">${appt.serviceName}</h4>
            <span class="text-xs text-muted-custom">${appt.dateFormatted || appt.date} • ${appt.time}</span>
          </div>
          <div class="text-right">
            <span class="font-heading text-base font-semibold text-main block">$${appt.totalPrice ? appt.totalPrice.toFixed(2) : '75.00'}</span>
            <span class="text-xs text-muted-custom">${appt.durationMinutes}m</span>
          </div>
        </div>
        <div class="flex items-center justify-between pt-2 border-t text-xs" style="border-color:var(--border-color);">
          <span class="text-muted-custom">Specialist: ${appt.therapistName || 'Master Practitioner'}</span>
          <a href="../booking.html?service=${appt.serviceId || 'traditional-foot-reflexology'}" class="text-primary font-semibold hover:underline">
            Book This Session Again →
          </a>
        </div>
      </div>
    `).join('');
  },

  rescheduleAppointment(id, newDate, newTime) {
    const idx = this.bookings.findIndex(b => b.id === id);
    if (idx !== -1) {
      this.bookings[idx].date = newDate;
      this.bookings[idx].dateFormatted = new Date(newDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      this.bookings[idx].time = newTime;
      this.bookings[idx].status = 'Confirmed';

      try {
        localStorage.setItem('wellness_studio_bookings', JSON.stringify(this.bookings));
      } catch (e) {}

      this.render();
      if (window.Notifications) {
        Notifications.show('Appointment Rescheduled', `Your session has been updated to ${this.bookings[idx].dateFormatted} at ${newTime}.`, 'success');
      }
    }
  },

  cancelAppointment(id) {
    const idx = this.bookings.findIndex(b => b.id === id);
    if (idx !== -1) {
      this.bookings[idx].status = 'Cancelled';
      try {
        localStorage.setItem('wellness_studio_bookings', JSON.stringify(this.bookings));
      } catch (e) {}

      this.render();
      if (window.Notifications) {
        Notifications.show('Appointment Cancelled', 'Your session has been cancelled according to sanctuary policy.', 'info');
      }
    }
  },

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.dashboard-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchDashboardTab(tab);
      });
    });

    // Mobile sidebar toggle
    const openBtn = document.getElementById('open-sidebar-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('dashboard-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    if (openBtn && sidebar && backdrop) {
      openBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('open');
      });
    }

    const closeSidebar = () => {
      if (sidebar) sidebar.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);

    // Profile form submit
    const profForm = document.getElementById('profile-form');
    if (profForm) {
      profForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          ...this.currentUser,
          name: document.getElementById('prof-name').value.trim(),
          phone: document.getElementById('prof-phone').value.trim(),
          pressure: document.getElementById('prof-pressure').value,
          notes: document.getElementById('prof-notes').value.trim()
        };
        this.currentUser = updated;
        if (window.AuthManager) AuthManager.setCurrentUser(updated);

        const nameEls = document.querySelectorAll('#user-display-name, #welcome-username');
        nameEls.forEach(el => el.textContent = updated.name);

        if (window.Notifications) {
          Notifications.show('Profile Saved', 'Your therapist preferences and contact details have been updated.', 'success');
        }
      });
    }

    // Preferences form submit
    const prefForm = document.getElementById('preferences-form');
    if (prefForm) {
      prefForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.Notifications) {
          Notifications.show('Preferences Saved', 'Your notification and arrival reminder settings have been saved.', 'success');
        }
      });
    }

    // Sidebar sign out
    const logoutBtn = document.getElementById('sidebar-logout-btn');
    if (logoutBtn && window.AuthManager) {
      logoutBtn.addEventListener('click', () => AuthManager.logout());
    }

    // Modal reschedule form submit
    const reschedForm = document.getElementById('reschedule-form');
    if (reschedForm) {
      reschedForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('reschedule-booking-id').value;
        const newDate = document.getElementById('reschedule-date').value;
        const newTime = document.getElementById('reschedule-time').value;
        if (id && newDate && newTime) {
          this.rescheduleAppointment(id, newDate, newTime);
          closeRescheduleModal();
        }
      });
    }

    // Modal cancel confirmation button
    const confirmCancelBtn = document.getElementById('confirm-cancel-action-btn');
    if (confirmCancelBtn) {
      confirmCancelBtn.addEventListener('click', () => {
        const id = document.getElementById('cancel-booking-id').value;
        if (id) {
          this.cancelAppointment(id);
          closeCancelModal();
        }
      });
    }

    // Handle hash links (e.g. #appointments, #profile)
    const hash = window.location.hash.replace('#', '');
    if (hash === 'appointments') switchDashboardTab('upcoming');
    if (hash === 'profile') switchDashboardTab('profile');
    if (hash === 'history') switchDashboardTab('history');
  },

  setupDatePickers() {
    const reschedDate = document.getElementById('reschedule-date');
    if (reschedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      reschedDate.min = tomorrow.toISOString().split('T')[0];
      reschedDate.value = tomorrow.toISOString().split('T')[0];
    }
  }
};

// Global helpers for modals and tab navigation
function switchDashboardTab(tabId) {
  document.querySelectorAll('.dashboard-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.dashboard-tab-pane').forEach(pane => {
    pane.classList.add('hidden');
  });

  const activePane = document.getElementById(`tab-${tabId}`);
  if (activePane) activePane.classList.remove('hidden');

  const titles = {
    overview: 'Sanctuary Overview',
    upcoming: 'Upcoming Sessions',
    history: 'Past Treatment History',
    profile: 'Profile & Preferences',
    preferences: 'Contact & Reminders'
  };

  const titleEl = document.getElementById('current-view-title');
  if (titleEl && titles[tabId]) titleEl.textContent = titles[tabId];

  // Auto-close mobile sidebar if open
  const sidebar = document.getElementById('dashboard-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function openDetailsModal(bookingId) {
  const b = UserDashboard.bookings.find(item => item.id === bookingId);
  if (!b) return;

  const content = document.getElementById('modal-det-content');
  if (content) {
    content.innerHTML = `
      <div class="p-3 rounded-lg mb-3" style="background:var(--bg-surface-soft); border:1px solid var(--border-color);">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs text-muted-custom uppercase">Reference Code</span>
          <strong class="text-primary-custom font-mono">${b.id}</strong>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted-custom uppercase">Current Status</span>
          <span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 mb-4">
        <div><strong class="text-main block">Selected Treatment:</strong> <span class="text-secondary">${b.serviceName} (${b.durationMinutes} Minutes)</span></div>
        <div><strong class="text-main block">Assigned Specialist:</strong> <span class="text-secondary">${b.therapistName || 'Master Practitioner'}</span></div>
        <div><strong class="text-main block">Scheduled Date & Time:</strong> <span class="text-secondary">${b.dateFormatted || b.date} at ${b.time}</span></div>
        <div><strong class="text-main block">Pressure Preference:</strong> <span class="text-secondary">${b.pressurePreference || 'Medium'}</span></div>
        <div><strong class="text-main block">Special Notes:</strong> <span class="text-secondary">${b.notes || 'No special tension notes provided.'}</span></div>
        <div><strong class="text-main block">Payment:</strong> <span class="text-secondary">$${b.totalPrice ? b.totalPrice.toFixed(2) : '75.00'} (Pay at Studio Reception)</span></div>
      </div>

      <div class="p-3 rounded-lg text-xs text-secondary" style="background:var(--color-primary-softest); border:1px dashed var(--color-primary);">
        <strong>Sanctuary Arrival Reminder:</strong> Please arrive 10-15 minutes prior to check-in and enjoy our complimentary organic herbal infusion. Free guest parking is situated directly behind Harmony Way.
      </div>
    `;
  }

  const modal = document.getElementById('modal-details-backdrop');
  if (modal) modal.classList.add('open');
}

function closeDetailsModal() {
  const modal = document.getElementById('modal-details-backdrop');
  if (modal) modal.classList.remove('open');
}

function openRescheduleModal(bookingId) {
  const input = document.getElementById('reschedule-booking-id');
  if (input) input.value = bookingId;

  const modal = document.getElementById('modal-reschedule-backdrop');
  if (modal) modal.classList.add('open');
}

function closeRescheduleModal() {
  const modal = document.getElementById('modal-reschedule-backdrop');
  if (modal) modal.classList.remove('open');
}

function openCancelModal(bookingId) {
  const input = document.getElementById('cancel-booking-id');
  if (input) input.value = bookingId;

  const modal = document.getElementById('modal-cancel-backdrop');
  if (modal) modal.classList.add('open');
}

function closeCancelModal() {
  const modal = document.getElementById('modal-cancel-backdrop');
  if (modal) modal.classList.remove('open');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  UserDashboard.init();
});
