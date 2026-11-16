
// KARHAR LOGISTICS WEBSITE

// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

if (menuBtn && navigation) {
  menuBtn.addEventListener("click", () => {
    navigation.classList.toggle("open");

    menuBtn.textContent =
      navigation.classList.contains("open") ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });
}

// AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// BOOKING TO DELIVERY ANIMATION

const journeySection = document.querySelector(".journey-section");
const journeyRoad = document.querySelector(".journey-road");
const journeySteps = document.querySelectorAll(".journey-step");

let currentStep = 0;
let journeyTimer = null;

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function updateJourney() {

  if (!journeySteps.length || !journeyRoad) return;

  // Activate current step

  journeySteps.forEach((step, index) => {

    step.classList.toggle(
      "active",
      index === currentStep
    );

  });

  // Move truck across the road

  const progress =
    (currentStep / (journeySteps.length - 1)) * 100;

  journeyRoad.style.setProperty(
    "--progress",
    progress + "%"
  );

  // Move to next stage

  currentStep = (currentStep + 1) % journeySteps.length;
}

function startJourney() {

  if (journeyTimer || !journeySteps.length) return;

  updateJourney();

  if (!reducedMotion) {
    journeyTimer = setInterval(updateJourney, 2500);
  }
}

function stopJourney() {

  if (journeyTimer) {
    clearInterval(journeyTimer);
    journeyTimer = null;
  }

}

if (journeySection && journeySteps.length) {

  if ("IntersectionObserver" in window) {

    const journeyObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            startJourney();
          } else {
            stopJourney();
          }

        });

      },
      { threshold: 0.25 }
    );

    journeyObserver.observe(journeySection);

  } else {
    startJourney();
  }

}

// LOG IN CONSOLE

console.log("Karhar Logistics website loaded successfully.");
