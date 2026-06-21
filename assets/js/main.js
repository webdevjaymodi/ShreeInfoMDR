const initPageEnhancements = (appState = {}) => {
  // ── Third-party animation setup
  if (window.AOS) {
    document.body.classList.add("aos-ready");
    AOS.init({ duration: 700, once: true, offset: 80 });
  } else {
    document.body.classList.add("aos-fallback");
  }

  // ── Navbar scroll effect
  const nav = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");
  function syncScrollState() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
    if (backToTop) backToTop.classList.toggle("show", window.scrollY > 400);
  }
  window.addEventListener("scroll", syncScrollState, { passive: true });
  syncScrollState();

  // ── Hero Slider
  if (appState.goSlide && appState.slideCount > 1) {
    setInterval(
      () => appState.goSlide((appState.currentSlide + 1) % appState.slideCount),
      5000,
    );
  }

  // ── Swiper Testimonials
  if (window.Swiper) {
    new Swiper(".testiSwiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
      },
    });
  }

  // ── Counter Animation
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = Number(el.dataset.decimals || 0);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (current >= target) clearInterval(timer);
    }, 16);
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCounter(e.target);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll(".counter").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".counter").forEach(animateCounter);
  }

  // ── Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ── Active nav link on scroll
  const sections = document.querySelectorAll('section[id], div[id="hero"]');
  window.addEventListener(
    "scroll",
    () => {
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      document.querySelectorAll(".nav-link").forEach((l) => {
        l.classList.toggle("active", l.getAttribute("href") === "#" + current);
      });
    },
    { passive: true },
  );
};

if (window.Vue) {
  const { createApp } = Vue;

  createApp({
    data() {
      return {
        currentSlide: 0,
        slideCount: 3,
        formSuccess: false,
        year: new Date().getFullYear(),
      };
    },
    methods: {
      goSlide(index) {
        this.currentSlide = index;
      },
      handleContactSubmit(event) {
        this.formSuccess = true;
        event.target.reset();
        window.setTimeout(() => {
          this.formSuccess = false;
        }, 5000);
      },
    },
    mounted() {
      initPageEnhancements(this);
    },
  }).mount("#app");
} else {
  document.body.classList.add("vue-fallback");
  initPageEnhancements();
}
