function setupMobileNavigation() {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.getElementById("mainNav");

  if (!toggleButton || !nav) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });
}

function setActiveNavigationLink() {
  const page = document.body.dataset.page;
  if (!page) {
    return;
  }

  const links = document.querySelectorAll(".main-nav a");
  links.forEach((link) => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active-link");
    }
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function revealSections() {
  const sections = document.querySelectorAll("main section");
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 80}ms`;
    section.classList.add("reveal");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
  setActiveNavigationLink();
  setCurrentYear();
  revealSections();
});
