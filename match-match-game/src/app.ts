import { Game } from './components/game/game';
import { GameWinWindow } from './components/modal-windows/game-win/game-win';
import { Timer } from './components/timer/timer';
import { Database } from './database';
import { GameSettings } from './game-settings';
import { ImageCategoryModel } from './models/image-category-model';

export class App {
  private readonly timer: Timer;

  readonly game: Game;

  private readonly gameWinWindow: GameWinWindow;

  private isEventAdded = false;

  constructor(
    private readonly rootElement: HTMLElement,
    private readonly button: HTMLElement,
    gameSettings: GameSettings,
    database: Database
  ) {
    this.timer = new Timer();
    this.gameWinWindow = new GameWinWindow();
    this.game = new Game(
      this.timer,
      this.gameWinWindow,
      gameSettings,
      database
    );
  }

  async start(currentUserEmail: string) {
    this.rootElement.appendChild(this.timer.element);
    this.rootElement.appendChild(this.game.element);
    this.rootElement.appendChild(this.gameWinWindow.element);

    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();

    if (!this.isEventAdded) {
      this.button.addEventListener('click', () => {
        const isStartButton =
          this.button.innerText.toLowerCase() === 'start game';

        if (isStartButton) {
          this.button.innerText = 'Stop Game';
          this.game.startGame(categories, currentUserEmail);
        } else {
          if (this.timer.currentTime === 0) return;
          this.button.innerText = 'Start Game';
          this.game.stopGame();
        }
      });
    }

    this.isEventAdded = true;
  }
}
