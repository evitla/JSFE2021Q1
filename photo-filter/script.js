const filters = document.querySelector(".filters");
const resetBtn = document.querySelector(".btn-reset");

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

filters.addEventListener("input", updateHandler);
resetBtn.addEventListener("click", resetHandler);
