import './button.scss';
import { BaseComponent } from '../base-component';

export class Button extends BaseComponent {
  constructor(content: string, styles: string[] = []) {
    super('button', ['btn']);

    this.element.innerHTML = content;
    this.element.classList.add(...styles);
  }
}
