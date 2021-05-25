import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const CARDS_SHOW_TIME = 3000;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): Promise<void> {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));

    return new Promise((resolve) => {
      setTimeout(() => {
        this.cards.forEach((card) => card.flipToBack());
        resolve();
      }, CARDS_SHOW_TIME);
    });
  }
}
