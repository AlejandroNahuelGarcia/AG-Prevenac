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

  // Envío real de consultas mediante FormSubmit (AJAX).
  const contactForm = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");

  if (contactForm && feedback) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const emailField = contactForm.querySelector('[name="Email"]');
      const replyToField = contactForm.querySelector('#replyto-field');
      if (replyToField && emailField) replyToField.value = emailField.value;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Enviando consulta...";
      }
      feedback.className = "form-feedback";
      feedback.textContent = "Estamos enviando tu consulta...";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" }
        });
        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "No se pudo enviar el mensaje.");
        }

        feedback.classList.add("is-success");
        feedback.textContent = "¡Gracias! Tu consulta fue enviada. AG PREVENAC se pondrá en contacto con vos.";
        contactForm.reset();
      } catch (error) {
        feedback.classList.add("is-error");
        feedback.textContent = "No pudimos enviar la consulta. Por favor, escribinos a info@agprevenac.com o contactanos por WhatsApp.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = 'Enviar consulta <i data-lucide="arrow-right"></i>';
          if (window.lucide) window.lucide.createIcons();
        }
      }
    });
  }
});
