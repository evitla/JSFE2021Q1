import './navbar.scss';
import img1 from '../../../assets/images/marker-1.svg';
import img2 from '../../../assets/images/marker-2.svg';
import img3 from '../../../assets/images/marker-3.svg';
import { BaseComponent } from '../../base-component';

export class Navigation extends BaseComponent {
  list = new BaseComponent('ul', ['nav__list']);

  constructor() {
    super('nav', ['nav']);

    const linkNames = ['About Game', 'Best Score', 'Game Settings'];
    const links = ['', 'score', 'settings'];
    const imgs = [img1, img2, img3];

    linkNames.forEach((name, index) =>
      this.renderListItem(name, '#/' + links[index], imgs[index])
    );

    this.element.appendChild(this.list.element);
  }

  private renderListItem(content: string, url: string, img: string) {
    const listItem = new BaseComponent('li', ['nav__list-item']);
    listItem.element.innerHTML = `
      <a href="${url}">
        <img class="nav__icon" src=${img} alt="">
        ${content}
      </a>
    `;
    this.list.element.appendChild(listItem.element);
  }
}
