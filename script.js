// contact form

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();

    const email = document.getElementById("email")?.value.trim();

    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");

      return;
    }

    alert("Thank you, " + name + "! Your message has been sent.");

    contactForm.reset();
  });
}

// hero button

const heroButton = document.querySelector(".hero button");

if (heroButton) {
  heroButton.addEventListener("click", () => {
    const productsSection = document.querySelector(".products");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
}
