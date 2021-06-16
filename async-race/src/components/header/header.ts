import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class Header extends BaseComponent {
  raceButton = new Button('Race', ['btn', 'primary-btn']);

  winnersButton = new Button('Winners', ['btn', 'primary-btn']);

  constructor(rootElement: HTMLElement) {
    super('header', ['header']);

    rootElement.appendChild(this.element);
  }

  render(): void {
    this.element.appendChild(this.raceButton.element);
    this.element.appendChild(this.winnersButton.element);
  }
}
