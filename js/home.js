/**
 * Reflexology & Foot Massage Studio - Homepage Interactive Features
 */

const HomeModule = {
  footZones: {
    brain: {
      title: "Head, Brain & Pituitary Gland Zone",
      location: "Tips of Big Toes and Toes 2-5",
      benefits: "Releases mental stress, clarifies thought, alleviates tension headaches, and harmonizes melatonin sleep regulation cycles.",
      tag: "Cranial Meridian"
    },
    solar: {
      title: "Solar Plexus & Diaphragm Zone",
      location: "Center of the Upper Foot Sole (Below the Ball)",
      benefits: "The master emotional tension release point. Deepens breathing volume, dissipates adrenal anxiety, and balances cortisol.",
      tag: "Emotional Calming"
    },
    spine: {
      title: "Spinal Column Reflex Ridge",
      location: "Along the Inner Medial Edge of the Foot (Heel to Big Toe)",
      benefits: "Mirrors the cervical, thoracic, lumbar, and sacral vertebrae. Eases chronic back fatigue and promotes upright posture.",
      tag: "Structural Alignment"
    },
    digestive: {
      title: "Stomach, Liver & Intestinal Zone",
      location: "Central Arch and Midfoot Region",
      benefits: "Stimulates sluggish metabolism, eases abdominal bloating, and facilitates nutrient assimilation and natural detox.",
      tag: "Metabolic Equilibrium"
    },
    pelvic: {
      title: "Pelvic & Sciatic Nerve Reflex",
      location: "Base of Heel and Calcaneus Curve",
      benefits: "Dissolves deep hip tightness, alleviates sciatic compression, and grounds circulating Qi into the earth.",
      tag: "Grounding Stability"
    }
  },

  init() {
    this.initInteractiveMeridianMap();
    this.initDemoSelector();
    this.initTreatmentFilters();
  },

  initTreatmentFilters() {
    const filterBtns = document.querySelectorAll('.treatment-filter-btn');
    const cards = document.querySelectorAll('.wellness-treatment-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  },

  initDemoSelector() {
    const selectorWrapper = document.getElementById('homeDemoSelector');
    const toggleBtn = document.getElementById('homeDemoSelectorBtn');
    const dropdownPanel = document.getElementById('homeDemoDropdownPanel');
    if (!selectorWrapper || !toggleBtn || !dropdownPanel) return;

    // Detect active page based on pathname / filename
    const path = window.location.pathname.toLowerCase();
    const href = window.location.href.toLowerCase();
    const isHome2 = path.endsWith('home-2.html') || href.includes('home-2.html');

    const optHome1 = document.getElementById('demoOptHome1');
    const optHome2 = document.getElementById('demoOptHome2');
    const labelEl = document.getElementById('homeDemoCurrentLabel');

    if (isHome2) {
      if (labelEl) labelEl.textContent = 'Home 2 – Luxury Wellness Sanctuary';
      if (optHome1) optHome1.classList.remove('active');
      if (optHome2) optHome2.classList.add('active');
    } else {
      if (labelEl) labelEl.textContent = 'Home 1 – Traditional Studio';
      if (optHome1) optHome1.classList.add('active');
      if (optHome2) optHome2.classList.remove('active');
    }

    // Toggle dropdown open/close on click
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = selectorWrapper.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when selecting an option
    const optionLinks = dropdownPanel.querySelectorAll('.home-demo-option-item');
    optionLinks.forEach(link => {
      link.addEventListener('click', () => {
        selectorWrapper.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!selectorWrapper.contains(e.target)) {
        selectorWrapper.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && selectorWrapper.classList.contains('open')) {
        selectorWrapper.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });

    // Desktop hover support
    let hoverTimeout = null;
    selectorWrapper.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 992) {
        clearTimeout(hoverTimeout);
        selectorWrapper.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    selectorWrapper.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 992) {
        hoverTimeout = setTimeout(() => {
          selectorWrapper.classList.remove('open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }, 220);
      }
    });
  },

  initInteractiveMeridianMap() {
    const buttons = document.querySelectorAll('.meridian-point-btn');
    const titleEl = document.getElementById('zone-detail-title');
    const tagEl = document.getElementById('zone-detail-tag');
    const locEl = document.getElementById('zone-detail-loc');
    const benEl = document.getElementById('zone-detail-ben');

    if (!buttons || buttons.length === 0 || !titleEl) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const zoneKey = btn.getAttribute('data-zone');
        const data = this.footZones[zoneKey];
        if (data) {
          titleEl.textContent = data.title;
          if (tagEl) tagEl.textContent = data.tag;
          if (locEl) locEl.textContent = data.location;
          if (benEl) benEl.textContent = data.benefits;
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  HomeModule.init();
});

window.HomeModule = HomeModule;
