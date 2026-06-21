export function initPageEnhancements() {
  const cleanup = [];

  if (window.AOS) {
    document.body.classList.add("aos-ready");
    window.AOS.init({ duration: 700, once: true, offset: 80 });
  } else {
    document.body.classList.add("aos-fallback");
  }

  const nav = document.getElementById("mainNav");
  const backToTop = document.getElementById("backToTop");
  const syncScrollState = () => {
    nav?.classList.toggle("scrolled", window.scrollY > 60);
    backToTop?.classList.toggle("show", window.scrollY > 400);
  };
  window.addEventListener("scroll", syncScrollState, { passive: true });
  cleanup.push(() => window.removeEventListener("scroll", syncScrollState));
  syncScrollState();

  let currentSlide = 0;
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  const goSlide = (nextSlide) => {
    if (!slides.length || !dots.length) return;
    slides[currentSlide]?.classList.remove("active");
    dots[currentSlide]?.classList.remove("active");
    dots[currentSlide]?.setAttribute("aria-current", "false");
    currentSlide = nextSlide;
    slides[currentSlide]?.classList.add("active");
    dots[currentSlide]?.classList.add("active");
    dots[currentSlide]?.setAttribute("aria-current", "true");
  };
  dots.forEach((dot, index) => {
    const onClick = () => goSlide(index);
    dot.addEventListener("click", onClick);
    cleanup.push(() => dot.removeEventListener("click", onClick));
  });
  const sliderTimer =
    slides.length > 1
      ? window.setInterval(
          () => goSlide((currentSlide + 1) % slides.length),
          5000,
        )
      : null;
  if (sliderTimer) cleanup.push(() => window.clearInterval(sliderTimer));

  let swiper;
  if (window.Swiper) {
    swiper = new window.Swiper(".testiSwiper", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: { 768: { slidesPerView: 2 } },
    });
    cleanup.push(() => swiper?.destroy?.(true, true));
  }

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const decimals = Number(el.dataset.decimals || 0);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = window.setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      if (current >= target) window.clearInterval(timer);
    }, 16);
    cleanup.push(() => window.clearInterval(timer));
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll(".counter").forEach((el) => observer.observe(el));
    cleanup.push(() => observer.disconnect());
  } else {
    document.querySelectorAll(".counter").forEach(animateCounter);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const onClick = (event) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    };
    anchor.addEventListener("click", onClick);
    cleanup.push(() => anchor.removeEventListener("click", onClick));
  });

  const form = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  if (form && formSuccess) {
    const onSubmit = (event) => {
      event.preventDefault();
      formSuccess.classList.remove("d-none");
      event.target.reset();
      window.setTimeout(() => formSuccess.classList.add("d-none"), 5000);
    };
    form.addEventListener("submit", onSubmit);
    cleanup.push(() => form.removeEventListener("submit", onSubmit));
  }

  const yearEl = document.getElementById("yr");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const sections = Array.from(
    document.querySelectorAll('section[id], div[id="hero"]'),
  );
  const syncActiveLink = () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 100) current = section.id;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`,
      );
    });
  };
  window.addEventListener("scroll", syncActiveLink, { passive: true });
  cleanup.push(() => window.removeEventListener("scroll", syncActiveLink));

  return () => cleanup.forEach((fn) => fn());
}
