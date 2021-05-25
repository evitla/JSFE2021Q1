import './button.scss';
import { BaseComponent } from '../base-component';

export class Button extends BaseComponent {
  constructor(content: string, styles: string[] = [], link: string = '') {
    super(link ? 'a' : 'button', ['btn']);

    if (link) this.element.setAttribute('href', link);
    this.element.innerHTML = content;
    this.element.classList.add(...styles);
  }
}
