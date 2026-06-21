// ── Init AOS
AOS.init({ duration: 700, once: true, offset: 80 });

// ── Navbar scroll effect
const nav = document.getElementById("mainNav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
  document
    .getElementById("backToTop")
    .classList.toggle("show", window.scrollY > 400);
});

// ── Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".hero-dot");
function goSlide(n) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = n;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => goSlide(index));
});
setInterval(() => goSlide((currentSlide + 1) % slides.length), 5000);

// ── Swiper Testimonials
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

// ── Counter Animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}
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

// ── Contact form
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.classList.remove("d-none");
    e.target.reset();
    setTimeout(() => formSuccess.classList.add("d-none"), 5000);
  });
}

// ── Footer year
document.getElementById("yr").textContent = new Date().getFullYear();

// ── Active nav link on scroll
const sections = document.querySelectorAll('section[id], div[id="hero"]');
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll(".nav-link").forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === "#" + current);
  });
});
