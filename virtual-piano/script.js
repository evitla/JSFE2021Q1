const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

const playNote = event => {
  if (event.repeat) return;

  const isMouse = !event.key;
  const letter = event.target.dataset.letter || event.key.toUpperCase();
  const target = (isMouse) 
                    ? event.target
                    : document.querySelector(`.piano-key[data-letter="${letter}"`);
  const note = document.querySelector(`audio[data-letter="${letter}"`);
  
  if (!note) return;
  note.currentTime = 0;
  note.play();

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
    key.addEventListener("mouseover", playNote);
    key.addEventListener("mouseout", releaseKey);
  })
}

const stopMouseOver = () => {
  pianoKeys.forEach(key => {
    key.removeEventListener("mouseover", playNote);
    key.removeEventListener("mouseout", releaseKey);
  })
}

piano.onmousedown = event => {
    if (event.target.classList.contains("piano-key")) {
      playNote(event);
    }
    startMouseOver();
}

piano.onmouseup = event => {
  if (event.target.classList.contains("piano-key")) {
    releaseKey(event);
  }
}

document.addEventListener("keydown", playNote);
document.addEventListener("keyup", releaseKey);
document.addEventListener("mouseup", stopMouseOver);
