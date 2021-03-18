const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

const playNote = event => {  
  const letter = event.target.dataset.letter;
  const target = event.target;
  const note = document.querySelector(`audio[data-letter="${letter}"`);
  
  if (!note) return;
  note.currentTime = 0;
  note.play();

  target.classList.add("piano-key-active");
  target.classList.add("piano-key-active-pseudo");
}

piano.onmousedown = event => {
  if (event.target.classList.contains("piano-key")) {
    playNote(event);
  }
}
