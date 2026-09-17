/**
 * Glaucia — Interações mínimas
 * Scroll reveal, menu mobile e smooth anchor
 */

(function () {
  'use strict';

  /* ---------- Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Menu Mobile ---------- */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelectorAll('.nav__links a');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav--open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && nav.classList.contains('nav--open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
        toggle.focus();
      }
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  const hero = document.querySelector('.hero');

  if (hero) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 60) {
          hero.style.boxShadow = '0 1px 0 rgba(60,42,30,0.08)';
        } else {
          hero.style.boxShadow = 'none';
        }
      },
      { passive: true }
    );
  }

  /* ---------- Placeholder da foto ---------- */
  const heroPhoto = document.querySelector('.hero__photo');

  if (heroPhoto) {
    const img = heroPhoto.querySelector('img');

    if (img) {
      img.addEventListener('error', () => {
        heroPhoto.classList.add('hero__photo--empty');
      });

      if (img.complete && img.naturalHeight === 0) {
        heroPhoto.classList.add('hero__photo--empty');
      }
    }
  }
})();
