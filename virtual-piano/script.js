const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

const playAudio = event => {  
  const letter = event.target.dataset.letter;
  const target = event.target;
  const audio = document.querySelector(`audio[data-letter="${letter}"`);
  
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  target.classList.add("piano-key-active");
  target.classList.add("piano-key-active-pseudo");
}

piano.onmousedown = event => {
  if (event.target.classList.contains("piano-key")) {
    playAudio(event);
  }
}
