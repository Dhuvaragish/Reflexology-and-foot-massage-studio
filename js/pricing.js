/**
 * Reflexology & Foot Massage Studio - Pricing & Packages Logic
 */

const PricingModule = {
  pricingData: null,

  async init() {
    await this.loadData();
    this.renderPricingPage();
  },

  async loadData() {
    try {
      const res = await fetch('data/pricing.json');
      if (res.ok) {
        this.pricingData = await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch pricing.json, using fallback data', e);
    }
  },

  renderPricingPage() {
    const treatmentsContainer = document.getElementById('pricing-treatments-list');
    const packagesContainer = document.getElementById('pricing-packages-grid');
    const addonsContainer = document.getElementById('pricing-addons-grid');

    if (!this.pricingData) return;

    // Render Treatment Categories
    if (treatmentsContainer && this.pricingData.services) {
      treatmentsContainer.innerHTML = this.pricingData.services.map(category => `
        <div class="mb-10">
          <div class="flex items-center gap-3 mb-6">
            <h3 class="font-heading mb-0" style="font-size: 1.5rem;">${category.category}</h3>
            <span class="flex-grow h-px" style="background: var(--border-color);"></span>
          </div>

          <div class="flex flex-col gap-4">
            ${category.items.map(item => `
              <div class="card-wellness p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex-grow max-w-xl">
                  <h4 class="font-heading mb-1" style="font-size: 1.2rem;">
                    <a href="service-details.html?id=${item.serviceId}" class="text-main">${item.name}</a>
                  </h4>
                  <p class="text-secondary text-sm mb-0">${item.description}</p>
                </div>

                <div class="flex items-center flex-wrap gap-2 md:gap-4 flex-shrink-0">
                  ${item.durations.map(d => `
                    <div class="text-center p-2 rounded-lg ${d.popular ? 'border-primary' : ''}" style="background: var(--bg-body); border: 1px solid ${d.popular ? 'var(--color-primary)' : 'var(--border-color)'}; min-width: 85px;">
                      <span class="text-xs text-muted-custom block">${d.time}</span>
                      <span class="font-bold text-main" style="font-size: 1.15rem;">$${d.price}</span>
                      ${d.popular ? '<span class="badge-wellness" style="font-size: 0.65rem; padding: 2px 4px; display:block; margin-top:2px;">Popular</span>' : ''}
                    </div>
                  `).join('')}

                  <a href="booking.html?service=${item.serviceId}" class="btn-wellness btn-primary-custom btn-sm">
                    Book
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    // Render Packages
    if (packagesContainer && this.pricingData.packages) {
      packagesContainer.innerHTML = this.pricingData.packages.map(pkg => `
        <div class="card-wellness flex flex-col justify-between ${pkg.popular ? 'border-primary' : ''}" style="border: ${pkg.popular ? '2px solid var(--color-primary)' : '1px solid var(--border-color)'};">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="badge-wellness ${pkg.popular ? 'badge-popular' : 'badge-signature'}">${pkg.badge}</span>
              ${pkg.popular ? '<span class="text-xs uppercase font-bold text-primary-custom tracking-wider">Most Recommended</span>' : ''}
            </div>

            <h3 class="font-heading mb-2" style="font-size: 1.45rem;">${pkg.name}</h3>
            <p class="text-secondary text-sm mb-6">${pkg.description}</p>

            <div class="flex items-baseline gap-2 mb-6">
              <span class="font-heading font-bold text-primary-custom" style="font-size: 2.5rem;">$${pkg.price}</span>
              ${pkg.originalPrice ? `<span class="text-muted-custom text-sm line-through">$${pkg.originalPrice}</span>` : ''}
              ${pkg.period ? `<span class="text-muted-custom text-sm">${pkg.period}</span>` : ''}
            </div>

            <ul class="flex flex-col gap-3 mb-8">
              ${pkg.features.map(f => `
                <li class="flex items-start gap-3 text-sm text-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" class="flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <a href="booking.html?package=${pkg.id}" class="btn-wellness ${pkg.popular ? 'btn-primary-custom' : 'btn-secondary-custom'} w-full">
            Reserve Package
          </a>
        </div>
      `).join('');
    }

    // Render Add-ons
    if (addonsContainer && this.pricingData.addons) {
      addonsContainer.innerHTML = this.pricingData.addons.map(addon => `
        <div class="p-4 rounded-xl flex items-center justify-between gap-4" style="background: var(--bg-surface); border: 1px solid var(--border-color);">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <h5 class="font-heading mb-0 text-main" style="font-size: 1.05rem;">${addon.name}</h5>
              <span class="duration-chip" style="font-size: 0.75rem;">${addon.duration}</span>
            </div>
            <p class="text-secondary text-xs mb-0">${addon.description}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="font-bold text-primary-custom block" style="font-size: 1.25rem;">+$${addon.price}</span>
            <span class="text-xs text-muted-custom">add to session</span>
          </div>
        </div>
      `).join('');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PricingModule.init();
});

window.PricingModule = PricingModule;
