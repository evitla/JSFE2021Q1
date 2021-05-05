const checkbox = document.getElementById("theme-toggle");

checkbox.addEventListener("change", themeToggle);

function themeToggle() {
  trans();
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    return;
  }
  document.documentElement.setAttribute("data-theme", "light");
}

const trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
}

// =============== CAROUSEL =============== //

class Carousel {
  constructor(className, markers, numOfSlidesToMove=1) {
    this.className = className;
    this.numOfSlidesToMove = numOfSlidesToMove;
    this.element = document.querySelector("." + className);
    this.slidesContainer = this.element.querySelector(".carousel__slides");
    this.slides = this.slidesContainer.querySelectorAll(".carousel__slide");
    this.inputRange = this.element.querySelector(".input-range");
    this.slidePagination = this.element.querySelector(".pagination");
    this.slidePage = this.slidePagination.querySelector(".page");
    this.defaultActiveSlidePage = this.inputRange.value;
    this.activeSlidePage = this.inputRange.value;
    
    this.markers = Array.from(markers);
    this.button = document.querySelector(".primary-btn");
  }

  changeMarkerColor = (activeSlide, targetSlide) => {
    const activeMarker = this.markers.find(
      marker => marker.title.toLowerCase() === activeSlide.dataset.animal
    );
    const targetMarker = this.markers.find(
      marker => marker.title.toLowerCase() === targetSlide.dataset.animal
    );
    
    if (targetMarker) targetMarker.classList.add("map-marker-red");
    if (activeMarker) activeMarker.classList.remove("map-marker-red");
  }

  changeButtonLink = (targetSlide) => {
    const targetSlideAnimal = targetSlide.dataset.animal;
    this.button.href = (targetSlideAnimal) ? `../../pages/zoos/${targetSlideAnimal}/`
                                           : "javascript:void(0)"
  }

  moveSlides = (targetSlide) => {
    const activeSlide = this.slides[this.activeSlidePage - 1];
    const targetSlideWidth = targetSlide.offsetWidth;
    const gapValue = parseFloat(window.getComputedStyle(this.slidesContainer).gap);
    const targetSlidePage = targetSlide.dataset.number;
    const moveAmount = (this.defaultActiveSlidePage - Math.min(targetSlidePage, 6))
                       * (targetSlideWidth + gapValue)
                       * this.numOfSlidesToMove;
    targetSlide.classList.add(this.className + "-slide_active");
    activeSlide.classList.remove(this.className + "-slide_active");
    this.slidePage.innerHTML = `0${targetSlidePage}/`;

    this.slidesContainer.style.transform = `translateX(${(targetSlidePage == 1) ? 0 : moveAmount}px)`;
    this.activeSlidePage = targetSlidePage;

    this.changeMarkerColor(activeSlide, targetSlide);
    this.changeButtonLink(targetSlide);
  }

  moveSlidesByInput = (event) => {
    const targetInput = event.target;
    const targetSlide = this.slides[(targetInput.value - 1) * (this.numOfSlidesToMove || 1)];
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
        if (this.activeSlidePage === this.inputRange.max) return 0;
        return this.inputRange.value;
      }
      
      if (this.inputRange.value - 2 < 0) return this.inputRange.max - 1;
      return (this.inputRange.value - 2)
    }
    
    const targetSlide = this.slides[targetSlideIndex()];
    
    this.moveSlides(targetSlide);
    this.activeSlidePage = targetSlide.dataset.number;
    this.inputRange.value = targetSlide.dataset.number;
  }

  moveSlidesByClickMarker = (event) => {
    const targetTitle = event.target.closest("div").title.toLowerCase();
    const targetSlide = Array.from(this.slides).find(slide => slide.dataset.animal === targetTitle);
    this.moveSlides(targetSlide);
    this.activeSlidePage = targetSlide.dataset.number;
    this.inputRange.value = targetSlide.dataset.number;
  }
}

// =============== VIDEO CONTENT =============== //

const mainVideo = document.querySelector(".zoo__video");
const videosCarousel = document.querySelector(".zoo__carousel");

function changeMainVideo(event) {
  const activeVideo = mainVideo;
  const targetVideo = event.target.nextElementSibling;
  const activeVideoSrc = activeVideo.src;
  const targetVideoSrc = targetVideo.src;
  const activeVideoURL = activeVideoSrc.split("/")[4];
  const targetVideoURL = targetVideoSrc.split("/")[4];
  activeVideo.src = targetVideoSrc;
  targetVideo.src = activeVideoSrc;
  setTimeout(() => {
    targetVideo.srcdoc = targetVideo.srcdoc.replaceAll(targetVideoURL, activeVideoURL);
  }, 600);
}

videosCarousel.addEventListener("click", changeMainVideo);
