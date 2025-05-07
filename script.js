document.addEventListener("DOMContentLoaded", () => {
    const accountForm = document.getElementById("account-form");
    const customizeForm = document.getElementById("customize-form");
    const taskForm = document.getElementById("task-form");
  
    const setupScreen = document.getElementById("setup-screen");
    const customizeScreen = document.getElementById("customize-screen");
    const taskSection = document.getElementById("task-section");
    const customPhoto = document.getElementById("custom-photo");
  
    const bgColorPicker = document.getElementById("bg-color");
    const fontSelect = document.getElementById("font");
    const animationsCheckbox = document.getElementById("animations");
    const photoUpload = document.getElementById("photo-upload");
  
    // Step 1: Handle account setup
    accountForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userName = document.getElementById("user-name").value;
      const streamingServices = ["spotify", "netflix", "youtube"].filter(id => document.getElementById(id).checked);
  
      localStorage.setItem("userName", userName);
      localStorage.setItem("streamingServices", JSON.stringify(streamingServices));
  
      setupScreen.classList.add("hidden");
      customizeScreen.classList.remove("hidden");
    });
  
    // Step 2: Handle customization
    customizeForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const bgColor = bgColorPicker.value;
      const font = fontSelect.value;
      const animations = animationsCheckbox.checked;
  
      document.body.style.backgroundColor = bgColor;
      document.body.style.fontFamily = font;
      if (animations) {
        document.body.classList.add("animated-bg");
      } else {
        document.body.classList.remove("animated-bg");
      }
  
      localStorage.setItem("bgColor", bgColor);
      localStorage.setItem("font", font);
      localStorage.setItem("animations", animations);
  
      customizeScreen.classList.add("hidden");
      taskSection.classList.remove("hidden");
    });
  
    // Background image preview
    photoUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          customPhoto.src = event.target.result;
          customPhoto.classList.remove("hidden");
          document.body.style.backgroundImage = `linear-gradient(rgba(72, 106, 71, 0.5), rgba(72, 106, 71, 0.5)), url('${event.target.result}')`;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          document.body.style.backgroundPosition = "center";
          localStorage.setItem("customPhoto", event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Step 3: Handle task form
document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const task = document.getElementById('task').value.trim();
  const timeInput = document.getElementById('time').value.trim();
  const output = document.getElementById('output');

  let metaphor = '';

  // Try to extract a number from the time input
  const minutesMatch = timeInput.match(/\d+/);
  const minutes = minutesMatch ? parseInt(minutesMatch[0]) : null;

  if (!minutes) {
    metaphor = "hmm... i couldn't understand the time. try something like '30 minutes' or '1 hour'.";
  } else if (minutes <= 10) {
    metaphor = "that's like listening to all too well (10 minute version) by taylor swift";
  } else if (minutes <= 15) {
    metaphor = " that’s like making a matcha latte 🍵";
  } else if (minutes <= 30) {
    metaphor = "📺 that’s about one episode of the office/friends";
  } else if (minutes <= 45) {
    metaphor = "📺 that's exactly one epsiode of criminal minds";
  } else if (minutes <= 60) {
    metaphor = "thats one whole episode of your favorite podcast";
  } else if (minutes <= 90) {
    metaphor = "🛋️ that’s how long it'll take you to finish the lion king";
  } else {
    metaphor = "🌼 that’s like planting a whole garden—take breaks and water yourself.";
  }

  output.innerHTML = `
    <h2>your task:</h2>
    <p><strong>${task}</strong></p>
    <h2>time metaphor:</h2>
    <p>${metaphor}</p>
  `;

      const garden = document.getElementById("garden-timeline");
      const flower = document.createElement("div");
      flower.className = "task-plant";
      flower.innerText = `${task}\n(${timeInput})`;
      garden.appendChild(flower);
  
      taskForm.reset();
});
  
    // Restore customization if user returns later
    const savedBgColor = localStorage.getItem("bgColor");
    const savedFont = localStorage.getItem("font");
    const savedAnimations = localStorage.getItem("animations") === "true";
  
    if (savedBgColor) document.body.style.backgroundColor = savedBgColor;
    if (savedFont) document.body.style.fontFamily = savedFont;
    if (savedAnimations) document.body.classList.add("animated-bg");
    if (savedPhoto) {
      document.body.style.backgroundImage = `linear-gradient(rgba(72, 106, 71, 0.5), rgba(72, 106, 71, 0.5)), url('${savedPhoto}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
   
    }
  ;
  const animatedContainer = document.querySelector(".animated-elements");

function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // randomize horizontal position and speed
  petal.style.left = Math.random() * window.innerWidth + "px";
  petal.style.animationDuration = 5 + Math.random() * 5 + "s";

  animatedContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 10000); // remove after fall
}

// create petals every 500ms
setInterval(createPetal, 800);
})