/**
 * KRUPA PACKERS AND MOVERS - MAIN JAVASCRIPT LOGIC
 * Features: Mobile drawer, scroll reveal animations, counting mode numerical counters,
 * WhatsApp form redirect to 9980550889, interactive Quick Quote Popup Modal,
 * map click redirect to https://share.google/WldTOL7KFivmlS1wM, gallery filter, testimonial slider.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initCounters();
  initScrollAnimations();
  initQuickQuoteModal();
  initTestimonialSlider();
  initFormValidation();
  initMapRedirect();
  initGalleryFilter();
  initLightbox();
  initVideoModal();
  initBackToTop();
});

/* ==========================================
   1. MOBILE DRAWER NAVIGATION
   ========================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawerClose = document.querySelector('.drawer-close');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');

  if (!hamburgerBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

/* ==========================================
   2. NUMERICAL COUNTER & ANIMATED COUNTING MODE
   ========================================== */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target') || counter.innerText.replace(/[^0-9]/g, '')) || 0;
    const suffix = counter.getAttribute('data-suffix') || '+';
    const prefix = counter.getAttribute('data-prefix') || '';
    const duration = 2200; // 2.2 seconds total animation time
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out cubic function for smooth decelerating count
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOutProgress * target);

      // Format number with commas (e.g., 10,000)
      const formattedVal = currentVal.toLocaleString('en-IN');
      counter.innerText = prefix + formattedVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        counter.innerText = prefix + target.toLocaleString('en-IN') + suffix;
      }
    }

    requestAnimationFrame(updateNumber);
  }

  const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach(c => animateCounter(c));
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const achievementsSections = document.querySelectorAll('.achievements-section, .stats-section, .about-highlights-wrapper');
  if (achievementsSections.length) {
    achievementsSections.forEach(section => observer.observe(section));
  } else {
    // Fallback: observe counter elements directly
    statNumbers.forEach(c => {
      const singleObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, observerOptions);
      singleObserver.observe(c);
    });
  }
}

/* ==========================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================
   4. INTERACTIVE QUICK QUOTE POPUP MODAL
   ========================================== */
function initQuickQuoteModal() {
  const modal = document.querySelector('.quote-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.quote-modal-close');
  const triggerBtns = document.querySelectorAll('[data-open-quote], .btn-open-quote, .floating-quote-btn');
  const form = modal.querySelector('.quick-quote-modal-form');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Automatic popup trigger after 5 seconds on initial session visit
  if (!sessionStorage.getItem('krupa_quote_popup_shown')) {
    setTimeout(() => {
      if (!modal.classList.contains('active')) {
        openModal();
        sessionStorage.setItem('krupa_quote_popup_shown', 'true');
      }
    }, 4500);
  }

  // Handle Popup Form Submission directly to WhatsApp
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="popup_name"]')?.value || 'Valued Customer';
      const phone = form.querySelector('[name="popup_phone"]')?.value || '';
      const service = form.querySelector('[name="popup_service"]')?.value || 'Relocation';
      const from = form.querySelector('[name="popup_from"]')?.value || '';
      const to = form.querySelector('[name="popup_to"]')?.value || '';

      let waMessage = `*Quick Quote Request - Krupa Packers & Movers*%0A`;
      waMessage += `*Name:* ${encodeURIComponent(name)}%0A`;
      waMessage += `*Phone:* ${encodeURIComponent(phone)}%0A`;
      waMessage += `*Service:* ${encodeURIComponent(service)}%0A`;
      if (from) waMessage += `*From:* ${encodeURIComponent(from)}%0A`;
      if (to) waMessage += `*To:* ${encodeURIComponent(to)}%0A`;
      waMessage += `*Status:* Urgent Quote Requested via Web Popup`;

      const targetPhoneNumber = "9980550889";
      const waUrl = `https://wa.me/91${targetPhoneNumber}?text=${waMessage}`;

      closeModal();
      window.open(waUrl, '_blank');
      form.reset();
    });
  }
}

/* ==========================================
   5. TESTIMONIAL CAROUSEL SLIDER
   ========================================== */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.slider-controls .dot');
  if (!track || !dots.length) return;

  let currentIndex = 0;
  const slideCount = dots.length;

  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-play every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount;
    goToSlide(currentIndex);
  }, 5000);
}

/* ==========================================
   6. CONTACT & INQUIRY FORM VALIDATION
   Redirects directly to WhatsApp (9980550889)
   ========================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('.krupa-inquiry-form');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value || 'Valued Customer';
      const phone = form.querySelector('[name="phone"]')?.value || 'Not provided';
      const service = form.querySelector('[name="service"]')?.value || 'Relocation Services';
      const from = form.querySelector('[name="from_city"]')?.value || '';
      const to = form.querySelector('[name="to_city"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value || 'Please send me a free moving quote.';

      // Construct formatted WhatsApp message text
      let waMessage = `*New Relocation Inquiry - Krupa Packers & Movers*%0A`;
      waMessage += `*Name:* ${encodeURIComponent(name)}%0A`;
      waMessage += `*Phone:* ${encodeURIComponent(phone)}%0A`;
      waMessage += `*Service Requested:* ${encodeURIComponent(service)}%0A`;
      if (from) waMessage += `*Moving From:* ${encodeURIComponent(from)}%0A`;
      if (to) waMessage += `*Moving To:* ${encodeURIComponent(to)}%0A`;
      waMessage += `*Message:* ${encodeURIComponent(message)}`;

      const targetPhoneNumber = "9980550889";
      const waUrl = `https://wa.me/91${targetPhoneNumber}?text=${waMessage}`;

      window.open(waUrl, '_blank');
      form.reset();
    });
  });
}

/* ==========================================
   7. INTERACTIVE MAP SECTION REDIRECT
   ========================================== */
function initMapRedirect() {
  const mapContainers = document.querySelectorAll('.map-container');
  const googleMapUrl = "https://share.google/WldTOL7KFivmlS1wM";

  mapContainers.forEach(container => {
    container.addEventListener('click', () => {
      window.open(googleMapUrl, '_blank');
    });
  });
}

/* ==========================================
   8. GALLERY & PORTFOLIO FILTER
   ========================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn, .portfolio-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-card-box');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'flex';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });
}

/* ==========================================
   9. LIGHTBOX MODAL
   ========================================== */
function initLightbox() {
  const modal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const triggers = document.querySelectorAll('[data-lightbox]');

  if (!modal || !lightboxImg) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('href') || trigger.querySelector('img')?.src;
      if (imgSrc) {
        lightboxImg.src = imgSrc;
        modal.classList.add('active');
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ==========================================
   10. VIDEO MODAL POPUP
   ========================================== */
function initVideoModal() {
  const videoModal = document.querySelector('.video-modal');
  const videoBtns = document.querySelectorAll('.hero-video-btn, .btn-watch-video');
  const iframe = videoModal?.querySelector('iframe');

  if (!videoModal) return;

  videoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (iframe) {
        iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; // Sample moving showcase video
      }
      videoModal.classList.add('active');
    });
  });

  videoModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    if (iframe) iframe.src = "";
  });
}

/* ==========================================
   11. BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
  const backBtn = document.querySelector('.back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

