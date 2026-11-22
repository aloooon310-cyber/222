'use strict';

// ---------- Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Scroll progress ----------
const progress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (progress) progress.style.width = (winScroll / height * 100) + '%';
});

// ---------- Back to top ----------
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- Theme toggle ----------
const themeBtn = document.getElementById('themeBtn');
const htmlEl = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) htmlEl.setAttribute('data-theme', savedTheme);
else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) htmlEl.setAttribute('data-theme', 'dark');
}
themeBtn.textContent = htmlEl.getAttribute('data-theme') === 'dark' ? '☀' : '☾';
themeBtn.addEventListener('click', () => {
  const isDark = htmlEl.getAttribute('data-theme') === 'dark';
  htmlEl.removeAttribute('data-theme');
  if (!isDark) htmlEl.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', htmlEl.getAttribute('data-theme') || 'light');
  themeBtn.textContent = htmlEl.getAttribute('data-theme') === 'dark' ? '☀' : '☾';
});

// ---------- Language toggle ----------
const langBtn = document.getElementById('langBtn');
let isArabic = true;
const savedLang = localStorage.getItem('lang');
if (savedLang === 'en') { isArabic = false; applyLang(false); }
langBtn.addEventListener('click', () => {
  isArabic = !isArabic;
  applyLang(isArabic);
  localStorage.setItem('lang', isArabic ? 'ar' : 'en');
});
function applyLang(ar) {
  const html = document.documentElement;
  html.lang = ar ? 'ar' : 'en';
  html.dir = ar ? 'rtl' : 'ltr';
  langBtn.textContent = ar ? 'AR' : 'EN';
  // Swap hero title order for English
  const title = document.querySelector('.hero-title');
  const eyebrow = document.querySelector('.hero-eyebrow');
  if (!title) return;
  if (ar) {
    eyebrow.textContent = 'ANAA BASHIR · CREATIVE PORTFOLIO';
    eyebrow.className = 'hero-eyebrow ltr-dir';
    title.innerHTML = 'ANAA BASHIR<br><span class="accent">Creative Designer &amp; Digital Experience Creator</span>';
    document.querySelector('.hero-subtitle').innerHTML =
      'أحوّل الأفكار إلى تجارب رقمية مميزة.<br>أصمم مواقع إلكترونية فاخرة، عروضًا تقديمية تفاعلية، وتجارب بصرية تجمع بين الإبداع والاحترافية.';
  } else {
    eyebrow.textContent = 'CREATIVE PORTFOLIO · ANAA BASHIR';
    eyebrow.className = 'hero-eyebrow';
    title.innerHTML = 'Creative Designer &amp; Digital Experience Creator<br><span class="accent">ANAA BASHIR</span>';
    document.querySelector('.hero-subtitle').innerHTML =
      'I turn ideas into distinctive digital experiences.<br>I design luxury websites, interactive presentations, and visual experiences that combine creativity and professionalism.';
  }
}

// ---------- Mobile menu ----------
const mobileBtn = document.getElementById('mobileMenuBtn');
const navbar = document.getElementById('navbar');
mobileBtn.addEventListener('click', () => {
  navbar.classList.toggle('open');
  mobileBtn.textContent = navbar.classList.contains('open') ? '✕' : '☰';
});

// ---------- Scroll reveal ----------
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => observer.observe(el));

// ---------- Contact form ----------
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
    if (!name || !email || !message) {
      alert('يرجى تعبئة جميع الحقول.');
      return;
    }
    alert('شكراً ' + name + '، تم استلام رسالتك. يرجى ربط النموذج بخدمة إرسال حتى تصل الرسالة فعلياً.');
    contactForm.reset();
  });
}
