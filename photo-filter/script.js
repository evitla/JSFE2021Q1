const filters = document.querySelector(".filters");
const btnContainer = document.querySelector(".btn-container");
const buttons = btnContainer.querySelectorAll(".btn");
const nextBtn = btnContainer.querySelector(".btn-next");
const fileInput = btnContainer.querySelector(".btn-load--input");
const canvas = document.getElementById("canvas");

const img = new Image();
img.setAttribute("crossOrigin", "anonymous");

const filterValues = {
  "blur": 0,
  "invert": 0,
  "sepia": 0,
  "saturate": 100,
  "hue": 0,
};

function drawImage(src, filterValues) {
  img.src = src;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (filterValues) {
      const filterStr = Object.keys(filterValues).reduce((acc, name) => {
        if (name === "blur") return acc += `blur(${filterValues[name]*1.8}px)`;
        return acc += (name === "hue") ? `hue-rotate(${filterValues[name]}deg)`
                                      : `${name}(${filterValues[name]}%)`;
      }, "");
      console.log(filterStr);
      ctx.filter = filterStr;
    }
    ctx.drawImage(img, 0, 0);
  }
}
drawImage("assets/img/img.jpg");

function updateFilter(input) {
  // input and output have the same parent
  const output = input.parentNode.querySelector("output");
  const unit = input.dataset.sizing;
  filterValues[input.name] = input.value;
  
  drawImage(img.src, filterValues);
  output.value = input.value;
}

function updateHandler(event) {
  const input = event.target;
  updateFilter(input);
}

filters.addEventListener("input", updateHandler);

function btnClick(event) {
  buttons.forEach(btn => {
    if (btn.classList.contains("btn-active")) {
      btn.classList.remove("btn-active");
    }
  });

  if (event.target.tagName !== "BUTTON") {
    event.target.parentNode.classList.add("btn-active");
    return;
  }

  event.target.classList.add("btn-active");

  if (event.target.classList.contains("btn-reset")) {
    resetHandler();
    return;
  }

  if (event.target.classList.contains("btn-next")) {
    changeImage();
    return;
  }

  if (event.target.classList.contains("btn-save")) {
    saveImage();
    return;
  }
}

btnContainer.addEventListener("click", btnClick);

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
  drawImage(getSrc(), filterValues);
  nextBtn.disabled = true;
  setTimeout(() => nextBtn.disabled = false, 1000);
}

function readFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => drawImage(reader.result, filterValues);
  reader.readAsDataURL(file);
  event.target.value = "";
}

fileInput.addEventListener('change', readFile);

function saveImage() {
  const link = document.createElement('a');
  link.download = 'download.png';
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
}
