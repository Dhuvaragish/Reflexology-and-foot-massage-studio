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
