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

const percent = document.getElementById("input-percent");
const animate = document.getElementById("input-animate");
const hide = document.getElementById("input-hide");

const togleValue = document.getElementById("togle__value");
const tooltipValue = document.querySelector(".tooltipValue");
const togleAnimate = document.getElementById("togle__animate");
const tooltipAnimate = document.querySelector(".tooltipAnimate");
const togleHide = document.getElementById("togle__hide");
const tooltipHide = document.querySelector(".tooltipHide");
function validateInput(input) {
  const value = input.value;
  const regex = /^(100(\.0{1,2})?|[1-9]?[0-9](\.[0-9]{1,2})?)$/;
  if (!regex.test(value)) {
    showErrorMessage();
    newProgress.setValue(0);
    return false;
  } else if (value <= 0 || value > 100) {
    showErrorMessage();
    newProgress.setValue(0);
    return false;
  } else {
    hideErrorMessage();
    return true;
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
  if (validateInput(percent)) {
    newProgress.setValue(percent.value);
  }
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

togleValue.addEventListener("click", function () {
  tooltipValue.style.opacity = 1;
  setTimeout(function () {
    tooltipValue.style.opacity = 0;
  }, 1500);
});

togleValue.addEventListener("mouseover", function () {
  tooltipValue.style.opacity = 1;
});

togleValue.addEventListener("mouseout", function () {
  tooltipValue.style.opacity = 0;
});

togleAnimate.addEventListener("click", function () {
  tooltipAnimate.style.opacity = 1;
  setTimeout(function () {
    tooltipAnimate.style.opacity = 0;
  }, 1500);
});

togleAnimate.addEventListener("mouseover", function () {
  tooltipAnimate.style.opacity = 1;
});

togleAnimate.addEventListener("mouseout", function () {
  tooltipAnimate.style.opacity = 0;
});

togleHide.addEventListener("click", function () {
  tooltipHide.style.opacity = 1;
  setTimeout(function () {
    tooltipHide.style.opacity = 0;
  }, 1500);
});

togleHide.addEventListener("mouseover", function () {
  tooltipHide.style.opacity = 1;
});

togleHide.addEventListener("mouseout", function () {
  tooltipHide.style.opacity = 0;
});
