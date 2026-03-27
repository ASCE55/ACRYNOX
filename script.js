/* ─────────────────────────────────────────
   ACRYNOX — script.js
───────────────────────────────────────── */

/* ── CUSTOM CURSOR ── */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

if (dot && ring) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = document.querySelectorAll(
    'a, button, .service-card, .portfolio-item, .contact-card, .btn'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
}

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ── */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── STAT COUNTER ── */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statSection = document.querySelector('.stats');
let statsAnimated = false;
const statsObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
}, { threshold: 0.3 });
if (statSection) statsObs.observe(statSection);

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--white)'
      : '';
  });
}, { passive: true });

/* ── SUBTLE PARALLAX ON HERO ORBS ── */
document.addEventListener('mousemove', e => {
  const orb1 = document.querySelector('.orb1');
  const orb2 = document.querySelector('.orb2');
  if (!orb1 || !orb2) return;
  const rx = (e.clientX / window.innerWidth  - .5) * 30;
  const ry = (e.clientY / window.innerHeight - .5) * 30;
  orb1.style.transform = `translate(${rx * .6}px, ${ry * .6}px) scale(1)`;
  orb2.style.transform = `translate(${-rx * .4}px, ${-ry * .4}px) scale(1)`;
});

/* ── GLITCH TITLE EFFECT (occasional) ── */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  setInterval(() => {
    if (Math.random() > 0.85) {
      heroTitle.style.transform = `skewX(${(Math.random()-.5)*2}deg)`;
      setTimeout(() => heroTitle.style.transform = '', 80);
    }
  }, 3000);
}
