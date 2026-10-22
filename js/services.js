/**
 * SOLE HARMONY - Services & Service Details Logic
 */

const FALLBACK_SERVICES = [
  {
    id: "traditional-foot-reflexology",
    name: "Traditional Foot Reflexology",
    category: "foot-reflexology",
    badge: "Signature Treatment",
    featured: true,
    rating: 4.95,
    reviewsCount: 248,
    shortDescription: "Traditional acupressure targeting meridian reflex zones on the soles, relieving systemic stress and restoring organ equilibrium.",
    fullDescription: "Our signature Eastern Foot Reflexology begins with a warm herbal salt foot bath infused with lemongrass and ginger. Your certified reflexologist uses precise finger, thumb, and wooden stylus pressure techniques along your foot's 7,200 nerve endings. By stimulating specific reflex zones corresponding to vital organs, glands, and the musculoskeletal system, this treatment triggers endorphin release, stimulates lymph drainage, and fosters profound whole-body homeostasis.",
    image: "assets/images/experience/foot-reflexology-experience.jpg",
    heroImage: "assets/images/experience/foot-reflexology-experience.jpg",
    durations: [
      { minutes: 30, price: 45, label: "Express Sole Relief (30m)" },
      { minutes: 45, price: 60, label: "Classic Harmony (45m)" },
      { minutes: 60, price: 75, label: "Full Meridian Balance (60m)", popular: true },
      { minutes: 90, price: 105, label: "Deep Therapeutic (90m)" }
    ],
    benefits: [
      "Alleviates plantar fascia tightness and arch discomfort",
      "Stimulates blood circulation and lymphatic drainage",
      "Promotes deep delta-wave sleep and reduces nocturnal restlessness",
      "Balances sympathetic and parasympathetic nervous systems",
      "Assists natural digestive equilibrium and tension release"
    ],
    preparation: "Please arrive 10-15 minutes prior to your session to enjoy a warm organic herbal tea. Wear comfortable, loose-fitting trousers that can be gently rolled up to the knee.",
    aftercare: "Drink 2 to 3 glasses of warm mineral water over the next few hours to flush metabolic byproducts. Avoid strenuous high-impact workouts for the rest of the day.",
    contraindications: "First trimester of pregnancy, acute deep vein thrombosis (DVT), severe foot fractures or contagious fungal conditions.",
    includedSteps: [
      "Floral foot wash & ginger-salts soak (10m)",
      "Reflex zone pressure map analysis & tactile warm-up",
      "Targeted meridian thumb-walking and pressure-point balancing",
      "Calf & lower leg lymphatic drainage stroking",
      "Warm herbal towel wrap and finishing peppermint spritz"
    ]
  },
  {
    id: "relaxing-foot-massage",
    name: "Relaxing Foot Massage",
    category: "relaxation-foot",
    badge: "Deep Relaxation",
    featured: true,
    rating: 4.88,
    reviewsCount: 192,
    shortDescription: "A soothing, rhythmic massage blending nourishing botanical oils with warm towels, gentle stretches, and calming tension strokes.",
    fullDescription: "Designed specifically for weary feet, travelers, and individuals standing for long hours. This treatment blends Swedish effleurage strokes with traditional Thai stretching techniques. We use heated organic sweet almond oil scented with lavender, chamomile, and cedarwood. The therapy concentrates on the calves, Achilles tendon, ankle rotation, and the sole arches to melt away accumulated fatigue.",
    image: "assets/images/foot-massage/relaxing-foot-massage.jpg",
    heroImage: "assets/images/foot-massage/relaxing-foot-massage.jpg",
    durations: [
      { minutes: 30, price: 40, label: "Express Revival (30m)" },
      { minutes: 45, price: 52, label: "Soothing Session (45m)" },
      { minutes: 60, price: 68, label: "Nourishing Care (60m)", popular: true },
      { minutes: 90, price: 95, label: "Extended Bliss (90m)" }
    ],
    benefits: [
      "Relieves heavy leg syndrome and standing fatigue",
      "Intensely hydrates dry heels and softens skin texture",
      "Enhances ankle flexibility and joint mobility",
      "Lowers elevated cortisol levels and encourages tranquil calm"
    ],
    preparation: "Wear loose attire. Remove ankle jewelry and watches. Please notify your therapist of any skin sensitivities or nut allergies.",
    aftercare: "Allow the nourishing botanical oils to absorb for at least 2 hours before bathing. Hydrate with room-temperature herbal infusions.",
    contraindications: "Severe varicose veins, open lesions or cuts on the lower leg.",
    includedSteps: [
      "Eucalyptus and Himalayan crystal foot bath",
      "Exfoliating bamboo rice buff for heels and soles",
      "Rhythmic heated almond oil kneading through calf and ankle",
      "Steamed lavender towel compress",
      "Cooling aloe and arnica restorative balm application"
    ]
  },
  {
    id: "full-body-reflexology",
    name: "Full-Body Reflexology",
    category: "body-reflexology",
    badge: "Meridian Harmony",
    featured: true,
    rating: 4.92,
    reviewsCount: 210,
    shortDescription: "Comprehensive acupressure across spine, neck, shoulders, and plantar meridians to dissolve deep muscular tension.",
    fullDescription: "Full-body reflexology views the human body as an integrated network of energy channels. In this treatment, certified practitioners apply precise thumb pressure and palm kneading along the Bladder meridian of the back, the Gallbladder points along the neck and shoulders, and key reflex points on the palms, feet, and skull.",
    image: "assets/images/body-massage/full-body-reflexology.jpg",
    heroImage: "assets/images/body-massage/full-body-reflexology.jpg",
    durations: [
      { minutes: 45, price: 65, label: "Targeted Upper Body (45m)" },
      { minutes: 60, price: 85, label: "Full Spinal Meridian (60m)", popular: true },
      { minutes: 90, price: 115, label: "Comprehensive Acupressure (90m)" }
    ],
    benefits: [
      "Dissolves tension headaches and occipital tightness",
      "Restores shoulder blade glide and spinal mobility",
      "Balances Qi flow through primary meridian pathways",
      "Reduces repetitive strain discomfort from computer use"
    ],
    preparation: "Wear loose, breathable cotton clothing. Can be performed clothed or with natural botanical oils according to your comfort.",
    aftercare: "Gentle stretching and warm water hydration to encourage waste elimination.",
    contraindications: "Acute spinal herniation, unmanaged severe hypertension, recent neck trauma.",
    includedSteps: [
      "Postural and tension check consultation",
      "Cervical spine and trapezius pressure release",
      "Meridian thumb-walking along dorsal spine",
      "Hand, palm, and plantar reflex zone stimulation",
      "Invigorating scalp acupressure finish"
    ]
  },
  {
    id: "head-neck-shoulder-massage",
    name: "Head, Neck & Shoulder Massage",
    category: "body-reflexology",
    badge: "Desk Worker Rescue",
    featured: true,
    rating: 4.89,
    reviewsCount: 178,
    shortDescription: "Focused relief for upper-body strain, cervical compression, and tension headaches caused by modern desk work.",
    fullDescription: "A concentrated therapeutic session addressing the primary pain points of the modern lifestyle: the occipital ridge, levator scapulae, upper trapezius, and deltoids. Heated botanical compresses soften hardened myofascial tissue before deep finger and thumb pressure releases stubborn trigger points.",
    image: "assets/images/body-massage/neck-shoulder.jpg",
    heroImage: "assets/images/body-massage/neck-shoulder.jpg",
    durations: [
      { minutes: 30, price: 42, label: "Quick Express Release (30m)" },
      { minutes: 45, price: 58, label: "Standard Realignment (45m)", popular: true },
      { minutes: 60, price: 75, label: "Deep Therapeutic Reset (60m)" }
    ],
    benefits: [
      "Directly relieves tension headaches and eye strain",
      "Unlocks restricted neck rotation and shoulder tightness",
      "Improves blood circulation to the brain for mental clarity",
      "Promotes ergonomic posture recovery"
    ],
    preparation: "Comfortable upper attire. Please tie long hair back loosely.",
    aftercare: "Perform gentle neck roll stretches throughout the evening.",
    contraindications: "Acute cervical whiplash within 72 hours, unhealed shoulder fractures.",
    includedSteps: [
      "Warm lavender shoulder wrap application",
      "Cervical traction and occipital pressure",
      "Trapezius muscle kneading with warm jojoba oil",
      "Scapular release and upper back thumb-walking",
      "Temple and scalp soothing acupressure"
    ]
  },
  {
    id: "relaxation-massage",
    name: "Relaxation Massage",
    category: "full-body",
    badge: "Holistic Renewal",
    featured: true,
    rating: 4.96,
    reviewsCount: 310,
    shortDescription: "A restorative head-to-toe session integrating long flowing strokes, warm towels, and balancing botanical aromas.",
    fullDescription: "Surrender to an uninterrupted wellness sanctuary. This treatment combines gentle Swedish gliding strokes, passive stretching, and warm organic jojoba oil infused with your choice of bergamot, ylang-ylang, or cypress. Every muscle group from your neck, back, legs, down to your feet receives mindful, rhythmic attention in our private, temperature-controlled suites.",
    image: "assets/images/experience/spa-treatment-room.jpg",
    heroImage: "assets/images/experience/spa-treatment-room.jpg",
    durations: [
      { minutes: 60, price: 85, label: "Essential Harmony (60m)" },
      { minutes: 90, price: 120, label: "Full Sanctuary (90m)", popular: true },
      { minutes: 120, price: 155, label: "Ultimate Transcendence (120m)" }
    ],
    benefits: [
      "Lowers heart rate and stimulates parasympathetic recovery",
      "Eases overall muscle fatigue and stiffness",
      "Nourishes dry skin with cold-pressed botanical oils",
      "Encourages restorative delta sleep patterns"
    ],
    preparation: "Arrive 15 minutes prior. Disrobe to your comfort level; professional modesty draping is strictly observed throughout.",
    aftercare: "Hydrate well and rest quietly after treatment. Avoid heavy meals for 2 hours.",
    contraindications: "Active infectious fever, severe varicose veins, first trimester of pregnancy.",
    includedSteps: [
      "Aromatherapy inhalation with wild lavender",
      "Full posterior body kneading from soles to neck",
      "Warm botanical towel compress on spine and feet",
      "Gentle limb stretches and joint decompression",
      "Calming facial and temple touch finish"
    ]
  },
  {
    id: "custom-wellness-session",
    name: "Custom Wellness Session",
    category: "signature-packages",
    badge: "Personalized Care",
    featured: true,
    rating: 4.98,
    reviewsCount: 265,
    shortDescription: "A tailored consultation and treatment combining foot zone reflexology with focused muscular release.",
    fullDescription: "Our most adaptable and bespoke therapy. Your session begins with a personalized diagnostic consultation where your therapist examines tension patterns, posture habits, and stress points. We then custom-blend the ideal duration ratio between traditional foot reflexology, heated basalt stones, and upper body meridian acupressure.",
    image: "assets/images/services/custom-wellness-session.jpg",
    heroImage: "assets/images/hero/service-details-hero.jpg",
    durations: [
      { minutes: 60, price: 90, label: "Custom Focus (60m)" },
      { minutes: 90, price: 125, label: "Comprehensive Bespoke (90m)", popular: true },
      { minutes: 120, price: 160, label: "Master Tailored Ritual (120m)" }
    ],
    benefits: [
      "Addresses your exact personal bodily fatigue priorities",
      "Combines foot reflexology with customized back and neck care",
      "Includes complimentary customized botanical oil blend",
      "Includes personal posture and aftercare guidance"
    ],
    preparation: "Share any specific areas of discomfort during your check-in consultation.",
    aftercare: "Relax in our tea lounge for 10-15 minutes after the session.",
    contraindications: "Please notify therapist of any medical conditions or surgeries.",
    includedSteps: [
      "Pre-session intake & pressure preference discussion",
      "Herbal foot soak & sole reflex zone examination",
      "Customized blend of foot reflexology & body acupressure",
      "Basalt heated stone or warm towel integration",
      "Therapist recommendations for daily posture & hydration"
    ]
  }
];

window.FALLBACK_SERVICES = FALLBACK_SERVICES;

const ServicesModule = {
  services: [],

  async init() {
    await this.loadData();
    this.initCatalogPage();
    this.initDetailsPage();
  },

  async loadData() {
    try {
      const res = await fetch('data/services.json');
      if (res.ok) {
        this.services = await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch services.json via HTTP, checking embedded data or window fallback', e);
    }

    // Fallback if accessed via restricted local file:// protocol
    if (!this.services || this.services.length === 0) {
      this.services = window.FALLBACK_SERVICES || [];
    }
  },

  initCatalogPage() {
    const catalogContainer = document.getElementById('services-catalog-grid');
    if (!catalogContainer) return;

    const searchInput = document.getElementById('services-search-input');
    const categoryBtns = document.querySelectorAll('.category-pill-btn');
    const countBadge = document.getElementById('services-count-badge');

    let activeCategory = 'all';
    let searchQuery = '';

    const render = () => {
      const filtered = this.services.filter(s => {
        const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
        const query = searchQuery.toLowerCase();
        const matchesSearch = !query || 
          s.name.toLowerCase().includes(query) || 
          s.shortDescription.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      });

      if (countBadge) {
        countBadge.textContent = `${filtered.length} Treatment${filtered.length === 1 ? '' : 's'} Available`;
      }

      if (filtered.length === 0) {
        catalogContainer.innerHTML = `
          <div class="col-span-full text-center py-12">
            <div class="mb-3 text-muted-custom">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h4 class="font-heading mb-2">No treatments matched your criteria</h4>
            <p class="text-secondary max-w-md mx-auto mb-4">Try clearing your search query or selecting a different therapy category.</p>
            <button type="button" class="btn-wellness btn-secondary-custom btn-sm" id="reset-filter-btn">Reset Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('reset-filter-btn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            activeCategory = 'all';
            searchQuery = '';
            if (searchInput) searchInput.value = '';
            categoryBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
            render();
          });
        }
        return;
      }

      catalogContainer.innerHTML = filtered.map(s => {
        const primaryDuration = s.durations.find(d => d.popular) || s.durations[0];
        return `
          <div class="service-card animate-fade-in">
            <div class="service-card-image">
              <img src="${s.image}" alt="${s.name}" loading="lazy">
              ${s.badge ? `<span class="badge-wellness badge-signature absolute top-3 left-3 z-10">${s.badge}</span>` : ''}
            </div>
            <div class="service-card-body">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs uppercase tracking-wider text-muted-custom font-semibold">${s.category.replace('-', ' ')}</span>
                <div class="rating-stars">
                  <span>★</span>
                  <span class="text-xs font-semibold text-main">${s.rating}</span>
                  <span class="text-xs text-muted-custom">(${s.reviewsCount})</span>
                </div>
              </div>
              <h3 class="font-heading" style="font-size: 1.35rem; margin-bottom: 0.6rem;">
                <a href="service-details.html?id=${s.id}" class="text-main">${s.name}</a>
              </h3>
              <p class="text-secondary mb-4 flex-grow" style="font-size: 0.9375rem; line-height: 1.6;">${s.shortDescription}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                ${s.benefits.slice(0, 2).map(b => `
                  <span class="duration-chip" style="font-size: 0.75rem;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ${b}
                  </span>
                `).join('')}
              </div>
            </div>
            <div class="service-card-footer">
              <div>
                <span class="text-xs text-muted-custom block">Starting from</span>
                <span class="price-display">$${primaryDuration.price}</span>
                <span class="text-xs text-muted-custom">/ ${primaryDuration.minutes}m</span>
              </div>
              <div class="flex items-center gap-2">
                <a href="service-details.html?id=${s.id}" class="btn-wellness btn-secondary-custom btn-sm">Details</a>
                <a href="booking.html?service=${s.id}&duration=${primaryDuration.minutes}" class="btn-wellness btn-primary-custom btn-sm">Book</a>
              </div>
            </div>
          </div>
        `;
      }).join('');
    };

    // Events
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        render();
      });
    }

    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category') || 'all';
        render();
      });
    });

    render();
  },

  initDetailsPage() {
    const detailsContainer = document.getElementById('service-details-content');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('id') || (this.services[0] ? this.services[0].id : null);
    const service = this.services.find(s => s.id === serviceId) || this.services[0];

    if (!service) return;

    // Update Page Title
    document.title = `${service.name} | SOLE HARMONY`;

    const breadcrumbName = document.getElementById('details-breadcrumb-name');
    if (breadcrumbName) breadcrumbName.textContent = service.name;

    // Dynamically update Hero Banner Background Image to match the treatment
    const bannerEl = document.getElementById('service-details-banner') || document.querySelector('.page-header-service-details');
    if (bannerEl) {
      const bannerBg = service.heroImage || service.image || 'assets/images/hero/service-details-hero.jpg';
      bannerEl.style.backgroundImage = `url('${bannerBg}')`;
    }

    const defaultDuration = service.durations.find(d => d.popular) || service.durations[0];
    let selectedDuration = defaultDuration;

    detailsContainer.innerHTML = `
      <div class="service-details-layout">
        <!-- Left: Story, Benefits, Journey & Protocol -->
        <div class="service-details-main">
          <div class="service-main-image-wrap">
            <img src="${service.image}" alt="${service.name}">
          </div>

          <div class="flex items-center gap-3 mb-3">
            <span class="badge-wellness badge-signature">${service.badge || 'Professional Therapy'}</span>
            <span class="text-xs font-semibold uppercase tracking-wider text-muted-custom">${service.category.replace('-', ' ')}</span>
            <div class="rating-stars ml-auto">
              <span>★</span>
              <span class="font-semibold text-main text-sm">${service.rating}</span>
              <span class="text-xs text-muted-custom">(${service.reviewsCount} verified reviews)</span>
            </div>
          </div>

          <h1 class="font-heading mb-4">${service.name}</h1>
          <p class="lead-text mb-6">${service.shortDescription}</p>
          
          <div class="mb-8">
            <h3 class="font-heading mb-3">Treatment Overview</h3>
            <p class="text-secondary" style="font-size: 1.05rem; line-height: 1.8;">${service.fullDescription}</p>
          </div>

          <!-- Benefits Grid -->
          <div class="mb-8">
            <h3 class="font-heading mb-4">Core Clinical & Wellness Benefits</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${service.benefits.map(b => `
                <div class="flex items-start gap-3 p-3 rounded-lg" style="background: var(--bg-surface); border: 1px solid var(--border-color);">
                  <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style="background: var(--color-primary-soft); color: var(--color-primary); margin-top: 2px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span class="text-sm font-medium text-main">${b}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Treatment Journey Steps -->
          <div class="mb-8">
            <h3 class="font-heading mb-4">Step-by-Step Session Journey</h3>
            <div class="treatment-steps-timeline">
              ${service.includedSteps.map((step, idx) => `
                <div class="treatment-step-item">
                  <div class="treatment-step-dot"></div>
                  <h5 class="font-heading mb-1" style="font-size: 1rem;">Phase ${idx + 1}</h5>
                  <p class="text-secondary text-sm mb-0">${step}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Preparation & Aftercare Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="card-wellness p-4">
              <h4 class="font-heading flex items-center gap-2 mb-2" style="font-size: 1.15rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Preparation Advice
              </h4>
              <p class="text-secondary text-sm mb-0">${service.preparation}</p>
            </div>
            <div class="card-wellness p-4">
              <h4 class="font-heading flex items-center gap-2 mb-2" style="font-size: 1.15rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                Aftercare Guidance
              </h4>
              <p class="text-secondary text-sm mb-0">${service.aftercare}</p>
            </div>
          </div>

          <!-- Contraindications -->
          <div class="alert-contraindications">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" stroke-width="2" class="flex-shrink-0 mt-1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <div>
              <h5 class="font-heading mb-1 text-main" style="font-size: 1rem;">Health & Medical Contraindications</h5>
              <p class="text-secondary text-sm mb-0">${service.contraindications}</p>
            </div>
          </div>
        </div>

        <!-- Right: Sticky Booking Card -->
        <div class="service-details-sidebar">
          <div class="sticky-booking-sidebar">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs uppercase tracking-wider text-muted-custom font-semibold">Reserve Experience</span>
              <span class="badge-wellness" style="background: var(--color-success-bg); color: var(--color-success);">Available Today</span>
            </div>

            <div class="mb-4">
              <span class="text-xs text-muted-custom block mb-1">Selected Treatment Fee</span>
              <div class="flex items-baseline gap-2">
                <span class="price-display" id="dynamic-price-display">$${selectedDuration.price}</span>
                <span class="text-sm text-muted-custom" id="dynamic-duration-display">for ${selectedDuration.minutes} minutes</span>
              </div>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 1.25rem 0;">

            <label class="form-label-custom mb-2">Choose Session Duration:</label>
            <div class="duration-selector-group" id="duration-radio-list">
              ${service.durations.map((d, index) => `
                <label class="duration-radio-option ${d.minutes === selectedDuration.minutes ? 'selected' : ''}" data-mins="${d.minutes}" data-price="${d.price}">
                  <div class="flex items-center gap-2">
                    <input type="radio" name="service_duration" value="${d.minutes}" ${d.minutes === selectedDuration.minutes ? 'checked' : ''}>
                    <span class="text-sm font-semibold text-main">${d.label || d.minutes + ' Minutes'}</span>
                  </div>
                  <span class="text-sm font-bold text-primary-custom">$${d.price}</span>
                </label>
              `).join('')}
            </div>

            <div class="p-3 rounded-lg mb-4" style="background: var(--bg-body); border: 1px dashed var(--border-color);">
              <div class="flex items-center gap-2 text-xs text-secondary mb-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Includes organic herbal foot bath & tea ritual
              </div>
              <div class="flex items-center gap-2 text-xs text-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Complimentary 24h cancellation guarantee
              </div>
            </div>

            <a href="booking.html?service=${service.id}&duration=${selectedDuration.minutes}" id="book-this-service-cta" class="btn-wellness btn-primary-custom w-full btn-lg mb-3">
              Book This Treatment
            </a>
            <a href="contact.html" class="btn-wellness btn-secondary-custom w-full btn-sm">
              Inquire or Call Studio
            </a>
          </div>
        </div>
      </div>
    `;

    // Dynamic duration toggle listener
    const radioOptions = detailsContainer.querySelectorAll('.duration-radio-option');
    const dynamicPrice = document.getElementById('dynamic-price-display');
    const dynamicMins = document.getElementById('dynamic-duration-display');
    const bookCta = document.getElementById('book-this-service-cta');

    radioOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        radioOptions.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const mins = parseInt(opt.getAttribute('data-mins'), 10);
        const price = parseInt(opt.getAttribute('data-price'), 10);
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        if (dynamicPrice) dynamicPrice.textContent = `$${price}`;
        if (dynamicMins) dynamicMins.textContent = `for ${mins} minutes`;
        if (bookCta) bookCta.href = `booking.html?service=${service.id}&duration=${mins}`;
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ServicesModule.init();
});

window.ServicesModule = ServicesModule;
