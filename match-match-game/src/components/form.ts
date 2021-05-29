export class Form {
  element: HTMLFormElement;

  constructor(styles: string[] = []) {
    this.element = document.createElement('form');
    this.element.classList.add(...styles);
  }

  clear() {
    this.element.innerText = '';
  }
}
