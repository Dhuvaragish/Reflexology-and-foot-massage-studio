/**
 * Sole Harmony - Reflexology & Foot Massage Studio
 * Pricing & Interactive Service Cards Module
 */

const PricingModule = {
  pricingData: null,

  async init() {
    this.initInteractiveCards();
    this.bindLanguageChanges();
    await this.loadData();
    this.renderLegacyGrids();
  },

  async loadData() {
    try {
      const res = await fetch('data/pricing.json');
      if (res.ok) {
        this.pricingData = await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch pricing.json, using fallback markup.', e);
    }
  },

  /**
   * Interactive duration and price selection for service cards
   */
  initInteractiveCards() {
    const cards = document.querySelectorAll('.pricing-service-card');
    if (!cards || cards.length === 0) return;

    cards.forEach(card => {
      const pills = card.querySelectorAll('.duration-option-pill');
      const priceDisplay = card.querySelector('.js-card-price');
      const durationDisplay = card.querySelector('.js-card-duration');
      const bookBtn = card.querySelector('.pricing-card-btn');
      const serviceId = card.getAttribute('data-service-id');

      pills.forEach((pill, idx) => {
        // Click event
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          this.selectDuration(card, pill, pills, priceDisplay, durationDisplay, bookBtn, serviceId);
        });

        // Keyboard navigation (Enter / Space / Arrow keys)
        pill.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.selectDuration(card, pill, pills, priceDisplay, durationDisplay, bookBtn, serviceId);
          } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIdx = (idx + 1) % pills.length;
            pills[nextIdx].focus();
            this.selectDuration(card, pills[nextIdx], pills, priceDisplay, durationDisplay, bookBtn, serviceId);
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIdx = (idx - 1 + pills.length) % pills.length;
            pills[prevIdx].focus();
            this.selectDuration(card, pills[prevIdx], pills, priceDisplay, durationDisplay, bookBtn, serviceId);
          }
        });
      });

      // Validation on booking button click
      if (bookBtn) {
        bookBtn.addEventListener('click', (e) => {
          const activePill = card.querySelector('.duration-option-pill.active');
          if (!activePill) {
            // Pick default popular or first pill
            const defaultPill = card.querySelector('.duration-option-pill[data-popular="true"]') || pills[0];
            if (defaultPill) {
              this.selectDuration(card, defaultPill, pills, priceDisplay, durationDisplay, bookBtn, serviceId);
            }
          }
        });
      }
    });
  },

  selectDuration(card, selectedPill, allPills, priceDisplay, durationDisplay, bookBtn, serviceId) {
    if (!selectedPill) return;

    // Update active state
    allPills.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-checked', 'false');
    });

    selectedPill.classList.add('active');
    selectedPill.setAttribute('aria-checked', 'true');

    const duration = selectedPill.getAttribute('data-duration');
    const price = selectedPill.getAttribute('data-price');

    // Update prominent price display
    if (priceDisplay) {
      priceDisplay.textContent = price;
    }

    // Update duration label (100% English in both LTR & RTL)
    if (durationDisplay) {
      durationDisplay.textContent = `/ ${duration} min session`;
    }

    // Update booking button URL
    if (bookBtn && serviceId) {
      bookBtn.setAttribute('href', `booking.html?service=${encodeURIComponent(serviceId)}&duration=${encodeURIComponent(duration)}`);
      bookBtn.setAttribute('data-selected-duration', duration);
      bookBtn.setAttribute('data-selected-price', price);
    }
  },

  bindLanguageChanges() {
    window.addEventListener('directionChanged', () => {
      // Refresh duration labels on direction toggle (always English)
      const cards = document.querySelectorAll('.pricing-service-card');
      cards.forEach(card => {
        const activePill = card.querySelector('.duration-option-pill.active');
        const durationDisplay = card.querySelector('.js-card-duration');
        if (activePill && durationDisplay) {
          const duration = activePill.getAttribute('data-duration');
          durationDisplay.textContent = `/ ${duration} min session`;
        }
      });
    });
  },

  renderLegacyGrids() {
    // Backwards compatibility for any optional containers
    const treatmentsContainer = document.getElementById('pricing-treatments-list');
    const packagesContainer = document.getElementById('pricing-packages-grid');
    const addonsContainer = document.getElementById('pricing-addons-grid');

    if (!this.pricingData) return;

    if (treatmentsContainer && this.pricingData.services) {
      // If someone injects this container dynamically
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PricingModule.init();
});

window.PricingModule = PricingModule;
