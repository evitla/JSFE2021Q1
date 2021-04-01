const checkbox = document.getElementById("theme-toggle");
const mapImg = document.getElementById("map-img");

const lightThemeMapSrc = "../../assets/images/map-light.svg"
const darkThemeMapSrc = "../../assets/images/map-dark.svg"

checkbox.addEventListener("change", themeToggle);

function themeToggle() {
  if (this.checked) {
    trans();
    document.documentElement.setAttribute("data-theme", "dark");
    mapImg.src = darkThemeMapSrc;
  } else {
    trans();
    document.documentElement.setAttribute("data-theme", "light");
    mapImg.src = lightThemeMapSrc;
  }
}

const trans = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
}