export function animation(
  car: HTMLElement,
  distance: number,
  animationTime: number
): { id: number } {
  let start: number = null;
  const state: { id: number } = { id: null };

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round((time * distance) / animationTime);

    car.style.transform = `translate(${Math.min(passed, distance)}px, 4px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }

  state.id = window.requestAnimationFrame(step);

  return state;
}
