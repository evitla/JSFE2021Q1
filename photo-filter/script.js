const filters = document.querySelector(".filters");
const photo = document.querySelector("img");
const resetBtn = document.querySelector(".btn-reset");
const nextBtn = document.querySelector(".btn-next");

function updateFilter(input) {
  // input and output have the same parent
  const output = input.parentNode.querySelector("output");
  const unit = input.dataset.sizing;
  
  document.documentElement.style.setProperty(
    `--${input.name}`, input.value + unit
  );
  output.value = input.value;
}

function updateHandler(event) {
  const input = event.target;
  updateFilter(input);
}

function resetHandler() {
  const inputs = filters.querySelectorAll("input");
  inputs.forEach(input => {
    input.value = (input.name === "saturate") ? 100 : 0;
    updateFilter(input);
  });
}

let i = 0;
function getSrc() {
  const absPath = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
  const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
  const index = i % images.length;
  i++;
  
  const date = new Date();
  const hour = date.getHours();

  if (hour < 6) return absPath + "night/" + images[index];
  if (hour < 12) return absPath + "morning/" + images[index];
  if (hour < 18) return absPath + "day/" + images[index];
  if (hour < 24) return absPath + "evening/" + images[index];
}

function changeImage() {
  const imageSrc = getSrc();
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => photo.src = imageSrc;
  nextBtn.disabled = true;
  setTimeout(() => nextBtn.disabled = false, 1000);
}

filters.addEventListener("input", updateHandler);
resetBtn.addEventListener("click", resetHandler);
nextBtn.addEventListener("click", changeImage);
