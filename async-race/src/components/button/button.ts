import './button.scss';

export class Button {
  readonly element: HTMLButtonElement;

  constructor(content: string, styles: string[] = [], isDisabled = false) {
    this.element = document.createElement('button');
    this.element.classList.add('btn');

    const front = document.createElement('span');
    front.classList.add('front');
    front.textContent = content;
    this.element.appendChild(front);
    this.element.disabled = isDisabled;
    this.element.classList.add(...styles);
  }
}
