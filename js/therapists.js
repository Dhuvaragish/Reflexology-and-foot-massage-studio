/**
 * Reflexology & Foot Massage Studio - Therapists Logic & Profiles
 */

const TherapistsModule = {
  therapists: [],

  async init() {
    await this.loadData();
    this.renderTherapists();
    this.initModal();
  },

  async loadData() {
    try {
      const res = await fetch('data/therapists.json');
      if (res.ok) {
        this.therapists = await res.json();
        return;
      }
    } catch (e) {
      console.warn('Could not fetch therapists.json, using fallback data', e);
    }

    if (!this.therapists || this.therapists.length === 0) {
      this.therapists = [
        {
          id: "therapist-mei-ling",
          name: "Master Mei-Ling Chen",
          role: "Lead Reflexologist & Traditional Eastern Practitioner",
          experience: "16+ Years Experience",
          avatar: "assets/images/therapists/therapist-1.jpg",
          rating: 4.98,
          reviewsCount: 420,
          languages: ["English", "Mandarin", "Taiwanese"],
          qualifications: [
            "International Institute of Reflexology (IIR) Certified",
            "Traditional Chinese Medicine (TCM) Meridian Specialist Diploma",
            "Certified Herbal Foot Bath Formulator",
            "Member of Association of Reflexologists"
          ],
          specialties: [
            "Classic Eastern Foot Reflexology",
            "Plantar Fascia & Arch Tension Relief",
            "Systemic Digestive & Insomnia Balance",
            "Herbal Foot Soak Infusions"
          ],
          bio: "Trained in Taipei and London, Master Mei-Ling brings over sixteen years of dedicated reflexology wisdom. Her practice is grounded in the deep belief that the feet are the mirror of the entire human organism. Known for her intuitive diagnostic touch and serene bedside manner, she tailors every pressure point to each client's unique energetic constitution.",
          quote: "When we restore harmony to the soles, the mind quietens and the body naturally remembers how to heal.",
          availableDays: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"]
        },
        {
          id: "therapist-david-morales",
          name: "David Morales, LMT",
          role: "Senior Neuromuscular & Foot Care Specialist",
          experience: "11+ Years Experience",
          avatar: "assets/images/therapists/therapist-2.jpg",
          rating: 4.95,
          reviewsCount: 310,
          languages: ["English", "Spanish"],
          qualifications: [
            "Licensed Massage Therapist (LMT State Board)",
            "Advanced Thai Foot Reflexology Certification (Wat Pho)",
            "Certified Sports & Runner Foot Recovery Specialist",
            "Kinesiology & Biomechanics Fellow"
          ],
          specialties: [
            "Runner & Athletic Foot Recovery",
            "Basalt Hot Stone Reflexology",
            "Deep Calf & Achilles Tendon Decompression",
            "Postural Alignment via Lower Extremities"
          ],
          bio: "David has a background in athletic conditioning and sports rehabilitation before specializing in therapeutic foot massage and reflexology. Having studied traditional foot manipulation at the renowned Wat Pho temple in Bangkok, he excels at relieving persistent chronic heel tightness, calf cramps, and fatigue for active professionals and athletes.",
          quote: "Proper foot mechanics and reflex freedom are the true foundation of pain-free movement.",
          availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"]
        },
        {
          id: "therapist-anya-sharma",
          name: "Anya Sharma",
          role: "Holistic Bodywork & Acupressure Therapist",
          experience: "9+ Years Experience",
          avatar: "assets/images/therapists/therapist-3.jpg",
          rating: 4.92,
          reviewsCount: 265,
          languages: ["English", "Hindi"],
          qualifications: [
            "Certified Acupressure & Meridian Practitioner",
            "Holistic Aromatherapy Council Certified",
            "Ayurvedic Pada Abhyanga Specialist",
            "Reiki Master Practitioner"
          ],
          specialties: [
            "Targeted Body Reflexology & Acupressure",
            "Neck, Shoulder & Occipital Tension",
            "Aromatherapy Herbal Foot Bath",
            "Stress & Anxiety Reduction"
          ],
          bio: "Anya combines the precision of meridian acupoint therapy with the soothing flow of Ayurvedic botanical traditions. Her sessions are deeply meditative journeys that calm the sympathetic nervous system, relieve stubborn desk-worker tension in the neck and shoulders, and restore inner emotional calm.",
          quote: "True relaxation is not a luxury; it is the vital sanctuary where your nervous system resets.",
          availableDays: ["Monday", "Wednesday", "Thursday", "Saturday", "Sunday"]
        },
        {
          id: "therapist-kai-tanaka",
          name: "Kai Tanaka",
          role: "Zen Shiatsu & Relaxation Bodywork Practitioner",
          experience: "13+ Years Experience",
          avatar: "assets/images/therapists/therapist-4.jpg",
          rating: 4.97,
          reviewsCount: 380,
          languages: ["English", "Japanese"],
          qualifications: [
            "Certified Zen Shiatsu Practitioner (Tokyo)",
            "Licensed Bodywork & Myofascial Therapist",
            "Foot Reflexology Master Instructor",
            "Sound Healing & Breathwork Certified"
          ],
          specialties: [
            "Studio Signature Foot & Body Harmony",
            "Holistic Full-Body Relaxation Massage",
            "Zen Shiatsu Meridian Palpation",
            "Bamboo Stylus Pressure Techniques"
          ],
          bio: "Kai was raised in Kyoto and studied Zen Shiatsu and traditional Asian bodywork under master teachers. His practice focuses on breath-synchronized rhythm, firm yet non-invasive pressure, and deep presence. He is revered by clients for creating an immersive cocoon of serenity where time seems to stand still.",
          quote: "In stillness, every breath becomes medicine and every pressure point an invitation to let go.",
          availableDays: ["Monday", "Tuesday", "Thursday", "Friday", "Sunday"]
        }
      ];
    }
  },

  renderTherapists() {
    const container = document.getElementById('therapists-grid');
    if (!container || !this.therapists) return;

    container.innerHTML = this.therapists.map(t => `
      <div class="card-wellness p-0 overflow-hidden flex flex-col justify-between">
        <div>
          <div class="therapist-card-media">
            <img src="${t.avatar}" alt="${t.name}" class="therapist-card-photo" loading="lazy">
            <span class="badge-wellness badge-signature absolute top-3 left-3 z-10">${t.experience}</span>
          </div>

          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs uppercase tracking-wider text-muted-custom font-semibold">
                ${t.languages.join(' • ')}
              </span>
              <div class="rating-stars">
                <span>★</span>
                <span class="text-xs font-semibold text-main">${t.rating}</span>
                <span class="text-xs text-muted-custom">(${t.reviewsCount})</span>
              </div>
            </div>

            <h3 class="font-heading mb-1" style="font-size: 1.35rem;">${t.name}</h3>
            <p class="text-primary-custom text-sm font-semibold mb-3">${t.role}</p>
            <p class="text-secondary text-sm mb-4" style="line-height: 1.6;">${t.bio.slice(0, 140)}...</p>

            <div class="mb-4">
              <span class="text-xs font-bold text-main block uppercase tracking-wider mb-2">Specialties:</span>
              <div class="flex flex-wrap gap-1">
                ${t.specialties.slice(0, 3).map(s => `
                  <span class="duration-chip" style="font-size: 0.725rem; padding: 2px 8px;">${s}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-sand-light border-t flex items-center justify-between gap-2" style="border-color: var(--border-color);">
          <button type="button" class="btn-wellness btn-secondary-custom btn-sm flex-1 view-therapist-bio-btn" data-id="${t.id}">
            View Bio
          </button>
          <a href="booking.html?therapist=${t.id}" class="btn-wellness btn-primary-custom btn-sm flex-1">
            Book With
          </a>
        </div>
      </div>
    `).join('');

    // Attach click for bio modal
    const bioBtns = container.querySelectorAll('.view-therapist-bio-btn');
    bioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const therapist = this.therapists.find(t => t.id === id);
        if (therapist) {
          this.openModal(therapist);
        }
      });
    });
  },

  initModal() {
    let modal = document.getElementById('therapist-bio-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'therapist-bio-modal';
      modal.className = 'wellness-modal-backdrop';
      modal.innerHTML = `
        <div class="wellness-modal-dialog">
          <div class="wellness-modal-header">
            <h4 class="font-heading mb-0" id="modal-therapist-name">Therapist Profile</h4>
            <button type="button" class="wellness-toast-close" id="modal-close-btn" style="font-size: 1.5rem;">&times;</button>
          </div>
          <div class="wellness-modal-body" id="modal-therapist-body">
            <!-- Injected dynamically -->
          </div>
          <div class="wellness-modal-footer">
            <button type="button" class="btn-wellness btn-secondary-custom btn-sm" id="modal-cancel-btn">Close</button>
            <a href="#" id="modal-book-cta" class="btn-wellness btn-primary-custom btn-sm">Book This Practitioner</a>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeHandler = () => modal.classList.remove('show');
      modal.querySelector('#modal-close-btn').addEventListener('click', closeHandler);
      modal.querySelector('#modal-cancel-btn').addEventListener('click', closeHandler);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeHandler();
      });
    }
  },

  openModal(t) {
    const modal = document.getElementById('therapist-bio-modal');
    if (!modal) return;

    modal.querySelector('#modal-therapist-name').textContent = t.name;
    const body = modal.querySelector('#modal-therapist-body');
    body.innerHTML = `
      <div class="flex flex-col sm:flex-row gap-4 mb-6 items-center sm:items-start">
        <img src="${t.avatar}" alt="${t.name}" class="w-24 h-24 rounded-full object-cover shadow-sm flex-shrink-0" style="border: 3px solid var(--color-primary-soft);">
        <div>
          <h4 class="font-heading mb-1">${t.name}</h4>
          <p class="text-primary-custom font-semibold text-sm mb-2">${t.role} (${t.experience})</p>
          <p class="text-secondary text-sm italic mb-0">"${t.quote}"</p>
        </div>
      </div>

      <div class="mb-5">
        <h5 class="font-heading mb-2">Practice Philosophy & Biography</h5>
        <p class="text-secondary text-sm" style="line-height: 1.7;">${t.bio}</p>
      </div>

      <div class="mb-5">
        <h5 class="font-heading mb-2">Certifications & Credentials</h5>
        <ul class="flex flex-col gap-2">
          ${t.qualifications.map(q => `
            <li class="flex items-center gap-2 text-xs text-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ${q}
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="p-3 rounded-lg" style="background: var(--bg-surface-soft); border: 1px solid var(--border-color);">
        <span class="text-xs font-bold text-main block mb-1">Weekly Studio Schedule:</span>
        <span class="text-xs text-secondary">Available on ${t.availableDays.join(', ')}</span>
      </div>
    `;

    const bookCta = modal.querySelector('#modal-book-cta');
    bookCta.href = `booking.html?therapist=${t.id}`;

    modal.classList.add('show');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  TherapistsModule.init();
});

window.TherapistsModule = TherapistsModule;
