/**
 * Reflexology & Foot Massage Studio - Services & Service Details Logic
 */

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
    document.title = `${service.name} | Solace & Sole Reflexology`;

    const breadcrumbName = document.getElementById('details-breadcrumb-name');
    if (breadcrumbName) breadcrumbName.textContent = service.name;

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
