/**
 * Solace & Sole - Reflexology & Wellness Studio
 * Interactive 5-Step Appointment Booking Engine
 */

// 1. Built-in Reliable Default Services Dataset (guarantees cards always render)
const DEFAULT_SERVICES = [
  {
    id: "classic-eastern-reflexology",
    alias: "foot-reflexology-classic",
    name: "Classic Eastern Reflexology",
    badge: "Signature Treatment",
    category: "foot-reflexology",
    rating: 4.95,
    reviewsCount: 248,
    shortDescription: "Traditional acupressure targeting meridian reflex zones on the soles, relieving systemic stress and restoring organ equilibrium.",
    image: "assets/images/reflexology/foot-reflexology-1.jpg",
    durations: [
      { minutes: 45, price: 55, label: "Express Relief (45m)" },
      { minutes: 60, price: 75, label: "Standard Harmony (60m)", popular: true },
      { minutes: 90, price: 105, label: "Deep Therapeutic (90m)" }
    ]
  },
  {
    id: "foot-reflexology",
    alias: "foot-reflexology-relief",
    name: "Foot Reflexology",
    badge: "Specialized Care",
    category: "foot-reflexology",
    rating: 4.92,
    reviewsCount: 195,
    shortDescription: "Targeted sole, heel, and arch pressure therapy to stimulate circulation, dissolve tension knots, and alleviate plantar discomfort.",
    image: "assets/images/reflexology/foot-reflexology-2.jpg",
    durations: [
      { minutes: 30, price: 40, label: "Express Sole Relief (30m)" },
      { minutes: 60, price: 70, label: "Complete Reflexology (60m)", popular: true },
      { minutes: 75, price: 85, label: "Extended Restorative (75m)" }
    ]
  },
  {
    id: "body-reflexology",
    alias: "body-reflexology-acupressure",
    name: "Body Reflexology",
    badge: "Meridian Balancing",
    category: "body-reflexology",
    rating: 4.88,
    reviewsCount: 164,
    shortDescription: "Focused acupressure across upper back, neck, shoulders, and spinal meridians to release deep muscular stress and reset posture.",
    image: "assets/images/body-massage/body-reflexology-1.jpg",
    durations: [
      { minutes: 45, price: 60, label: "Targeted Upper Body (45m)" },
      { minutes: 60, price: 80, label: "Full Spinal Meridian (60m)", popular: true },
      { minutes: 90, price: 110, label: "Comprehensive Acupressure (90m)" }
    ]
  },
  {
    id: "relaxation-foot-massage",
    alias: "botanical-foot-massage",
    name: "Relaxation Foot Massage",
    badge: "Deep Relaxation",
    category: "relaxation-foot",
    rating: 4.86,
    reviewsCount: 182,
    shortDescription: "A soothing, rhythmic massage blending nourishing botanical oils with warm towels, gentle stretches, and calming tension strokes.",
    image: "assets/images/foot-massage/thai-foot-massage.jpg",
    durations: [
      { minutes: 45, price: 50, label: "Quick Revival (45m)" },
      { minutes: 60, price: 68, label: "Nourishing Session (60m)", popular: true },
      { minutes: 75, price: 82, label: "Extended Bliss (75m)" }
    ]
  },
  {
    id: "full-body-relaxation-massage",
    alias: "holistic-full-body",
    name: "Full-Body Relaxation Massage",
    badge: "Holistic Wellness",
    category: "body-massage",
    rating: 4.94,
    reviewsCount: 220,
    shortDescription: "A restorative full-body sequence integrating aromatic oils, long flowing strokes, and gentle joint decompression for deep calm.",
    image: "assets/images/body-massage/full-body-relaxation.jpg",
    durations: [
      { minutes: 60, price: 85, label: "Full Body Reset (60m)" },
      { minutes: 90, price: 120, label: "Deep Sensory Escape (90m)", popular: true },
      { minutes: 120, price: 155, label: "Ultimate Sanctuary (120m)" }
    ]
  }
];

// 2. Built-in Reliable Default Specialists Dataset
const DEFAULT_THERAPISTS = [
  {
    id: "therapist-mei-ling",
    name: "Master Mei-Ling Chen",
    role: "Lead Reflexologist & TCM Specialist",
    experience: "16+ Years Experience",
    avatar: "assets/images/therapists/therapist-1.jpg",
    rating: 4.98,
    qualifications: ["IIR Certified Reflexologist", "TCM Meridian Specialist Diploma"],
    specialties: ["Classic Eastern Reflexology", "Plantar Fascia & Arch Care"],
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"]
  },
  {
    id: "therapist-david-morales",
    name: "David Morales, LMT",
    role: "Neuromuscular & Foot Care Specialist",
    experience: "11+ Years Experience",
    avatar: "assets/images/therapists/therapist-2.jpg",
    rating: 4.95,
    qualifications: ["Licensed Massage Therapist", "Wat Pho Thai Certified"],
    specialties: ["Athletic Foot Recovery", "Deep Calf & Achilles Release"],
    availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"]
  },
  {
    id: "therapist-anya-sharma",
    name: "Anya Sharma",
    role: "Holistic Bodywork & Acupressure Practitioner",
    experience: "9+ Years Experience",
    avatar: "assets/images/therapists/therapist-3.jpg",
    rating: 4.92,
    qualifications: ["Acupressure Board Certified", "Ayurvedic Herbal Formulator"],
    specialties: ["Botanical Foot Massage", "Meridian Point Balancing"],
    availableDays: ["Monday", "Wednesday", "Thursday", "Saturday", "Sunday"]
  },
  {
    id: "therapist-kai-tanaka",
    name: "Kai Tanaka",
    role: "Shiatsu & Structural Alignment Specialist",
    experience: "14+ Years Experience",
    avatar: "assets/images/therapists/therapist-4.jpg",
    rating: 4.96,
    qualifications: ["Master Shiatsu (Tokyo)", "Jin Shin Jyutsu Practitioner"],
    specialties: ["Full-Body Relaxation", "Spinal Acupressure Flow"],
    availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"]
  }
];

const BookingEngine = {
  currentStep: 1,
  services: DEFAULT_SERVICES,
  therapists: DEFAULT_THERAPISTS,
  demoAppointments: [],

  state: {
    serviceId: null,
    serviceName: '',
    duration: null,
    price: 0,
    therapistId: 'any',
    therapistName: 'Any Available Specialist',
    therapistAvatar: '',
    date: '',
    timeSlot: '',
    client: {
      name: '',
      email: '',
      phone: '',
      pressure: 'Medium Balanced',
      notes: '',
      consent: true
    }
  },

  async init() {
    await this.loadAllData();
    this.parseUrlParameters();
    this.renderStep1Services();
    this.renderStep2Therapists();
    this.renderStep3DateTime();
    this.updateSummarySidebar();
    this.updateButtonStates();
    this.bindStepActions();
    this.restoreClientForm();
  },

  async loadAllData() {
    try {
      const [srvRes, thRes, appRes] = await Promise.all([
        fetch('data/services.json').catch(() => null),
        fetch('data/therapists.json').catch(() => null),
        fetch('data/demo-appointments.json').catch(() => null)
      ]);

      if (srvRes && srvRes.ok) {
        const fetchedServices = await srvRes.json();
        if (Array.isArray(fetchedServices) && fetchedServices.length > 0) {
          // Merge while keeping prompt's required naming and structure
          this.services = fetchedServices.map(fs => {
            const match = DEFAULT_SERVICES.find(ds => ds.id === fs.id || ds.alias === fs.id || ds.name === fs.name);
            return match ? { ...fs, ...match, durations: fs.durations || match.durations } : fs;
          });
        }
      }

      if (thRes && thRes.ok) {
        const fetchedTherapists = await thRes.json();
        if (Array.isArray(fetchedTherapists) && fetchedTherapists.length > 0) {
          this.therapists = fetchedTherapists;
        }
      }

      if (appRes && appRes.ok) {
        this.demoAppointments = await appRes.json();
      }
    } catch (e) {
      console.warn('Booking engine: using built-in verified dataset.', e);
    }
  },

  parseUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const durationParam = params.get('duration');
    const therapistParam = params.get('therapist');

    if (serviceParam && this.services.length > 0) {
      const s = this.services.find(item => 
        item.id === serviceParam || 
        (item.alias && item.alias === serviceParam) ||
        item.name.toLowerCase().includes(serviceParam.toLowerCase())
      );

      if (s) {
        this.state.serviceId = s.id;
        this.state.serviceName = s.name;
        
        if (durationParam) {
          const d = s.durations.find(dur => dur.minutes == durationParam);
          if (d) {
            this.state.duration = d.minutes;
            this.state.price = d.price;
          } else {
            const defaultDur = s.durations.find(dur => dur.popular) || s.durations[0];
            this.state.duration = defaultDur.minutes;
            this.state.price = defaultDur.price;
          }
        } else {
          const defaultDur = s.durations.find(dur => dur.popular) || s.durations[0];
          this.state.duration = defaultDur.minutes;
          this.state.price = defaultDur.price;
        }
      }
    }

    if (therapistParam && this.therapists.length > 0) {
      const t = this.therapists.find(item => item.id === therapistParam);
      if (t) {
        this.state.therapistId = t.id;
        this.state.therapistName = t.name;
      }
    }

    // Prefill user details if authenticated
    if (window.AuthManager) {
      const curUser = AuthManager.getCurrentUser();
      if (curUser) {
        this.state.client.name = curUser.name || '';
        this.state.client.email = curUser.email || '';
      }
    }
  },

  updateButtonStates() {
    // Step 1 Continue button: only enabled if valid service and duration are chosen
    const step1Btn = document.getElementById('step-1-next-btn') || document.querySelector('#booking-step-1 .booking-next-step-btn');
    if (step1Btn) {
      const isValid = Boolean(this.state.serviceId && this.state.duration);
      step1Btn.disabled = !isValid;
      step1Btn.classList.toggle('disabled', !isValid);
    }

    // Step 3 Continue button: only enabled if date and time slot are chosen
    const step3Btn = document.getElementById('step-3-next-btn') || document.querySelector('#booking-step-3 .booking-next-step-btn');
    if (step3Btn) {
      const isValid = Boolean(this.state.date && this.state.timeSlot);
      step3Btn.disabled = !isValid;
      step3Btn.classList.toggle('disabled', !isValid);
    }
  },

  updateSummarySidebar() {
    const summaryCard = document.getElementById('booking-summary-sidebar');
    if (!summaryCard) return;

    const sName = summaryCard.querySelector('#sum-service-name');
    const sDur = summaryCard.querySelector('#sum-duration');
    const sTherapist = summaryCard.querySelector('#sum-therapist');
    const sDate = summaryCard.querySelector('#sum-date');
    const sTime = summaryCard.querySelector('#sum-time');
    const sPrice = summaryCard.querySelector('#sum-price');
    const sTax = summaryCard.querySelector('#sum-tax');
    const sTotal = summaryCard.querySelector('#sum-total');
    const sBadge = summaryCard.querySelector('#sum-step-badge');

    if (sBadge) {
      sBadge.textContent = `Step ${this.currentStep} of 5`;
    }

    if (sName) {
      if (this.state.serviceName) {
        sName.textContent = this.state.serviceName;
      } else {
        sName.innerHTML = '<span class="summary-empty-placeholder">Not selected</span>';
      }
    }

    if (sDur) {
      if (this.state.duration) {
        sDur.textContent = `${this.state.duration} Minutes`;
      } else {
        sDur.innerHTML = '<span class="summary-empty-placeholder">—</span>';
      }
    }

    if (sTherapist) {
      sTherapist.textContent = this.state.therapistName || 'Any Available Specialist';
    }

    if (sDate) {
      if (this.state.date) {
        const parts = this.state.date.split('-');
        if (parts.length === 3) {
          const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          sDate.textContent = dObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        } else {
          sDate.textContent = this.state.date;
        }
      } else {
        sDate.innerHTML = '<span class="summary-empty-placeholder">Not selected</span>';
      }
    }

    if (sTime) {
      if (this.state.timeSlot) {
        sTime.textContent = this.state.timeSlot;
      } else {
        sTime.innerHTML = '<span class="summary-empty-placeholder">Not selected</span>';
      }
    }

    const price = Number(this.state.price) || 0;
    const taxAmount = (price * 0.08).toFixed(2);
    const totalAmount = (price * 1.08).toFixed(2);

    if (sPrice) sPrice.textContent = price > 0 ? `$${price.toFixed(2)}` : '$0.00';
    if (sTax) sTax.textContent = price > 0 ? `$${taxAmount}` : '$0.00';
    if (sTotal) sTotal.textContent = price > 0 ? `$${totalAmount}` : '$0.00';
  },

  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > 5) return;

    // Validate when advancing forward
    if (stepNumber > this.currentStep) {
      if (this.currentStep === 1) {
        if (!this.state.serviceId || !this.state.duration) {
          if (window.Notifications) {
            Notifications.show('Select Treatment', 'Please select a treatment and duration to continue.', 'error');
          }
          return;
        }
      }

      if (this.currentStep === 3) {
        if (!this.state.date || !this.state.timeSlot) {
          if (window.Notifications) {
            Notifications.show('Select Date & Time', 'Please select both an appointment date and an available time slot.', 'error');
          }
          return;
        }
      }

      if (this.currentStep === 4) {
        const isValid = this.validateAndSaveClientForm();
        if (!isValid) return;
      }
    }

    // Save client form inputs if currently on step 4 even when navigating backward
    if (this.currentStep === 4) {
      this.readClientFormInputs();
    }

    this.currentStep = stepNumber;

    // Update Stepper circles
    document.querySelectorAll('.stepper-step').forEach(step => {
      const stepIdx = parseInt(step.getAttribute('data-step'), 10);
      step.classList.remove('active', 'completed');
      if (stepIdx === this.currentStep) {
        step.classList.add('active');
        step.setAttribute('aria-current', 'step');
      } else if (stepIdx < this.currentStep) {
        step.classList.add('completed');
        step.removeAttribute('aria-current');
      } else {
        step.removeAttribute('aria-current');
      }
    });

    // Update Step Panes
    document.querySelectorAll('.booking-step-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    const targetPane = document.getElementById(`booking-step-${this.currentStep}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    // Re-render context-sensitive steps
    if (this.currentStep === 3) {
      this.renderStep3DateTime();
    } else if (this.currentStep === 4) {
      this.restoreClientForm();
    } else if (this.currentStep === 5) {
      this.renderReviewStep();
    }

    this.updateSummarySidebar();
    this.updateButtonStates();

    // Scroll smoothly to the booking section
    const bookingSection = document.querySelector('.booking-stepper');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  renderStep1Services() {
    const container = document.getElementById('booking-services-list');
    if (!container) return;

    container.innerHTML = this.services.map(s => {
      const isSelected = s.id === this.state.serviceId;
      return `
        <div class="booking-item-card ${isSelected ? 'selected' : ''}" data-service-id="${s.id}">
          <div class="card-check-badge" aria-hidden="true">✓</div>
          <img src="${s.image}" alt="${s.name}" class="booking-item-thumb">
          <div class="flex-grow">
            <div class="flex items-center justify-between mb-1 flex-wrap gap-1">
              <span class="badge-wellness" style="font-size: 0.72rem;">${s.badge || 'Reflexology'}</span>
              <span class="text-xs text-muted-custom">★ ${s.rating} (${s.reviewsCount || 150}+ reviews)</span>
            </div>
            <h4 class="font-heading mb-1 text-main" style="font-size: 1.18rem;">${s.name}</h4>
            <p class="text-secondary text-xs mb-3 leading-relaxed">${s.shortDescription}</p>

            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-semibold text-main mr-1">Select Duration:</span>
              ${s.durations.map(d => {
                const isDurActive = isSelected && d.minutes === this.state.duration;
                return `
                  <button type="button" 
                    class="duration-select-pill ${isDurActive ? 'active' : ''}" 
                    data-service-id="${s.id}" 
                    data-mins="${d.minutes}" 
                    data-price="${d.price}"
                    aria-label="${d.minutes} minutes at $${d.price}">
                    <span>${d.minutes}m</span>
                    <span>($${d.price})</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach card and duration pill click listeners
    container.querySelectorAll('.booking-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const sId = card.getAttribute('data-service-id');
        const s = this.services.find(item => item.id === sId);
        if (!s) return;

        this.state.serviceId = s.id;
        this.state.serviceName = s.name;

        const durationBtn = e.target.closest('.duration-select-pill');
        if (durationBtn) {
          this.state.duration = parseInt(durationBtn.getAttribute('data-mins'), 10);
          this.state.price = parseInt(durationBtn.getAttribute('data-price'), 10);
        } else if (!this.state.duration || card.getAttribute('data-service-id') !== sId) {
          const defaultDur = s.durations.find(dur => dur.popular) || s.durations[0];
          this.state.duration = defaultDur.minutes;
          this.state.price = defaultDur.price;
        }

        // Fast class toggle without DOM reconstruction
        container.querySelectorAll('.booking-item-card').forEach(c => {
          const isThis = c.getAttribute('data-service-id') === s.id;
          c.classList.toggle('selected', isThis);
          c.querySelectorAll('.duration-select-pill').forEach(pill => {
            const mins = parseInt(pill.getAttribute('data-mins'), 10);
            pill.classList.toggle('active', isThis && mins === this.state.duration);
          });
        });

        this.updateSummarySidebar();
        this.updateButtonStates();
      });
    });
  },

  renderStep2Therapists() {
    const container = document.getElementById('booking-therapists-list');
    if (!container) return;

    let html = `
      <div class="therapist-choice-card ${this.state.therapistId === 'any' ? 'selected' : ''}" data-therapist-id="any">
        <div class="card-check-badge" aria-hidden="true">✓</div>
        <div class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style="background: var(--color-primary-soft); color: var(--color-primary);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div>
          <h5 class="font-heading mb-0.5 text-main" style="font-size: 1.05rem;">Any Available Specialist</h5>
          <p class="text-secondary text-xs mb-1">Allows maximum scheduling flexibility. The studio matches the best available therapist.</p>
          <span class="text-xs text-primary-custom font-semibold">Available All Operating Days</span>
        </div>
      </div>
    `;

    html += this.therapists.map(t => `
      <div class="therapist-choice-card ${this.state.therapistId === t.id ? 'selected' : ''}" data-therapist-id="${t.id}">
        <div class="card-check-badge" aria-hidden="true">✓</div>
        <img src="${t.avatar}" alt="${t.name}" class="therapist-choice-avatar">
        <div class="flex-grow">
          <div class="flex items-center justify-between mb-0.5">
            <h5 class="font-heading mb-0 text-main" style="font-size: 1.05rem;">${t.name}</h5>
            <span class="text-xs text-primary-custom font-semibold">★ ${t.rating}</span>
          </div>
          <p class="text-secondary text-xs mb-1">${t.role} • <span class="text-muted-custom">${t.experience}</span></p>
          <div class="text-xs text-muted-custom mb-1">
            <strong>Specialties:</strong> ${t.specialties ? t.specialties.slice(0, 2).join(', ') : 'Reflexology'}
          </div>
          <span class="text-xs text-secondary block" style="font-size: 0.7rem;">
            Days: ${t.availableDays ? t.availableDays.join(', ') : 'All Days'}
          </span>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;

    container.querySelectorAll('.therapist-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.therapist-choice-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const tId = card.getAttribute('data-therapist-id');
        this.state.therapistId = tId;

        if (tId === 'any') {
          this.state.therapistName = 'Any Available Specialist';
          this.state.therapistAvatar = '';
        } else {
          const t = this.therapists.find(item => item.id === tId);
          this.state.therapistName = t ? t.name : 'Selected Specialist';
          this.state.therapistAvatar = t ? t.avatar : '';
        }

        this.updateSummarySidebar();
      });
    });
  },

  renderStep3DateTime() {
    const dateContainer = document.getElementById('booking-date-scroll');
    if (!dateContainer) return;

    // Generate upcoming 14 days starting today
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }

    const selectedTherapist = this.therapists.find(t => t.id === this.state.therapistId);

    // If no date selected yet, pick first available day
    if (!this.state.date) {
      let firstAvailable = dates[0];
      if (selectedTherapist && selectedTherapist.availableDays) {
        const found = dates.find(d => {
          const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
          return selectedTherapist.availableDays.includes(weekday);
        });
        if (found) firstAvailable = found;
      }
      this.state.date = firstAvailable.toISOString().split('T')[0];
    }

    dateContainer.innerHTML = dates.map(d => {
      const dateStr = d.toISOString().split('T')[0];
      const isSelected = dateStr === this.state.date;
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayLong = d.toLocaleDateString('en-US', { weekday: 'long' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });

      // Check therapist availability for day
      let isOff = false;
      if (selectedTherapist && selectedTherapist.availableDays) {
        if (!selectedTherapist.availableDays.includes(dayLong)) {
          isOff = true;
        }
      }

      return `
        <div class="date-slot-card ${isSelected ? 'selected' : ''} ${isOff ? 'disabled' : ''}" 
             data-date="${dateStr}" 
             ${isOff ? 'disabled title="Specialist not available on this day"' : ''}
             role="button"
             tabindex="${isOff ? -1 : 0}">
          <span class="text-xs uppercase text-muted-custom block mb-1">${dayName}</span>
          <span class="font-heading font-bold text-main block" style="font-size: 1.35rem; line-height: 1;">${dayNum}</span>
          <span class="text-xs text-muted-custom block mt-1">${isOff ? 'Off' : monthName}</span>
        </div>
      `;
    }).join('');

    dateContainer.querySelectorAll('.date-slot-card:not(.disabled)').forEach(card => {
      card.addEventListener('click', () => {
        dateContainer.querySelectorAll('.date-slot-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.state.date = card.getAttribute('data-date');
        this.updateSummarySidebar();
        this.renderTimeSlots();
        this.updateButtonStates();
      });
    });

    this.renderTimeSlots();
  },

  renderTimeSlots() {
    const morningContainer = document.getElementById('slots-morning');
    const afternoonContainer = document.getElementById('slots-afternoon');
    const eveningContainer = document.getElementById('slots-evening');

    const morningTimes = ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'];
    const afternoonTimes = ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '04:45 PM'];
    const eveningTimes = ['05:30 PM', '06:15 PM', '07:00 PM', '08:00 PM'];

    // Collect all booked appointments (from demo data + local storage)
    const storedBookingsRaw = localStorage.getItem('wellness_studio_bookings');
    let storedBookings = [];
    if (storedBookingsRaw) {
      try { storedBookings = JSON.parse(storedBookingsRaw); } catch (e) {}
    }
    const allBookings = [...this.demoAppointments, ...storedBookings];

    const todayStr = new Date().toISOString().split('T')[0];
    const isToday = this.state.date === todayStr;
    const now = new Date();
    const curHour = now.getHours();
    const curMin = now.getMinutes();

    const isSlotBooked = (timeStr) => {
      // Check if slot on selected date is booked
      return allBookings.some(b => {
        const dateMatch = b.date === this.state.date;
        const timeMatch = b.timeSlot === timeStr;
        const therapistMatch = (this.state.therapistId === 'any') 
          ? true 
          : (b.therapistId === this.state.therapistId || b.therapistName === this.state.therapistName);
        return dateMatch && timeMatch && therapistMatch;
      });
    };

    const isSlotInPast = (timeStr) => {
      if (!isToday) return false;
      const [timePart, modifier] = timeStr.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;

      if (hours < curHour) return true;
      if (hours === curHour && minutes <= curMin) return true;
      return false;
    };

    const renderGroup = (container, list) => {
      if (!container) return;
      container.innerHTML = list.map(t => {
        const isSelected = t === this.state.timeSlot;
        const booked = isSlotBooked(t);
        const inPast = isSlotInPast(t);
        const disabled = booked || inPast;
        const labelText = booked ? `${t} (Booked)` : (inPast ? `${t} (Past)` : t);

        return `
          <button type="button" 
            class="time-slot-pill ${isSelected ? 'selected' : ''} ${disabled ? 'booked' : ''}" 
            data-time="${t}"
            ${disabled ? 'disabled title="Slot is unavailable"' : ''}
            aria-label="${labelText}">
            ${t}
          </button>
        `;
      }).join('');
    };

    renderGroup(morningContainer, morningTimes);
    renderGroup(afternoonContainer, afternoonTimes);
    renderGroup(eveningContainer, eveningTimes);

    document.querySelectorAll('.time-slot-pill:not(.booked):not([disabled])').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.time-slot-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        this.state.timeSlot = pill.getAttribute('data-time');
        this.updateSummarySidebar();
        this.updateButtonStates();
      });
    });
  },

  readClientFormInputs() {
    const nameEl = document.getElementById('client-fullname');
    const emailEl = document.getElementById('client-email');
    const phoneEl = document.getElementById('client-phone');
    const notesEl = document.getElementById('client-notes');
    const pressureEl = document.querySelector('input[name="pressure_pref"]:checked');
    const consentEl = document.getElementById('client-consent');

    if (nameEl && nameEl.value.trim()) this.state.client.name = nameEl.value.trim();
    if (emailEl && emailEl.value.trim()) this.state.client.email = emailEl.value.trim();
    if (phoneEl && phoneEl.value.trim()) this.state.client.phone = phoneEl.value.trim();
    if (notesEl) this.state.client.notes = notesEl.value.trim();
    if (pressureEl) this.state.client.pressure = pressureEl.value;
    if (consentEl) this.state.client.consent = consentEl.checked;
  },

  restoreClientForm() {
    const nameEl = document.getElementById('client-fullname');
    const emailEl = document.getElementById('client-email');
    const phoneEl = document.getElementById('client-phone');
    const notesEl = document.getElementById('client-notes');
    const consentEl = document.getElementById('client-consent');

    if (nameEl && this.state.client.name) nameEl.value = this.state.client.name;
    if (emailEl && this.state.client.email) emailEl.value = this.state.client.email;
    if (phoneEl && this.state.client.phone) phoneEl.value = this.state.client.phone;
    if (notesEl && this.state.client.notes) notesEl.value = this.state.client.notes;

    if (this.state.client.pressure) {
      const pRadio = document.querySelector(`input[name="pressure_pref"][value="${this.state.client.pressure}"]`);
      if (pRadio) pRadio.checked = true;
    }

    if (consentEl && this.state.client.consent !== undefined) {
      consentEl.checked = this.state.client.consent;
    }
  },

  validateAndSaveClientForm() {
    const clientForm = document.getElementById('booking-client-form');
    let isValid = true;

    const nameEl = document.getElementById('client-fullname');
    const emailEl = document.getElementById('client-email');
    const phoneEl = document.getElementById('client-phone');
    const consentEl = document.getElementById('client-consent');

    if (window.FormValidator && clientForm) {
      isValid = FormValidator.validateForm(clientForm);
    } else {
      // Fallback manual validation
      if (!nameEl || nameEl.value.trim().length < 2) isValid = false;
      if (!emailEl || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) isValid = false;
      if (!phoneEl || phoneEl.value.trim().length < 7) isValid = false;
    }

    if (consentEl && !consentEl.checked) {
      isValid = false;
      if (window.Notifications) {
        Notifications.show('Consent Required', 'Please confirm the health and contraindications policy to continue.', 'error');
      }
      consentEl.focus();
      return false;
    }

    if (!isValid) {
      if (window.Notifications) {
        Notifications.show('Required Information', 'Please complete all required fields correctly before reviewing.', 'error');
      }
      return false;
    }

    this.readClientFormInputs();
    return true;
  },

  renderReviewStep() {
    const reviewBox = document.getElementById('booking-review-box');
    if (!reviewBox) return;

    const price = Number(this.state.price) || 0;
    const tax = (price * 0.08).toFixed(2);
    const total = (price * 1.08).toFixed(2);

    let dateDisplay = this.state.date;
    const parts = this.state.date.split('-');
    if (parts.length === 3) {
      const dObj = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      dateDisplay = dObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }

    reviewBox.innerHTML = `
      <!-- 1. Treatment Section -->
      <div class="review-section-card">
        <div class="review-section-header">
          <span class="text-xs font-bold uppercase tracking-wider text-muted-custom">1. Selected Treatment</span>
          <button type="button" class="review-edit-btn" onclick="BookingEngine.goToStep(1)">Edit</button>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <h5 class="font-heading text-main mb-0.5" style="font-size: 1.15rem;">${this.state.serviceName}</h5>
            <span class="text-xs text-secondary">${this.state.duration} Minutes Comprehensive Session</span>
          </div>
          <span class="font-heading font-bold text-main" style="font-size: 1.25rem;">$${price.toFixed(2)}</span>
        </div>
      </div>

      <!-- 2. Specialist Section -->
      <div class="review-section-card">
        <div class="review-section-header">
          <span class="text-xs font-bold uppercase tracking-wider text-muted-custom">2. Specialist</span>
          <button type="button" class="review-edit-btn" onclick="BookingEngine.goToStep(2)">Edit</button>
        </div>
        <div class="flex items-center gap-3">
          ${this.state.therapistAvatar 
            ? `<img src="${this.state.therapistAvatar}" alt="${this.state.therapistName}" class="w-10 h-10 rounded-full object-cover">`
            : `<div class="w-10 h-10 rounded-full flex items-center justify-center text-primary-custom" style="background:var(--color-primary-soft);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="7" r="4"></circle><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path></svg></div>`
          }
          <div>
            <strong class="text-main block">${this.state.therapistName}</strong>
            <span class="text-xs text-muted-custom">Certified Practitioner Assignment</span>
          </div>
        </div>
      </div>

      <!-- 3. Schedule Section -->
      <div class="review-section-card">
        <div class="review-section-header">
          <span class="text-xs font-bold uppercase tracking-wider text-muted-custom">3. Date & Time</span>
          <button type="button" class="review-edit-btn" onclick="BookingEngine.goToStep(3)">Edit</button>
        </div>
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div>
            <strong class="text-main block">${dateDisplay}</strong>
            <span class="text-xs text-muted-custom">Arrival Slot: ${this.state.timeSlot}</span>
          </div>
          <span class="badge-wellness" style="background: var(--color-primary-soft);">Confirmed Availability</span>
        </div>
      </div>

      <!-- 4. Guest Details Section -->
      <div class="review-section-card">
        <div class="review-section-header">
          <span class="text-xs font-bold uppercase tracking-wider text-muted-custom">4. Guest Information</span>
          <button type="button" class="review-edit-btn" onclick="BookingEngine.goToStep(4)">Edit</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div><span class="text-muted-custom text-xs block">Guest Name:</span> <strong class="text-main">${this.state.client.name}</strong></div>
          <div><span class="text-muted-custom text-xs block">Phone:</span> <strong class="text-main">${this.state.client.phone}</strong></div>
          <div><span class="text-muted-custom text-xs block">Email:</span> <strong class="text-main">${this.state.client.email}</strong></div>
          <div><span class="text-muted-custom text-xs block">Pressure Level:</span> <strong class="text-main">${this.state.client.pressure}</strong></div>
        </div>
        ${this.state.client.notes ? `<div class="mt-2 pt-2 border-t text-xs text-secondary" style="border-color: var(--border-color);"><strong class="text-main">Health / Session Notes:</strong> ${this.state.client.notes}</div>` : ''}
      </div>

      <!-- 5. Transparent Pricing Card -->
      <div class="p-4 rounded-xl mb-4" style="background: var(--bg-surface); border: 1.5px solid var(--border-color);">
        <h5 class="font-heading text-main mb-3" style="font-size: 1.05rem;">Studio Pricing Summary</h5>
        <div class="flex justify-between text-sm py-1 border-b" style="border-color: var(--border-color);">
          <span class="text-secondary">Treatment Fee:</span>
          <strong class="text-main">$${price.toFixed(2)}</strong>
        </div>
        <div class="flex justify-between text-sm py-1 border-b" style="border-color: var(--border-color);">
          <span class="text-secondary">Studio Wellness Tax (8%):</span>
          <span class="text-secondary">$${tax}</span>
        </div>
        <div class="flex justify-between items-center pt-2">
          <span class="font-bold text-main">Total Due in Studio:</span>
          <span class="font-heading font-bold text-primary-custom" style="font-size: 1.35rem;">$${total}</span>
        </div>
      </div>

      <!-- Pay in Studio Guarantee -->
      <div class="p-4 rounded-xl mb-6" style="background: var(--color-primary-softest); border: 1px dashed var(--color-primary-light);">
        <div class="flex items-center gap-2 text-sm text-primary-custom font-semibold mb-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Pay Upon Arrival in Studio
        </div>
        <p class="text-secondary text-xs mb-0">No upfront charge. Pay after treatment via Card, Cash, or Apple Pay.</p>
      </div>
    `;
  },

  bindStepActions() {
    // Next and Back buttons
    document.addEventListener('click', (e) => {
      const nextBtn = e.target.closest('.booking-next-step-btn');
      if (nextBtn) {
        e.preventDefault();
        this.goToStep(this.currentStep + 1);
        return;
      }

      const backBtn = e.target.closest('.booking-prev-step-btn');
      if (backBtn) {
        e.preventDefault();
        this.goToStep(this.currentStep - 1);
        return;
      }

      // Stepper circle navigation: allow jumping to completed steps or current step
      const stepHeader = e.target.closest('.stepper-step');
      if (stepHeader) {
        const targetStep = parseInt(stepHeader.getAttribute('data-step'), 10);
        if (targetStep < this.currentStep) {
          this.goToStep(targetStep);
        }
      }
    });

    // Final confirmation submit button
    const confirmBtn = document.getElementById('complete-booking-final-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.completeBooking();
      });
    }

    // Input listeners to clear error states and update state in real time
    const clientForm = document.getElementById('booking-client-form');
    if (clientForm) {
      clientForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
          this.readClientFormInputs();
        });
      });
    }
  },

  completeBooking() {
    const termsCheck = document.getElementById('terms-agree');
    if (termsCheck && !termsCheck.checked) {
      if (window.Notifications) {
        Notifications.show('Terms Acknowledgment', 'Please acknowledge the cancellation policy to confirm your reservation.', 'error');
      }
      termsCheck.focus();
      return;
    }

    const confirmBtn = document.getElementById('complete-booking-final-btn');
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = `
        <span class="inline-block animate-spin mr-2">◌</span>
        <span>Reserving Appointment...</span>
      `;
    }

    const price = Number(this.state.price) || 0;
    const bookingRef = 'REF-' + Math.floor(10000 + Math.random() * 90000);

    const fullBookingRecord = {
      referenceId: bookingRef,
      serviceId: this.state.serviceId,
      serviceName: this.state.serviceName,
      duration: this.state.duration,
      therapistId: this.state.therapistId,
      therapistName: this.state.therapistName,
      date: this.state.date,
      timeSlot: this.state.timeSlot,
      price: price,
      tax: (price * 0.08).toFixed(2),
      totalWithTax: (price * 1.08).toFixed(2),
      client: { ...this.state.client },
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    // 1. Store latest booking for the confirmation page
    localStorage.setItem('wellness_latest_booking', JSON.stringify(fullBookingRecord));

    // 2. Append to persistent bookings array to prevent double-booking
    try {
      const stored = localStorage.getItem('wellness_studio_bookings');
      const all = stored ? JSON.parse(stored) : [];
      all.push(fullBookingRecord);
      localStorage.setItem('wellness_studio_bookings', JSON.stringify(all));
    } catch (e) {
      console.warn('Could not persist to wellness_studio_bookings', e);
    }

    if (window.Notifications) {
      Notifications.show('Reservation Confirmed!', `Your booking reference is ${bookingRef}.`, 'success', 4000);
    }

    // Redirect to confirmation page
    setTimeout(() => {
      window.location.href = `booking-confirmation.html?ref=${bookingRef}`;
    }, 700);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  BookingEngine.init();
});

window.BookingEngine = BookingEngine;
