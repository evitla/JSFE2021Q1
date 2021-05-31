import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlippedToFront = false;

  cardElement = new BaseComponent('div', ['card']);

  matchCard = new BaseComponent('div', ['card__match']);

  constructor(readonly image: string) {
    super('div', ['card-container']);

    this.cardElement.element.innerHTML = `
      <div class="card__front" style="background-image: url('./images/${image}')"></div>
      <div class="card__back"></div>
    `;

    this.cardElement.element.appendChild(this.matchCard.element);
    this.element.appendChild(this.cardElement.element);
  }

  flipToBack() {
    this.isFlippedToFront = false;
    this.matchCard.element.classList.remove('card__match_red');
    return this.flip(true);
  }

  flipToFront() {
    this.isFlippedToFront = true;
    return this.flip(false);
  }

  private flip(isFront: boolean): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
