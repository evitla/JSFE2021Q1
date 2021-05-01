const checkbox = document.getElementById("theme-toggle");
const mapImg = document.getElementById("map-img");

const lightThemeMapSrc = "../../assets/images/map-light.svg"
const darkThemeMapSrc = "../../assets/images/map-dark.svg"

checkbox.addEventListener("change", themeToggle);

function themeToggle() {
  trans();
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (mapImg) mapImg.src = darkThemeMapSrc;
    return;
  }
  document.documentElement.setAttribute("data-theme", "light");
  if (mapImg) mapImg.src = lightThemeMapSrc;
}

const trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
}

// =============== CAROUSEL =============== //

class Carousel {
  constructor(className, numOfSlidesToMove=1) {
    this.className = className;
    this.numOfSlidesToMove = numOfSlidesToMove
    this.element = document.querySelector("." + className);
    this.slidesContainer = this.element.querySelector(".carousel__slides");
    this.slides = this.slidesContainer.querySelectorAll(".carousel__slide");
    this.inputRange = this.element.querySelector(".input-range");
    this.slidePagination = this.element.querySelector(".pagination");
    this.slidePage = this.slidePagination.querySelector(".page");
    this.defaultActiveSlidePage = this.inputRange.value;
    this.activeSlidePage = this.inputRange.value;
  }

  moveSlides = (targetSlide) => {
    const activeSlide = this.slides[this.activeSlidePage - 1];
    const targetSlideWidth = targetSlide.offsetWidth;
    const gapValue = parseFloat(window.getComputedStyle(this.slidesContainer).gap);
    const targetSlidePage = targetSlide.dataset.number;
    const moveAmount = (this.defaultActiveSlidePage - targetSlidePage)
                       * (targetSlideWidth + gapValue)
                       * this.numOfSlidesToMove;
    targetSlide.classList.add(this.className + "-slide_active");
    activeSlide.classList.remove(this.className + "-slide_active");
    this.slidePage.innerHTML = `0${targetSlidePage}/`;

    this.slidesContainer.style.transform = `translateX(${moveAmount}px)`;
    this.activeSlidePage = targetSlidePage;
  }

  moveSlidesByInput = (event) => {
    const targetInput = event.target;
    const targetSlide = this.slides[(targetInput.value - 1) * this.numOfSlidesToMove];
    
    this.moveSlides(targetSlide);
  }

  moveSlidesByClick = (event) => {
    if (!event.target.closest("img")) return;
    const targetSlide = event.target.parentNode;
    if (targetSlide.classList.contains(this.className + "-slide_active")) return;
  
    this.moveSlides(targetSlide);
    this.activeSlidePage = targetSlide.dataset.number;
    this.inputRange.value = targetSlide.dataset.number;
  }

  moveSlidesByClickArrowButtons = (event) => {
    if (!event.target.closest("svg") && !event.target.closest("path")) return;
    const arrowButton = event.target.closest("svg");

    const targetSlideIndex = () => {
      if (arrowButton.classList.contains("next-btn-svg")) {
        if (this.inputRange.value === this.inputRange.max) return 0;
        return this.inputRange.value * this.numOfSlidesToMove;
      }
      
      if (this.inputRange.value - 2 < 0) return (this.inputRange.max - 1) * this.numOfSlidesToMove;
      return (this.inputRange.value - 2) * this.numOfSlidesToMove;
    }
    
    const targetSlide = this.slides[targetSlideIndex()];
    
    this.moveSlides(targetSlide);
    this.activeSlidePage = targetSlide.dataset.number;
    this.inputRange.value = targetSlide.dataset.number;
  }
}

const watchCarousel = new Carousel("watch__carousel");
watchCarousel.element.addEventListener("input", watchCarousel.moveSlidesByInput);
watchCarousel.element.addEventListener("click", watchCarousel.moveSlidesByClick);

const howCarousel = new Carousel("how__carousel");
howCarousel.element.addEventListener("input", howCarousel.moveSlidesByInput);

const petsCarousel = new Carousel("pets__carousel", numOfSlidesToMove=4);
petsCarousel.element.addEventListener("input", petsCarousel.moveSlidesByInput);
petsCarousel.element.addEventListener("click", petsCarousel.moveSlidesByClickArrowButtons);

const testimonialsCarousel = new Carousel("testimonials__carousel", numOfSlidesToMove=2);
testimonialsCarousel.element.addEventListener("input", testimonialsCarousel.moveSlidesByInput);
testimonialsCarousel.element.addEventListener("click", testimonialsCarousel.moveSlidesByClickArrowButtons);
