interface NavOptions {
  hideOnScroll?: boolean;
  hideAfter?: number;
  showAtTop?: boolean;
  hiddenClass?: string;
}

const NAV_DEFAULTS: Required<NavOptions> = {
  hideOnScroll: true,
  hideAfter: 80,
  showAtTop: true,
  hiddenClass: "-translate-y-full",
};

function initNav(userOptions = {}) {
  const options = { ...NAV_DEFAULTS, ...userOptions };

  const nav = document.getElementById("site-nav");
  if (!nav || !options.hideOnScroll) return;

  const navElement = nav;

  let lastScrollY = window.scrollY;
  let accumulatedDownScroll = 0;

  function onScroll() {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    // Always visible near top
    if (options.showAtTop && currentScrollY < options.hideAfter) {
      navElement.classList.remove(options.hiddenClass);
      accumulatedDownScroll = 0;
      lastScrollY = currentScrollY;
      return;
    }

    // Scrolling down
    if (delta > 0) {
      accumulatedDownScroll += delta;
      if (accumulatedDownScroll >= options.hideAfter) {
        navElement.classList.add(options.hiddenClass);
      }
    }

    // Scrolling up
    if (delta < 0) {
      navElement.classList.remove(options.hiddenClass);
      accumulatedDownScroll = 0;
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", onScroll);

  // Cleanup for SPAs / reuse
  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}

// MOBILE NAV BUTTON BEHAVIOUR
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  const toggleMenu = () => {
    menuBtn?.classList.toggle("open");
    mobileMenu?.classList.toggle("-translate-x-full");
    mobileMenu?.classList.toggle("opacity-0");
    document.body.classList.toggle("overflow-hidden");
  };

  menuBtn?.addEventListener("click", toggleMenu);
}

export function initNavigation() {
  initNav();

  initMobileMenu();
}
