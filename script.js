// 🔧 GLOBAL iti variable - Fixes "iti is not defined"
let iti = null;
let phoneInput = null;

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      navLinks.classList.remove("open");
    }
  });
}

// Dynamic year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// contact form (front-end only)
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // stay on page

    // Optional: show "sending..." state
    formNote.textContent = "Sending...";
    formNote.style.color = "#555";

    try {
      const response = await fetch(contactForm.action || "https://formspree.io/f/mdkqdbyp", {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          "Accept": "application/json",
        },
      });

      if (response.ok) {
        // ✅ Success
        formNote.textContent =
          "✅ Message sent successfully! We will contact you soon.";
        formNote.style.color = "#22c55e";
        contactForm.reset();
      } else {
        // ❌ Formspree responded with an error
        let data = null;
        try {
          data = await response.json();
          console.log("Formspree error response:", data);
        } catch (parseErr) {
          console.warn("Could not parse error response JSON:", parseErr);
        }

        if (data && data.errors && data.errors.length > 0) {
          formNote.textContent = data.errors[0].message || "There was a problem sending the message.";
        } else {
          formNote.textContent =
            "There was a problem sending the message. Please try again later.";
        }
        formNote.style.color = "#f97373";
      }
    } catch (err) {
      // Network / CORS / other fetch-level error
      console.error("Network or CORS error:", err);
      formNote.textContent =
        "There was a problem sending the message. Please check your connection and try again.";
      formNote.style.color = "#f97373";
    }
  });
}

