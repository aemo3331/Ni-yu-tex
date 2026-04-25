/* ===================================================================
   Main orchestration: loader, cursor, navbar, scroll reveals, filters
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Loader ---------- */
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('is-done');
  }, 1200);

  /* ---------- Custom cursor ---------- */
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (cursor && cursorDot && window.matchMedia('(min-width:901px)').matches) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      cursorDot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    });
    function loop () {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor="hover"], button, a, input, .product, .client');
      if (t) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target.closest('[data-cursor="hover"], button, a, input, .product, .client');
      if (t) cursor.classList.remove('is-hover');
    });
  }

  /* ---------- Navbar scroll state ---------- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Render products + filters ---------- */
  if (window.NiyuProducts) {
    window.NiyuProducts.renderProducts('all');

    document.querySelectorAll('#filters .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#filters .chip')
          .forEach(c => c.classList.remove('chip--active'));
        chip.classList.add('chip--active');
        window.NiyuProducts.renderProducts(chip.dataset.filter);
      });
    });
  }

  /* ---------- Scroll-reveal observer ---------- */
  const NiyuReveal = (() => {
    let observer;

    function refresh () {
      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal')
          .forEach(el => el.classList.add('is-visible'));
        return;
      }
      if (!observer) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      }
      document.querySelectorAll('.reveal:not(.is-visible)')
        .forEach(el => observer.observe(el));
    }

    return { refresh };
  })();
  window.NiyuReveal = NiyuReveal;

  // Add .reveal to several sections
  document.querySelectorAll(
    '.section-head, .about__values li, .services__node, ' +
    '.capabilities__copy, .capabilities__chip, .clients__group, ' +
    '.contact__addr'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 70}ms`;
  });

  NiyuReveal.refresh();

  /* ---------- Mobile burger (simple toggle of links) ---------- */
  const burger = document.getElementById('burgerBtn');
  const links = document.querySelector('.nav__links');
  burger?.addEventListener('click', () => {
    if (!links) return;
    const opening = links.style.display !== 'flex';
    links.style.display = opening ? 'flex' : 'none';
    if (opening) {
      Object.assign(links.style, {
        position:'fixed', top:'72px', left:'0', right:'0',
        flexDirection:'column', gap:'1.4rem',
        padding:'2rem', background:'rgba(11,13,20,.95)',
        borderBottom:'1px solid var(--line)', zIndex:'99'
      });
    }
  });
  document.querySelectorAll('.nav__links a').forEach(a =>
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width:900px)').matches && links) {
        links.style.display = 'none';
      }
    })
  );

});
