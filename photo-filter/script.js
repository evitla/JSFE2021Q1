const filters = document.querySelector(".filters");

function updateFilter(event) {
  const input = event.target;
  // input and output have the same parent
  const output = input.parentNode.querySelector("output[name='result']");
  const unit = input.dataset.sizing;
  
  document.documentElement.style.setProperty(
    `--${input.name}`, input.value + unit
  );
  output.value = input.value;
}

filters.addEventListener("input", updateFilter);
