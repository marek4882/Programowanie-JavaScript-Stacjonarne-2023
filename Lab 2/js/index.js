let slideIndex = 1;
let slideInterval;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
}

function startSlider() {
  slideInterval = setInterval(function () {
    plusSlides(1);
  }, 3000);
}

function pauseSlider() {
  clearInterval(slideInterval);
}

startSlider();

let pauseButton = document.getElementById("pauseButton");
let resumeButton = document.getElementById("resumeButton");

pauseButton.addEventListener("click", function () {
  pauseSlider();
});

resumeButton.addEventListener("click", function () {
  startSlider();
});
