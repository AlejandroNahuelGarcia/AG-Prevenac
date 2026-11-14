document.addEventListener("DOMContentLoaded", () => {
  // Renderiza los íconos de Lucide si la librería está disponible.
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const navigationLinks = document.querySelectorAll(".nav-link, .nav-cta");

  // Menú desplegable para pantallas pequeñas.
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      menuButton.innerHTML = isOpen
        ? '<i data-lucide="x"></i>'
        : '<i data-lucide="menu"></i>';

      if (window.lucide) window.lucide.createIcons();
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
        menuButton.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  // Año automático en el pie de página.
  const yearElement = document.querySelector("#current-year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // El formulario es demostrativo: valida los campos y explica cómo conectarlo.
  const contactForm = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");

  if (contactForm && feedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      feedback.textContent =
        "¡Gracias! El diseño del formulario está listo. Para recibir consultas hay que conectarlo a un servicio de envío.";
      contactForm.reset();
    });
  }
});
