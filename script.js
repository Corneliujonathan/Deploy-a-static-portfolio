/* ─────────────────────────────────────────────────────────
   script.js — Portfolio Interactivity
   ───────────────────────────────────────────────────────── */

/* ─── CUSTOM CURSOR ─────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ─── MOBILE NAV TOGGLE ─────────────────────────────────── */
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ─── SCROLL REVEAL ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── PROJECT FILTER ─────────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.opacity       = match ? '1'        : '0.2';
      card.style.transform     = match ? ''         : 'scale(0.97)';
      card.style.pointerEvents = match ? ''         : 'none';
    });
  });
});

/* ─── CONTACT FORM ───────────────────────────────────────── */
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent    = message;
  toast.style.background = isError ? 'var(--accent2)' : 'var(--accent)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), isError ? 3000 : 3500);
}

function sendMessage() {
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill required fields', true);
    return;
  }

  showToast('Message sent ✓');
  ['fname', 'femail', 'fsubject', 'fmessage'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

// Expose sendMessage globally so the onclick attribute in HTML can find it
window.sendMessage = sendMessage;

/* ─── ACTIVE NAV HIGHLIGHT ON SCROLL ────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
}, { passive: true });
