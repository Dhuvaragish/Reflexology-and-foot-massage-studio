/**
 * SOLE HARMONY - Administrative Dashboard Logic
 * Powers operations, booking management, service catalog CRUD,
 * enquiry review, dynamic KPI calculation, and data export.
 */

const AdminDashboard = {
  bookings: [],
  services: [],
  enquiries: [],
  currentTab: 'overview',
  activeEnquiryId: null,

  async init() {
    this.checkSession();
    await this.loadServices();
    this.loadBookings();
    this.loadEnquiries();
    this.calculateKPIs();
    this.render();
    this.bindEvents();
  },

  checkSession() {
    const admin = window.AuthManager ? AuthManager.getCurrentAdmin() : null;
    if (!admin) {
      // Prototype demo session fallback
      if (window.AuthManager) {
        AuthManager.setAdminSession({
          username: 'admin',
          role: 'Lead Studio Director',
          signedInAt: new Date().toISOString()
        });
      }
    }
  },

  async loadServices() {
    let stored = null;
    try {
      const raw = localStorage.getItem('wellness_studio_services');
      if (raw) stored = JSON.parse(raw);
    } catch (e) {}

    if (stored && stored.length > 0) {
      this.services = stored;
      return;
    }

    try {
      const res = await fetch('../data/services.json');
      if (res.ok) {
        this.services = await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch services.json, using fallback services', e);
    }

    if (!this.services || this.services.length === 0) {
      this.services = [
        {
          id: "traditional-foot-reflexology",
          name: "Traditional Foot Reflexology",
          category: "foot-reflexology",
          badge: "Signature Treatment",
          active: true,
          shortDescription: "Traditional acupressure targeting meridian reflex zones on the soles.",
          durations: [{ minutes: 60, price: 75, popular: true }]
        },
        {
          id: "relaxing-foot-massage",
          name: "Relaxing Foot Massage",
          category: "relaxation-foot",
          badge: "Deep Relaxation",
          active: true,
          shortDescription: "Soothing rhythmic massage with heated botanical oils and warm towels.",
          durations: [{ minutes: 60, price: 68, popular: true }]
        },
        {
          id: "full-body-reflexology",
          name: "Full-Body Reflexology",
          category: "body-reflexology",
          badge: "Meridian Harmony",
          active: true,
          shortDescription: "Comprehensive acupressure across spine, neck, shoulders, and plantar meridians.",
          durations: [{ minutes: 60, price: 85, popular: true }]
        },
        {
          id: "head-neck-shoulder-massage",
          name: "Head, Neck & Shoulder Massage",
          category: "body-reflexology",
          badge: "Desk Worker Rescue",
          active: true,
          shortDescription: "Targeted upper-body relief for desk workers and cervical tension.",
          durations: [{ minutes: 45, price: 58, popular: true }]
        },
        {
          id: "relaxation-massage",
          name: "Relaxation Massage",
          category: "full-body",
          badge: "Holistic Renewal",
          active: true,
          shortDescription: "Restorative head-to-toe session integrating long flowing strokes and warm towels.",
          durations: [{ minutes: 60, price: 85, popular: true }]
        },
        {
          id: "custom-wellness-session",
          name: "Custom Wellness Session",
          category: "signature-packages",
          badge: "Personalized Care",
          active: true,
          shortDescription: "Bespoke diagnostic intake with tailored blend of foot reflexology and bodywork.",
          durations: [{ minutes: 90, price: 125, popular: true }]
        }
      ];
    }

    // Ensure active property is populated
    this.services = this.services.map(s => ({
      ...s,
      active: s.active !== undefined ? s.active : true
    }));

    try {
      localStorage.setItem('wellness_studio_services', JSON.stringify(this.services));
    } catch (e) {}
  },

  loadBookings() {
    let stored = [];
    try {
      const raw = localStorage.getItem('wellness_studio_bookings');
      if (raw) stored = JSON.parse(raw);
    } catch (e) {}

    if (!stored || stored.length === 0) {
      // Seed initial sample bookings
      const today = new Date().toISOString().split('T')[0];
      stored = [
        {
          id: "REF-84912",
          serviceId: "traditional-foot-reflexology",
          serviceName: "Traditional Foot Reflexology",
          therapistId: "therapist-mei-ling",
          therapistName: "Master Mei-Ling Chen",
          durationMinutes: 60,
          date: today,
          dateFormatted: "Today",
          time: "10:30 AM",
          guestName: "Eleanor Vance",
          guestEmail: "guest@wellness.com",
          guestPhone: "(555) 392-8172",
          pressurePreference: "Medium",
          notes: "Focus on sole arches and tension release.",
          totalPrice: 81.00,
          status: "Confirmed",
          createdAt: new Date().toISOString()
        },
        {
          id: "REF-55291",
          serviceId: "relaxing-foot-massage",
          serviceName: "Relaxing Foot Massage",
          therapistId: "therapist-kenji",
          therapistName: "Kenji Sato",
          durationMinutes: 60,
          date: today,
          dateFormatted: "Today",
          time: "2:00 PM",
          guestName: "Marcus Sterling",
          guestEmail: "marcus.s@example.com",
          guestPhone: "(555) 481-9920",
          pressurePreference: "Firm",
          notes: "Recovering from half-marathon run.",
          totalPrice: 73.44,
          status: "Confirmed",
          createdAt: new Date().toISOString()
        },
        {
          id: "REF-39104",
          serviceId: "full-body-reflexology",
          serviceName: "Full-Body Reflexology",
          therapistId: "therapist-mei-ling",
          therapistName: "Master Mei-Ling Chen",
          durationMinutes: 60,
          date: today,
          dateFormatted: "Today",
          time: "4:30 PM",
          guestName: "Sophia Lin",
          guestEmail: "sophia@example.com",
          guestPhone: "(555) 720-3341",
          pressurePreference: "Medium",
          notes: "Upper neck stiffness.",
          totalPrice: 91.80,
          status: "Pending",
          createdAt: new Date().toISOString()
        },
        {
          id: "REF-71204",
          serviceId: "head-neck-shoulder-massage",
          serviceName: "Head, Neck & Shoulder Massage",
          therapistId: "therapist-ananya",
          therapistName: "Ananya Sharma",
          durationMinutes: 45,
          date: "2026-10-26",
          dateFormatted: "Sunday, Oct 26",
          time: "11:00 AM",
          guestName: "David Kim",
          guestEmail: "david.k@example.com",
          guestPhone: "(555) 239-9012",
          pressurePreference: "Gentle",
          notes: "First time reflexology guest.",
          totalPrice: 62.64,
          status: "Confirmed",
          createdAt: new Date().toISOString()
        }
      ];

      try {
        localStorage.setItem('wellness_studio_bookings', JSON.stringify(stored));
      } catch (e) {}
    }

    this.bookings = stored;
  },

  loadEnquiries() {
    let stored = [];
    try {
      const raw = localStorage.getItem('wellness_studio_enquiries');
      if (raw) stored = JSON.parse(raw);
    } catch (e) {}

    if (!stored || stored.length === 0) {
      stored = [
        {
          id: "ENQ-101",
          name: "Julian Thorne",
          email: "j.thorne@example.com",
          phone: "(555) 849-1123",
          servicePreference: "Traditional Foot Reflexology",
          preferredDate: "2026-10-28",
          preferredTime: "Afternoon",
          message: "Inquiring about booking private sessions for a couple during our anniversary weekend. Are adjoining private suites available?",
          status: "New",
          receivedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: "ENQ-102",
          name: "Clara Oswald",
          email: "clara.o@example.com",
          phone: "(555) 912-3841",
          servicePreference: "Custom Wellness Session",
          preferredDate: "2026-10-30",
          preferredTime: "Morning",
          message: "I have chronic plantar fasciitis and would like to know which practitioner has the most experience with tendon therapy.",
          status: "Replied",
          receivedAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];

      try {
        localStorage.setItem('wellness_studio_enquiries', JSON.stringify(stored));
      } catch (e) {}
    }

    this.enquiries = stored;
  },

  calculateKPIs() {
    const totalBookings = this.bookings.length;
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = this.bookings.filter(b => b.date === today || b.dateFormatted === 'Today');
    const upcomingBookings = this.bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
    const activeServices = this.services.filter(s => s.active !== false).length;
    const newEnquiries = this.enquiries.filter(e => e.status === 'New').length;

    const totalRevenue = this.bookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.totalPrice || 75), 0);

    // Update KPI counters
    const kpiTotal = document.getElementById('kpi-total-bookings');
    if (kpiTotal) kpiTotal.textContent = totalBookings;

    const kpiToday = document.getElementById('kpi-today-bookings');
    if (kpiToday) kpiToday.textContent = todayBookings.length;

    const kpiUpcoming = document.getElementById('kpi-upcoming-bookings');
    if (kpiUpcoming) kpiUpcoming.textContent = upcomingBookings.length;

    const kpiServices = document.getElementById('kpi-active-services');
    if (kpiServices) kpiServices.textContent = activeServices;

    const kpiEnq = document.getElementById('kpi-enquiries-count');
    if (kpiEnq) kpiEnq.textContent = newEnquiries;

    const kpiRev = document.getElementById('kpi-total-revenue');
    if (kpiRev) kpiRev.textContent = `$${Math.round(totalRevenue)}`;

    // Update Nav badges
    const navBookCount = document.getElementById('admin-nav-bookings-count');
    if (navBookCount) navBookCount.textContent = totalBookings;

    const navEnqCount = document.getElementById('admin-nav-enquiries-count');
    if (navEnqCount) navEnqCount.textContent = newEnquiries;
  },

  render() {
    this.renderTodaySchedule();
    this.renderAllBookings();
    this.renderServicesList();
    this.renderEnquiriesList();
  },

  renderTodaySchedule() {
    const tbody = document.getElementById('admin-today-schedule-tbody');
    if (!tbody) return;

    const today = new Date().toISOString().split('T')[0];
    const todayList = this.bookings.filter(b => b.date === today || b.dateFormatted === 'Today');

    if (todayList.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-6 text-muted-custom">
            No appointments scheduled for today yet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = todayList.map(b => `
      <tr>
        <td class="font-semibold text-main">${b.time}</td>
        <td>
          <div class="font-semibold text-main">${b.guestName}</div>
          <div class="text-xs text-muted-custom">${b.guestPhone || b.guestEmail}</div>
        </td>
        <td>${b.serviceName}</td>
        <td>${b.therapistName || 'Master Practitioner'}</td>
        <td>${b.durationMinutes}m</td>
        <td><strong>$${b.totalPrice ? b.totalPrice.toFixed(2) : '75.00'}</strong></td>
        <td><span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span></td>
        <td>
          <select class="form-select-custom text-xs py-1 px-2" onchange="updateBookingStatus('${b.id}', this.value)" style="width: auto;">
            <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `).join('');
  },

  renderAllBookings() {
    const tbody = document.getElementById('admin-all-bookings-tbody');
    if (!tbody) return;

    const searchInput = document.getElementById('admin-filter-search');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const statusFilter = document.getElementById('admin-filter-status') ? document.getElementById('admin-filter-status').value : 'all';
    const dateFilter = document.getElementById('admin-filter-date') ? document.getElementById('admin-filter-date').value : 'all';

    const today = new Date().toISOString().split('T')[0];

    const filtered = this.bookings.filter(b => {
      const matchSearch = !query || 
        b.guestName.toLowerCase().includes(query) || 
        b.id.toLowerCase().includes(query) || 
        b.serviceName.toLowerCase().includes(query) ||
        (b.guestEmail && b.guestEmail.toLowerCase().includes(query));

      const matchStatus = statusFilter === 'all' || b.status === statusFilter;

      let matchDate = true;
      if (dateFilter === 'today') {
        matchDate = (b.date === today || b.dateFormatted === 'Today');
      } else if (dateFilter === 'upcoming') {
        matchDate = (b.status === 'Confirmed' || b.status === 'Pending');
      }

      return matchSearch && matchStatus && matchDate;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-8 text-muted-custom">
            No bookings found matching the current search filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(b => `
      <tr>
        <td>
          <span class="font-mono font-semibold text-primary-custom text-xs">${b.id}</span>
        </td>
        <td>
          <div class="font-semibold text-main">${b.guestName}</div>
          <div class="text-xs text-muted-custom">${b.guestEmail || b.guestPhone}</div>
        </td>
        <td>
          <div class="text-main">${b.serviceName}</div>
          <span class="text-xs text-muted-custom">${b.durationMinutes} Minutes</span>
        </td>
        <td>
          <div class="text-main">${b.dateFormatted || b.date}</div>
          <div class="text-xs text-muted-custom">${b.time}</div>
        </td>
        <td>${b.therapistName || 'Master Specialist'}</td>
        <td><strong>$${b.totalPrice ? b.totalPrice.toFixed(2) : '75.00'}</strong></td>
        <td>
          <span class="status-badge status-${b.status.toLowerCase()}">${b.status}</span>
        </td>
        <td>
          <select class="form-select-custom text-xs py-1 px-2" onchange="updateBookingStatus('${b.id}', this.value)" style="width: auto;">
            <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `).join('');
  },

  renderServicesList() {
    const tbody = document.getElementById('admin-services-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.services.map(s => {
      const durDisplay = s.durations ? s.durations.map(d => `${d.minutes}m ($${d.price})`).join(', ') : '60m ($75)';
      const startingPrice = s.durations && s.durations.length > 0 ? s.durations[0].price : 75;
      const isActive = s.active !== false;

      return `
        <tr>
          <td>
            <div class="font-semibold text-main">${s.name}</div>
            <div class="text-xs text-muted-custom line-clamp-1 max-w-sm">${s.shortDescription || ''}</div>
          </td>
          <td><span class="text-xs uppercase tracking-wider text-muted-custom font-medium">${s.category.replace('-', ' ')}</span></td>
          <td class="text-xs font-mono">${durDisplay}</td>
          <td><strong class="text-main">$${startingPrice}</strong></td>
          <td>
            <span class="badge-wellness" style="background: ${isActive ? 'var(--color-success-bg)' : 'var(--bg-surface-soft)'}; color: ${isActive ? 'var(--color-success)' : 'var(--text-muted)'}; font-size: 0.75rem;">
              ${isActive ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td>
            <div class="flex items-center gap-2">
              <button type="button" class="btn-wellness btn-secondary-custom btn-sm text-xs py-1 px-2" onclick="editService('${s.id}')">Edit</button>
              <button type="button" class="btn-wellness btn-outline-custom btn-sm text-xs py-1 px-2" onclick="toggleServiceActive('${s.id}')">
                ${isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderEnquiriesList() {
    const tbody = document.getElementById('admin-enquiries-tbody');
    if (!tbody) return;

    if (this.enquiries.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-6 text-muted-custom">
            No customer enquiries submitted yet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = this.enquiries.map(e => `
      <tr>
        <td class="text-xs text-muted-custom">${new Date(e.receivedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
        <td class="font-semibold text-main">${e.name}</td>
        <td>
          <div class="text-xs text-main">${e.email}</div>
          <div class="text-xs text-muted-custom">${e.phone || '—'}</div>
        </td>
        <td class="text-xs">${e.servicePreference || 'General Wellness Inquiry'}</td>
        <td>
          <div class="text-xs text-secondary truncate max-w-xs">${e.message}</div>
        </td>
        <td>
          <span class="badge-wellness" style="background: ${e.status === 'New' ? 'var(--color-warning-bg)' : 'var(--color-info-bg)'}; color: ${e.status === 'New' ? 'var(--color-warning)' : 'var(--color-info)'}; font-size: 0.75rem;">
            ${e.status}
          </span>
        </td>
        <td>
          <button type="button" class="btn-wellness btn-secondary-custom btn-sm text-xs py-1 px-2" onclick="openEnquiryModal('${e.id}')">View</button>
        </td>
      </tr>
    `).join('');
  },

  bindEvents() {
    // Navigation Tabs
    document.querySelectorAll('.dashboard-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab) switchAdminTab(tab);
      });
    });

    // Mobile Sidebar
    const openBtn = document.getElementById('admin-open-sidebar-btn');
    const closeBtn = document.getElementById('admin-close-sidebar-btn');
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('admin-sidebar-backdrop');

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

    // Search and Filters
    const searchInput = document.getElementById('admin-filter-search');
    if (searchInput) searchInput.addEventListener('input', () => this.renderAllBookings());

    const statusFilter = document.getElementById('admin-filter-status');
    if (statusFilter) statusFilter.addEventListener('change', () => this.renderAllBookings());

    const dateFilter = document.getElementById('admin-filter-date');
    if (dateFilter) dateFilter.addEventListener('change', () => this.renderAllBookings());

    // Settings Form
    const setForm = document.getElementById('admin-settings-form');
    if (setForm) {
      setForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.Notifications) {
          Notifications.show('Settings Updated', 'Sanctuary operational hours and contact points have been saved.', 'success');
        }
      });
    }

    // Export Data Button
    const exportBtn = document.getElementById('admin-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const payload = {
          exportedAt: new Date().toISOString(),
          brand: "SOLE HARMONY",
          bookings: this.bookings,
          services: this.services,
          enquiries: this.enquiries
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `sole_harmony_data_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        if (window.Notifications) {
          Notifications.show('Export Generated', 'Studio registry exported as JSON file.', 'info');
        }
      });
    }

    // Reset Demo Data
    const resetBtn = document.getElementById('admin-reset-demo-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all demo bookings, services, and enquiries to default sample records?')) {
          localStorage.removeItem('wellness_studio_bookings');
          localStorage.removeItem('wellness_studio_services');
          localStorage.removeItem('wellness_studio_enquiries');
          window.location.reload();
        }
      });
    }

    // Admin Logout
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn && window.AuthManager) {
      logoutBtn.addEventListener('click', () => AuthManager.logoutAdmin());
    }

    // Service Form Submit (Add/Edit)
    const sForm = document.getElementById('admin-service-form');
    if (sForm) {
      sForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idField = document.getElementById('admin-service-id').value;
        const name = document.getElementById('service-form-name').value.trim();
        const category = document.getElementById('service-form-cat').value;
        const badge = document.getElementById('service-form-badge').value.trim();
        const desc = document.getElementById('service-form-desc').value.trim();
        const dur1 = parseInt(document.getElementById('service-form-dur1').value, 10) || 60;
        const price1 = parseFloat(document.getElementById('service-form-price1').value) || 75;

        if (idField) {
          // Edit existing
          const idx = this.services.findIndex(s => s.id === idField);
          if (idx !== -1) {
            this.services[idx].name = name;
            this.services[idx].category = category;
            this.services[idx].badge = badge;
            this.services[idx].shortDescription = desc;
            this.services[idx].durations = [{ minutes: dur1, price: price1, popular: true }];
          }
        } else {
          // Create new
          const newId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          this.services.push({
            id: newId,
            name: name,
            category: category,
            badge: badge || 'New Offering',
            shortDescription: desc,
            active: true,
            durations: [{ minutes: dur1, price: price1, popular: true }]
          });
        }

        try {
          localStorage.setItem('wellness_studio_services', JSON.stringify(this.services));
        } catch (err) {}

        this.calculateKPIs();
        this.renderServicesList();
        closeServiceModal();

        if (window.Notifications) {
          Notifications.show('Service Saved', `Catalog service "${name}" successfully updated.`, 'success');
        }
      });
    }

    // Mark Enquiry Replied
    const markRepliedBtn = document.getElementById('btn-mark-enquiry-replied');
    if (markRepliedBtn) {
      markRepliedBtn.addEventListener('click', () => {
        if (!this.activeEnquiryId) return;
        const idx = this.enquiries.findIndex(e => e.id === this.activeEnquiryId);
        if (idx !== -1) {
          this.enquiries[idx].status = 'Replied';
          try {
            localStorage.setItem('wellness_studio_enquiries', JSON.stringify(this.enquiries));
          } catch (e) {}
          this.calculateKPIs();
          this.renderEnquiriesList();
          closeEnquiryModal();
          if (window.Notifications) {
            Notifications.show('Status Updated', 'Enquiry marked as Replied.', 'success');
          }
        }
      });
    }
  }
};

// Global Helpers
function switchAdminTab(tabId) {
  document.querySelectorAll('.dashboard-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.add('hidden');
  });

  const targetPane = document.getElementById(`admin-tab-${tabId}`);
  if (targetPane) targetPane.classList.remove('hidden');

  const titles = {
    overview: 'Operations Overview',
    bookings: 'Appointments Registry',
    services: 'Catalog Services & Pricing',
    enquiries: 'Customer Enquiries',
    settings: 'Sanctuary Operational Settings'
  };

  const titleEl = document.getElementById('admin-view-title');
  if (titleEl && titles[tabId]) titleEl.textContent = titles[tabId];

  // Auto-close mobile drawer
  const sidebar = document.getElementById('admin-sidebar');
  const backdrop = document.getElementById('admin-sidebar-backdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function updateBookingStatus(bookingId, newStatus) {
  const idx = AdminDashboard.bookings.findIndex(b => b.id === bookingId);
  if (idx !== -1) {
    AdminDashboard.bookings[idx].status = newStatus;
    try {
      localStorage.setItem('wellness_studio_bookings', JSON.stringify(AdminDashboard.bookings));
    } catch (e) {}

    AdminDashboard.calculateKPIs();
    AdminDashboard.renderTodaySchedule();
    AdminDashboard.renderAllBookings();

    if (window.Notifications) {
      Notifications.show('Booking Updated', `Appointment ${bookingId} status changed to ${newStatus}.`, 'success');
    }
  }
}

function toggleServiceActive(serviceId) {
  const idx = AdminDashboard.services.findIndex(s => s.id === serviceId);
  if (idx !== -1) {
    AdminDashboard.services[idx].active = !AdminDashboard.services[idx].active;
    try {
      localStorage.setItem('wellness_studio_services', JSON.stringify(AdminDashboard.services));
    } catch (e) {}

    AdminDashboard.calculateKPIs();
    AdminDashboard.renderServicesList();

    if (window.Notifications) {
      const state = AdminDashboard.services[idx].active ? 'activated' : 'deactivated';
      Notifications.show('Catalog Updated', `Service ${AdminDashboard.services[idx].name} ${state}.`, 'info');
    }
  }
}

function openAddServiceModal() {
  document.getElementById('modal-service-title').textContent = 'Add New Sanctuary Service';
  document.getElementById('admin-service-id').value = '';
  document.getElementById('service-form-name').value = '';
  document.getElementById('service-form-badge').value = '';
  document.getElementById('service-form-desc').value = '';
  document.getElementById('service-form-dur1').value = '60';
  document.getElementById('service-form-price1').value = '75';

  const modal = document.getElementById('modal-service-backdrop');
  if (modal) modal.classList.add('open');
}

function editService(serviceId) {
  const s = AdminDashboard.services.find(item => item.id === serviceId);
  if (!s) return;

  document.getElementById('modal-service-title').textContent = `Edit Service: ${s.name}`;
  document.getElementById('admin-service-id').value = s.id;
  document.getElementById('service-form-name').value = s.name;
  document.getElementById('service-form-cat').value = s.category;
  document.getElementById('service-form-badge').value = s.badge || '';
  document.getElementById('service-form-desc').value = s.shortDescription || '';

  if (s.durations && s.durations.length > 0) {
    document.getElementById('service-form-dur1').value = s.durations[0].minutes;
    document.getElementById('service-form-price1').value = s.durations[0].price;
  }

  const modal = document.getElementById('modal-service-backdrop');
  if (modal) modal.classList.add('open');
}

function closeServiceModal() {
  const modal = document.getElementById('modal-service-backdrop');
  if (modal) modal.classList.remove('open');
}

function openEnquiryModal(enquiryId) {
  const e = AdminDashboard.enquiries.find(item => item.id === enquiryId);
  if (!e) return;

  AdminDashboard.activeEnquiryId = enquiryId;
  const body = document.getElementById('modal-enquiry-body');
  if (body) {
    body.innerHTML = `
      <div class="p-3 rounded-lg mb-3" style="background:var(--bg-surface-soft); border:1px solid var(--border-color);">
        <div class="flex items-center justify-between mb-1">
          <strong class="text-main">${e.name}</strong>
          <span class="badge-wellness" style="background:${e.status === 'New' ? 'var(--color-warning-bg)' : 'var(--color-info-bg)'}; color:${e.status === 'New' ? 'var(--color-warning)' : 'var(--color-info)'};">${e.status}</span>
        </div>
        <div class="text-xs text-muted-custom">${e.email} • ${e.phone || 'No phone'}</div>
      </div>
      <div class="mb-3 text-xs">
        <strong class="block text-main mb-0.5">Therapy Interest:</strong>
        <span class="text-secondary">${e.servicePreference || 'General Sanctuary Inquiry'}</span>
      </div>
      <div class="mb-3 text-xs">
        <strong class="block text-main mb-0.5">Preferred Time:</strong>
        <span class="text-secondary">${e.preferredDate || 'Flexible'} (${e.preferredTime || 'Anytime'})</span>
      </div>
      <div class="p-3 rounded-lg text-xs leading-relaxed" style="background:var(--bg-body); border:1px solid var(--border-color);">
        <strong class="block text-main mb-1">Guest Message:</strong>
        ${e.message}
      </div>
    `;
  }

  const modal = document.getElementById('modal-enquiry-backdrop');
  if (modal) modal.classList.add('open');
}

function closeEnquiryModal() {
  const modal = document.getElementById('modal-enquiry-backdrop');
  if (modal) modal.classList.remove('open');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  AdminDashboard.init();
});
