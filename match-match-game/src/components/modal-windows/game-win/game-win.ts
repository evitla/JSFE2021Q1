import '../modal-window.scss';
import { BaseComponent } from '../../base-component';
import { Button } from '../../button/button';

export class GameWinWindow extends BaseComponent {
  contentContainer: HTMLElement;

  text: HTMLElement;

  closeButton: Button;

  constructor() {
    super('div', ['modal']);
    this.contentContainer = document.createElement('div');
    this.text = document.createElement('p');
    this.closeButton = new Button('OK', ['secondary-btn']);
  }

  render(timeText: string): void {
    this.contentContainer.classList.add('modal-content');
    this.text.classList.add('modal-text');
    this.text.innerText = `Congratulations! You successfully found all matches on ${timeText}.`;

    this.closeButton.element.addEventListener('click', () =>
      this.element.classList.remove('visible')
    );

    this.contentContainer.appendChild(this.text);
    this.contentContainer.appendChild(this.closeButton.element);
    this.element.appendChild(this.contentContainer);
  }
}
