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

// =============== WATCH CAROUSEL =============== //
const watchCarousel = document.querySelector(".watch__carousel");
const watchCarouselSlides = watchCarousel.querySelectorAll(".carousel__slide");
const watchInput = watchCarousel.querySelector(".watch__carousel-range");
const watchPagination = watchCarousel.querySelector(".pagination");
const watchPage = watchPagination.querySelector(".page");

function changePage(slideNumber) {
  console.log(page);
  page.innerHTML = `0${slideNumber}/`;
}

let activePage = watchInput.value;
function moveSlides(targetSlide) {
  const carouselSlides = watchCarousel.querySelector(".carousel__slides");
  const activeSlide = watchCarouselSlides[activePage - 1];
  const slideWidth = targetSlide.getBoundingClientRect().width;
  const gapProperty = window.getComputedStyle(carouselSlides).getPropertyValue("gap");
  const gapValue = Number(gapProperty.match(/\d+/)[0]);

  targetSlide.classList.add("carousel__slide_active");
  activeSlide.classList.remove("carousel__slide_active");
  watchPage.innerHTML = `0${targetSlide.dataset.number}/`;

  // we use 2 because second slide is active by default
  const moveAmount = (2 - targetSlide.dataset.number) * (slideWidth + gapValue);

  carouselSlides.style.transform = `translateX(${moveAmount}px)`;
  activePage = targetSlide.dataset.number;
}

function moveSlidesByInput(event) {
  const targetInput = event.target;
  const targetSlide = watchCarouselSlides[targetInput.value - 1];
  
  moveSlides(targetSlide);
}

function moveSlidesByClick(event) {
  if (!event.target.closest("img")) return;
  const targetSlide = event.target.parentNode;
  if (targetSlide.classList.contains("carousel__slide_active")) return;

  moveSlides(targetSlide);
  activePage = targetSlide.dataset.number;
  watchInput.value = activePage;
}

watchCarousel.addEventListener("input", moveSlidesByInput);
watchCarousel.addEventListener("click", moveSlidesByClick);
