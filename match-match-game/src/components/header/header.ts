import './header.scss';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Navigation } from './navbar/navbar';

export class Header extends BaseComponent {
  button = new Button('Start Game', ['primary-btn'], '#/game');

  constructor(userImg: string) {
    super('header', ['header']);
    this.render();
    this.renderUserImage(userImg);
  }

  private render() {
    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.innerHTML =
      '<a href="#/"><h1 class="logo__title">Match Match</h1></a>';

    const navbar = new Navigation();

    this.element.appendChild(logo);
    this.element.appendChild(navbar.element);
    this.element.appendChild(this.button.element);
  }

  renderUserImage(userImg: string) {
    const figure = document.createElement('figure');
    figure.classList.add('user-image');
    const img = new Image();
    img.src = userImg;
    img.alt = 'user';

    figure.appendChild(img);
    this.element.appendChild(figure);
  }
}
