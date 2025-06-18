document.addEventListener("DOMContentLoaded", function () {
  initMobileNavigation();
  initSmoothScroll();
  updateActiveNavigation();
});

function initMobileNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-navigation");
  const menuOverlay = document.querySelector(".menu-overlay");
  const submenuParents = document.querySelectorAll(".has-submenu");

  function openMenu() {
    menuToggle.classList.add("active");
    navigation.classList.add("active");
    menuOverlay.style.display = "block";
  }

  function closeMenu() {
    menuToggle.classList.remove("active");
    navigation.classList.remove("active");
    menuOverlay.style.display = "none";
  }

  menuToggle.addEventListener("click", () => {
    navigation.classList.contains("active") ? closeMenu() : openMenu();
  });

  menuOverlay.addEventListener("click", closeMenu);

  submenuParents.forEach((parent) => {
    parent.addEventListener("click", (e) => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        parent.classList.toggle("active");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navigation.classList.contains("active")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
      submenuParents.forEach((parent) => parent.classList.remove("active"));
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight =
          document.querySelector(".site-header")?.offsetHeight || 0;
        const position = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });

        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  });
}

function updateActiveNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentHash = window.location.hash;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentHash);
  });

  if ("IntersectionObserver" in window) {
    initScrollSpy();
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentSection = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${currentSection}`
            );
          });
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "-20% 0px -20% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-navigation");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    nav.classList.toggle("open");

    const expanded =
      menuToggle.getAttribute("aria-expanded") === "true" || false;
    menuToggle.setAttribute("aria-expanded", !expanded);
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche l'envoi réel du formulaire
        form.innerHTML = '<div style="text-align:center; font-size:1.2rem; color:#232946; padding:2rem 0;">Votre demande a bien été envoyée.</div>';
    });
});
