import { Game } from './components/game/game';
import { GameWinWindow } from './components/modal-windows/game-win/game-win';
import { Timer } from './components/timer/timer';
import { ImageCategoryModel } from './models/image-category-model';

export class App {
  private readonly timer: Timer;

  private readonly game: Game;

  private readonly gameWinWindow: GameWinWindow;

  constructor(
    private readonly rootElement: HTMLElement,
    private readonly button: HTMLElement
  ) {
    this.timer = new Timer();
    this.gameWinWindow = new GameWinWindow();
    this.game = new Game(this.timer, this.gameWinWindow);

    this.rootElement.appendChild(this.timer.element);
    this.rootElement.appendChild(this.game.element);
    this.rootElement.appendChild(this.gameWinWindow.element);
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const category = categories[0];
    const images = category.images.map(
      (name) => `${category.category}/${name}`
    );

    this.button.addEventListener('click', () => {
      const isStartButton =
        this.button.innerText.toLowerCase() === 'start game';

      if (isStartButton) {
        this.button.innerText = 'Stop Game';
        this.game.startGame(images);
      } else {
        if (this.timer.currentTime === 0) return;
        this.button.innerText = 'Start Game';
        this.game.stopGame();
      }
    });
  }
}
