const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");
const bookingForm = document.getElementById("bookingForm");
const formSuccess = document.getElementById("formSuccess");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* Reveal animation */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* Count-up animation */
const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(easedProgress * target);

    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(animateCounter);
      }
    });
  },
  {
    threshold: 0.4
  }
);

if (counters.length > 0) {
  counterObserver.observe(counters[0]);
}

/* Mentor filter */
const filterButtons = document.querySelectorAll(".filter-btn");
const mentorCards = document.querySelectorAll(".mentor-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedMajor = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    mentorCards.forEach((card) => {
      const cardMajor = card.dataset.major;

      if (selectedMajor === "all" || selectedMajor === cardMajor) {
        card.style.display = "block";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 40);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(16px)";

        setTimeout(() => {
          card.style.display = "none";
        }, 180);
      }
    });
  });
});

/* Demo booking form */
bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const bookingData = Object.fromEntries(formData.entries());

  /*
    Front-end demo:
    This saves the booking request to localStorage only.
    Later, you can replace this with Supabase/Firebase.
  */
  const savedBookings = JSON.parse(localStorage.getItem("fvcnBookings")) || [];
  savedBookings.push({
    ...bookingData,
    status: "Pending",
    createdAt: new Date().toISOString()
  });

  localStorage.setItem("fvcnBookings", JSON.stringify(savedBookings));

  formSuccess.classList.add("show");
  bookingForm.reset();

  setTimeout(() => {
    formSuccess.classList.remove("show");
  }, 6000);
});

/* Event buttons */
document.querySelectorAll(".event-btn").forEach((button) => {
  button.addEventListener("click", () => {
    alert("Registration feature coming soon!");
  });
});