import { delay } from '../../shared/delay';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';

const FLIP_DELAY = 500;

export class Game {
  readonly element: HTMLElement;

  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  constructor() {
    this.cardsField = new CardsField();
    this.element = this.cardsField.element;
  }

  async startGame(images: string[]) {
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    await this.cardsField.addCards(cards);
  }

  stopGame(): void {
    this.cardsField.clear();
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation || card.isFlippedToFront) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.activeCard.matchCard.element.classList.add('card__match_red');
      card.matchCard.element.classList.add('card__match_red');
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.matchCard.element.classList.add('card__match_green');
      card.matchCard.element.classList.add('card__match_green');
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
