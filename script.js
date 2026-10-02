// 1. BUSINESS CONTACT SETTINGS

const BUSINESS_EMAIL = "shriranjinin@gmail.com";


// 2. HEADER — MOBILE NAVIGATION
// Matches .menu-toggle and #navigation in index.html.

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

function closeMenu() {
  if (!menuButton || !navigation) {
    return;
  }

  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigation.classList.contains("is-open")
    ) {
      closeMenu();
      menuButton.focus();
    }
  });

  const desktopScreen = window.matchMedia("(min-width: 761px)");
  desktopScreen.addEventListener("change", closeMenu);
}


// 3. FOOTER — CURRENT COPYRIGHT YEAR
// Matches #year in the footer.


const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 4. SERVICES — SVG ICONS
// Matches the data-icon attributes on service cards.


const icons = {
  search: `
    <circle cx="10.5" cy="10.5" r="7.5" />
    <path d="m16 16 6 6" />
  `,

  phone: `
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <path d="M10 18h4" />
  `,

  target: `
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <path d="m12 12 9-9M17 3h4v4" />
  `,

  design: `
    <path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0
      1.5-3.3 2 2 0 0 1 1.5-3.3h1a3 3 0
      0 0 3-3.1A9 9 0 0 0 12 3Z" />
    <circle cx="7" cy="10" r=".7" />
    <circle cx="10" cy="7" r=".7" />
    <circle cx="15" cy="7" r=".7" />
  `,

  website: `
    <rect x="4" y="3" width="16" height="13" rx="2" />
    <path d="M2 20h20l-2-4H4Z" />
  `,

  pen: `
    <path d="m15 4 5 5M4 15 16 3a2 2 0 0 1
      3 0l2 2a2 2 0 0 1 0 3L9 20l-6 1Z" />
  `
};

document.querySelectorAll("[data-icon]").forEach((element) => {
  const iconContent = icons[element.dataset.icon] || "";

  element.innerHTML = `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      ${iconContent}
    </svg>
  `;
});


// 5. CONTACT — OPEN GMAIL WITH ENQUIRY
// Matches #contact-form and #form-status.
// This prepares a draft; the visitor sends it in Gmail.

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

function showFormStatus(message) {
  if (formStatus) {
    formStatus.textContent = message;
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const recipient = BUSINESS_EMAIL.trim();

    if (!recipient || recipient === "hello@example.com") {
      showFormStatus("Please configure your business email in script.js.");
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !service || !message) {
      showFormStatus("Please complete all fields before opening Gmail.");
      return;
    }

    const subject = `Tech Bloom website enquiry: ${service}`;

    const body = [
      "Hello Tech Bloom,",
      "",
      "I would like to enquire about your services.",
      "",
      `Name: ${name}`,
      `Contact email: ${email}`,
      `Service: ${service}`,
      "",
      "Project details:",
      message,
      "",
      "Thank you,",
      name
    ].join("\n");

    const gmailLink =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(recipient)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    showFormStatus(
      "Opening Gmail. Sign in if needed, review your enquiry and click Send."
    );

    window.location.assign(gmailLink);
  });
}


