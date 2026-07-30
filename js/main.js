/**
 * KRUPA PACKERS AND MOVERS - MAIN JAVASCRIPT LOGIC
 * Features: Mobile drawer, scroll reveal, typing counters, WhatsApp form redirect to 9980550889,
 * map click redirect to https://share.google/WldTOL7KFivmlS1wM, gallery filter, testimonial slider.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initCounters();
  initScrollAnimations();
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
   2. NUMERICAL COUNTER & TYPING ANIMATION
   ========================================== */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
          const suffix = counter.getAttribute('data-suffix') || '+';
          let count = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));

          const timer = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              counter.innerText = target + suffix;
              clearInterval(timer);
            } else {
              counter.innerText = count + suffix;
            }
          }, stepTime > 30 ? stepTime : 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const achievementsSection = document.querySelector('.achievements-section');
  if (achievementsSection) observer.observe(achievementsSection);
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
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================
   4. TESTIMONIAL CAROUSEL SLIDER
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
   5. CONTACT & INQUIRY FORM VALIDATION
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

      // Alert feedback and redirect to WhatsApp
      alert(`Thank you ${name}! Your inquiry details are ready. Redirecting to Krupa Packers and Movers WhatsApp (+91 9980550889)...`);
      window.open(waUrl, '_blank');
    });
  });
}

/* ==========================================
   6. INTERACTIVE MAP SECTION REDIRECT
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
   7. GALLERY MASONRY FILTER
   ========================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.classList.contains(filter)) {
          item.style.display = 'block';
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
   8. LIGHTBOX MODAL
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
   9. VIDEO MODAL POPUP
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
   10. BACK TO TOP BUTTON
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
