/**
 * Vanilla JS handling sidebar toggle, active item switching, sliding indicator positioning, overlay, resize and keyboard handling.
 * Extracted from YouTube tutorial by YouExtractor
 */

/* ============================================
   Dashboard Sidebar Menu - Curve Outside
   Vanilla JavaScript
   ============================================ */

(() => {
  'use strict';

  /* ---------- DOM References ---------- */
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const overlay = document.getElementById('overlay');
  const navList = document.querySelector('.nav-list');
  const navItems = document.querySelectorAll('.nav-item');
  const indicator = document.querySelector('.active-indicator');
  const mainContent = document.querySelector('.main-content');

  const MOBILE_BREAKPOINT = 768;

  /* ---------- Helpers ---------- */
  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  /* ---------- Sidebar Toggle ---------- */
  const toggleSidebar = () => {
    if (isMobile()) {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    } else {
      const isCollapsed = sidebar.classList.toggle('collapsed');
      mainContent.classList.toggle('collapsed', isCollapsed);
      menuToggle.setAttribute('aria-expanded', String(!isCollapsed));
      // Reposition indicator after width transition settles
      window.setTimeout(positionIndicator, 320);
    }
  };

  /* ---------- Close Sidebar (mobile) ---------- */
  const closeSidebar = () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  /* ---------- Active Item ---------- */
  const setActiveItem = (item) => {
    if (!item) return;

    navItems.forEach((navItem) => {
      navItem.classList.remove('active');
      navItem.removeAttribute('aria-current');
    });

    item.classList.add('active');
    item.setAttribute('aria-current', 'page');

    positionIndicator();
  };

  /* ---------- Sliding Indicator Position ---------- */
  const positionIndicator = () => {
    if (!indicator) return;

    const activeItem = document.querySelector('.nav-item.active');
    if (!activeItem) {
      indicator.style.opacity = '0';
      return;
    }

    // Hide the sliding indicator when the sidebar is collapsed on desktop,
    // since the curve effect is disabled in icon-rail mode.
    if (!isMobile() && sidebar.classList.contains('collapsed')) {
      indicator.style.opacity = '0';
      return;
    }

    const listRect = navList.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const top = itemRect.top - listRect.top;

    indicator.style.top = `${top}px`;
    indicator.style.height = `${itemRect.height}px`;
    indicator.style.opacity = '0'; // visual handled by .active item; keep as fallback
    sidebar.classList.add('has-indicator');
  };

  /* ---------- Event Listeners ---------- */
  menuToggle.addEventListener('click', toggleSidebar);

  overlay.addEventListener('click', closeSidebar);

  // Event delegation for nav items
  navList.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    const item = e.target.closest('.nav-item');
    if (!item) return;

    if (link) e.preventDefault();

    setActiveItem(item);

    if (isMobile()) closeSidebar();
  });

  // Reset mobile state on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (!isMobile()) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', String(!sidebar.classList.contains('collapsed')));
      } else {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('collapsed');
        menuToggle.setAttribute('aria-expanded', String(sidebar.classList.contains('open')));
      }
      positionIndicator();
    }, 150);
  });

  // Escape key closes mobile sidebar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
      menuToggle.focus();
    }
  });

  /* ---------- Initialize ---------- */
  const init = () => {
    const initialActive = document.querySelector('.nav-item.active') || navItems[0];
    if (initialActive) setActiveItem(initialActive);

    // Ensure aria-expanded reflects initial state
    menuToggle.setAttribute('aria-expanded', String(!isMobile() && !sidebar.classList.contains('collapsed')));

    // Position indicator after fonts/layout settle
    window.setTimeout(positionIndicator, 100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
