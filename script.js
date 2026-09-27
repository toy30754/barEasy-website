/* Progressive enhancement only. Content, navigation and FAQ work without JS. */
(() => {
  // Disk previews use explicit local index.html files. On the web, keep the
  // original clean routes so navigation does not need an index.html redirect.
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    document.querySelectorAll('a[data-web-href]').forEach(link => {
      link.setAttribute('href', link.dataset.webHref);
    });
  }

  const header = document.querySelector('.site-header');
  if (document.body.classList.contains('home')) {
    const update = () => header.classList.toggle('scrolled', window.scrollY > 110);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  const navMenu = document.querySelector('.nav-menu');
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { navMenu.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu?.open) {
      navMenu.open = false;
      navMenu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (navMenu?.open && !navMenu.contains(event.target)) navMenu.open = false;
  });

  const dialog = document.querySelector('#menu-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const dialogImage = document.querySelector('#dialog-image');
    const title = document.querySelector('#menu-dialog-title');
    const original = document.querySelector('#dialog-original');
    let trigger = null;
    document.querySelectorAll('[data-menu-image]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        trigger = link;
        dialogImage.src = link.dataset.menuImage;
        dialogImage.alt = link.dataset.title + '原始酒單';
        title.textContent = link.dataset.title;
        original.href = link.dataset.menuImage;
        dialog.showModal();
        document.body.classList.add('dialog-is-open');
        document.querySelector('#dialog-close').focus();
      });
    });
    document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-is-open');
      trigger?.focus();
    });
  }

  const copyButton = document.querySelector('[data-copy-booking]');
  copyButton?.addEventListener('click', async () => {
    const message = document.querySelector('#booking-message');
    const status = document.querySelector('#copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(message.innerText);
      status.textContent = '已複製。請貼到 Instagram、填妥資料，再由你送出。';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(message);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = '已選取範本文字，請手動複製後貼到 Instagram。';
    }
  });
})();
