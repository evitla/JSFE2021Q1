import { Database } from '../../database';
import { delay } from '../../shared/delay';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { GameWinWindow } from '../modal-windows/game-win/game-win';
import { Timer } from '../timer/timer';

const FLIP_DELAY = 500;

export class Game {
  readonly element: HTMLElement;

  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private timeInterval = 0;

  private totalCards = 0;

  private foundCards = 0;

  constructor(
    private readonly timer: Timer,
    private readonly gameWinWindow: GameWinWindow,
    private readonly database: Database
  ) {
    this.cardsField = new CardsField();
    this.element = this.cardsField.element;
  }

  async startGame(images: string[], currentUserEmail: string) {
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () =>
        this.cardHandler(card, currentUserEmail)
      );
    });

    await this.cardsField.addCards(cards);
    this.totalCards = images.length;

    this.timeInterval = this.timer.updateTime();
  }

  stopGame() {
    this.foundCards = 0;
    clearInterval(this.timeInterval);
    this.timer.clear();
    this.cardsField.clear();
  }

  private async finishGame(currentUserEmail: string) {
    this.gameWinWindow.render(this.timer.renderText());
    this.gameWinWindow.element.classList.add('visible');
    clearInterval(this.timeInterval);
    /* TODO */
    const score = 100;
    await this.database.updateScore(currentUserEmail, score);
  }

  private async cardHandler(card: Card, currentUserEmail: string) {
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
      this.foundCards += 1;
    }

    if (this.foundCards === this.totalCards) this.finishGame(currentUserEmail);

    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
