const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const btnContainer = document.querySelector(".btn-container");
const buttons = document.querySelectorAll(".btn");
const fullScreenBtn = document.querySelector(".fullscreen");

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

fullScreenBtn.onclick = toggleFullscreen;

const btnClick = () => {
  buttons.forEach(btn => {
    if (btn.classList.contains("btn-active")) {
      btn.classList.remove("btn-active");
    } else {
      btn.classList.add("btn-active");
    }
  })

  pianoKeys.forEach(key => {
    if (key.classList.contains("piano-key-letter")) {
      key.classList.remove("piano-key-letter");
    } else {
      key.classList.add("piano-key-letter");
    }
  })
}

btnContainer.onclick = btnClick;

const playNote = src => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const pressKey = event => {
  if (event.repeat) return;

  const isMouse = !event.key;
  const letter = event.target.dataset.letter || event.key.toUpperCase();
  const target = (isMouse) 
                    ? event.target
                    : document.querySelector(`.piano-key[data-letter="${letter}"`);

  if (!target) return;
  const src = `./assets/audio/${target.dataset.note}.mp3`;
  playNote(src);

  target.classList.add("piano-key-active");
  if (isMouse)  target.classList.add("piano-key-active-pseudo");
}

const releaseKey = event => {
  const isMouse = !event.key;
  const letter = event.target.dataset.letter || event.key.toUpperCase();
  const target = (isMouse) 
                    ? event.target
                    : document.querySelector(`.piano-key[data-letter="${letter}"`);

  if (!target) return;

  target.classList.remove("piano-key-active");
  target.classList.remove("piano-key-active-pseudo");
}

const startMouseOver = () => {
  pianoKeys.forEach(key => {
    key.addEventListener("mouseover", pressKey);
    key.addEventListener("mouseout", releaseKey);
  })
}

const stopMouseOver = () => {
  pianoKeys.forEach(key => {
    key.removeEventListener("mouseover", pressKey);
    key.removeEventListener("mouseout", releaseKey);
  })
}

piano.onmousedown = event => {
  if (event.target.classList.contains("piano-key")) {
    pressKey(event);
  }
  startMouseOver();
}

piano.onmouseup = event => {
  if (event.target.classList.contains("piano-key")) {
    releaseKey(event);
  }
}

document.addEventListener("keydown", pressKey);
document.addEventListener("keyup", releaseKey);
document.addEventListener("mouseup", stopMouseOver);
