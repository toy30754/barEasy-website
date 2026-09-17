(() => {
  'use strict';
  const header = document.querySelector('#site-header');
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const desktop = window.matchMedia('(min-width: 721px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const closeMenu = (returnFocus = false) => {
    if (!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '開啟導覽選單');
    mobileNav.hidden = true;
    header?.classList.remove('menu-is-open');
    if (returnFocus) toggle.focus();
  };
  toggle?.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      return;
    }
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '關閉導覽選單');
    mobileNav.hidden = false;
    header?.classList.add('menu-is-open');
  });
  mobileNav?.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    const hash = link.getAttribute('href');
    if (hash?.startsWith('#')) {
      const section = document.querySelector(hash);
      if (section) {
        section.setAttribute('tabindex', '-1');
        section.focus({ preventScroll: true });
        section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
      }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header') && toggle?.getAttribute('aria-expanded') === 'true') closeMenu();
  });
  header?.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!header.contains(document.activeElement)) closeMenu();
    });
  });
  desktop.addEventListener('change', (event) => { if (event.matches) closeMenu(); });

  let scheduled = false;
  const syncHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 80);
    scheduled = false;
  };
  window.addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(syncHeader);
    }
  }, { passive: true });
  syncHeader();

  if ('IntersectionObserver' in window) {
    if (!reducedMotion.matches) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove('is-pending');
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
      document.querySelectorAll('.reveal').forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add('is-pending');
        revealObserver.observe(element);
      });
    }
    const links = [...document.querySelectorAll('.desktop-nav a')];
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]:not(#top)').forEach((section) => sectionObserver.observe(section));
  }
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) document.querySelectorAll('.is-pending').forEach((element) => element.classList.remove('is-pending'));
  });
  const year = document.querySelector('#copyright-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
