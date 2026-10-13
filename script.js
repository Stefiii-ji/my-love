"use strict";

const screens = Array.from(document.querySelectorAll("[data-screen]"))
  .sort((first, second) => Number(first.dataset.screen) - Number(second.dataset.screen));
const progressDots = Array.from(document.querySelectorAll("[data-progress-step]"));
const progressLabel = document.querySelector("#progress-label");
const musicStatus = document.querySelector("#music-status");
const musicToggle = document.querySelector("#music-toggle");
const musicToggleLabel = document.querySelector("#music-toggle-label");
const audio = document.querySelector("#background-music");
const heartStage = document.querySelector("#heart-stage");
const heartButton = document.querySelector("#heart-button");
const heartMessage = document.querySelector("#heart-message");
const memoryButtons = Array.from(document.querySelectorAll(".memory-toggle"));
const stepNames = ["Welcome", "A little reminder", "My apology", "The final note and memories"];
let currentStep = 0;

if (audio) {
  audio.volume = 0.35;
}

function updateMusicControl(isPlaying, status) {
  if (!musicToggle || !musicToggleLabel) {
    return;
  }

  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "Turn background music off" : "Turn background music on"
  );
  musicToggleLabel.textContent = isPlaying ? "Music on" : "Music off";
  if (status && musicStatus) {
    musicStatus.textContent = status;
  }
}

function startBackgroundMusic() {
  if (!audio) {
    updateMusicControl(false, "Music isn't available; you can keep going.");
    return;
  }

  try {
    audio.play().catch(() => updateMusicControl(false, "Music couldn't start; you can keep going."));
  } catch {
    updateMusicControl(false, "Music couldn't start; you can keep going.");
  }
}

function showStep(nextStep) {
  if (nextStep < 0 || nextStep >= screens.length || nextStep === currentStep) {
    return;
  }

  currentStep = nextStep;
  screens.forEach((screen) => {
    screen.hidden = screen !== screens[currentStep];
  });

  progressDots.forEach((dot, index) => {
    const isCurrent = index === currentStep;
    dot.classList.toggle("is-current", isCurrent);
    dot.classList.toggle("is-complete", index < currentStep);
    if (isCurrent) {
      dot.setAttribute("aria-current", "step");
      const stepDescription = dot.querySelector(".visually-hidden");
      if (stepDescription) {
        stepDescription.textContent = `Step ${index + 1}: ${stepNames[index]}, current step`;
      }
    } else {
      dot.removeAttribute("aria-current");
      const stepDescription = dot.querySelector(".visually-hidden");
      if (stepDescription) {
        stepDescription.textContent = `Step ${index + 1}: ${stepNames[index]}`;
      }
    }
  });

  if (progressLabel) {
    progressLabel.textContent = `A little note · ${currentStep + 1} of ${screens.length}`;
  }
  screens[currentStep].querySelector("h1, h2")?.focus();

  if (currentStep !== 3 && heartMessage) {
    heartMessage.hidden = true;
  }
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStep === 0) {
      startBackgroundMusic();
    }
    showStep(currentStep + 1);
  });
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", () => showStep(currentStep - 1));
});

function returnToWelcome() {
  showStep(0);
  history.replaceState(null, "", "#welcome");
}

document.querySelector("[data-home]")?.addEventListener("click", returnToWelcome);
document.querySelector(".wordmark")?.addEventListener("click", (event) => {
  event.preventDefault();
  returnToWelcome();
});

if (audio) {
  audio.addEventListener("playing", () => {
    updateMusicControl(true, "Music is playing");
  });

  audio.addEventListener("pause", () => {
    updateMusicControl(false, "Music is paused");
  });

  audio.addEventListener("error", () => {
    updateMusicControl(false, "Music couldn't play; you can keep going.");
  });
}

musicToggle?.addEventListener("click", () => {
  if (!audio) {
    updateMusicControl(false, "Music isn't available; you can keep going.");
    return;
  }

  if (audio.paused) {
    startBackgroundMusic();
  } else {
    audio.pause();
  }
});

function createHeartBurst() {
  if (!heartStage) {
    return;
  }

  const colors = ["#f3c4e2", "#d7c3ff", "#ffe0ed", "#cbb8ff", "#f4d9a8"];

  for (let index = 0; index < 11; index += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 11;
    const distance = 48 + (index % 3) * 16;
    particle.className = "heart-particle";
    particle.setAttribute("aria-hidden", "true");
    particle.textContent = index % 3 === 0 ? "✦" : "♥";
    particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance - 24}px`);
    particle.style.setProperty("--particle-rotate", `${(index % 2 === 0 ? 1 : -1) * 25}deg`);
    particle.style.setProperty("--particle-size", `${index % 3 === 0 ? 0.8 : 1.05}rem`);
    particle.style.setProperty("--particle-color", colors[index % colors.length]);
    heartStage.append(particle);
    particle.addEventListener("animationend", () => particle.remove(), { once: true });
  }
}

heartButton?.addEventListener("click", () => {
  if (!heartMessage) {
    return;
  }

  heartMessage.hidden = false;
  createHeartBurst();
});

memoryButtons.forEach((button, index) => {
  const card = button.closest(".memory-card");
  const photo = button.querySelector(".memory-photo");
  const status = card?.querySelector(".memory-status");
  const photoPath = `assets/photo${index + 1}.webp`;
  const memoryName = button.getAttribute("aria-label")?.replace("Reveal memory: ", "") ?? `memory ${index + 1}`;

  if (!card || !photo || !status) {
    return;
  }

  button.addEventListener("click", () => {
    if (button.dataset.loaded === "true") {
      const isRevealed = card.classList.toggle("is-revealed");
      button.setAttribute("aria-expanded", String(isRevealed));
      button.setAttribute("aria-label", `${isRevealed ? "Hide" : "Reveal"} memory: ${memoryName}`);
      status.hidden = true;
      return;
    }

    if (button.dataset.loading === "true") {
      return;
    }

    button.dataset.loading = "true";
    photo.loading = "eager";
    status.textContent = "Opening this memory...";
    status.hidden = false;
    photo.onload = () => {
      button.dataset.loading = "false";
      button.dataset.loaded = "true";
      card.classList.add("is-revealed");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", `Hide memory: ${memoryName}`);
      status.hidden = true;
    };
    photo.onerror = () => {
      button.dataset.loading = "false";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", `Photo not available: add ${photoPath} to reveal this memory`);
      status.textContent = `Photo not added yet. Add ${photoPath} to reveal this memory.`;
      status.hidden = false;
    };
    photo.src = photoPath;
  });
});
