/**
 * Reflexology & Foot Massage Studio - Main Script
 * Coordinates initialization of theme, language, navigation, and studio components
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update all current year spans
  const yearEls = document.querySelectorAll('.current-year');
  const curYear = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = curYear;
  });

  // Smooth scroll for anchor tags
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Image graceful fallback
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (!this.getAttribute('data-failed')) {
        this.setAttribute('data-failed', 'true');
        this.src = 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80&fit=crop';
      }
    });
  });

  // Auto-apply central studio config to DOM
  if (window.StudioConfig && typeof window.StudioConfig.bindToDOM === 'function') {
    window.StudioConfig.bindToDOM();
  }

  console.log('SOLE HARMONY Studio initialized smoothly.');
});
