import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class Header extends BaseComponent {
  constructor(rootElement: HTMLElement) {
    super('header', ['header']);

    rootElement.appendChild(this.element);
  }

  render(): void {
    const raceButton = new Button('Race', ['btn', 'primary-btn']);
    const winnersButton = new Button('Winners', ['btn', 'primary-btn']);

    this.element.appendChild(raceButton.element);
    this.element.appendChild(winnersButton.element);
  }
}
