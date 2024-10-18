import { Progress } from "./progress.js";
const newProgress = new Progress(
  "svg1",
  "circle1",
  "circle2",
  "rgb(234, 240, 245)",
  "rgb(0, 92, 255)",
  0,
  "normal"
);
let circle = null;
let block = null;

document.addEventListener("DOMContentLoaded", () => {
  circle = document.getElementById("circle2");
  block = document.getElementById("svg1");
});

const percent = document.getElementById("input-percent");
const animate = document.getElementById("input-animate");
const hide = document.getElementById("input-hide");
function validateInput(input) {
  const value = input.value;
  const regex = /^[1-9][0-9]+$/;
  if (!regex.test(value)) {
    input.value = 0;
    showErrorMessage();
  } else if (value < 0 || value > 100) {
    input.value = 0;
    showErrorMessage();
  } else {
    hideErrorMessage();
  }
}
function showErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.opacity = 1;
}

function hideErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.opacity = 0;
}

percent.addEventListener("input", function () {
  validateInput(percent);
  newProgress.setValue(percent.value);
});

animate.addEventListener("change", function () {
  if (animate.checked) {
    newProgress.setAnimated(true);
    percent.value = 0;
  } else {
    newProgress.setAnimated(false);
  }
});

hide.addEventListener("change", function () {
  percent.value = 0;

  if (hide.checked) {
    newProgress.setHidden(true);
  } else {
    newProgress.setHidden(false);
  }
});
