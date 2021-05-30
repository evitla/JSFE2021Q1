import registerImageSrc from './assets/images/register-card.png';
import settingsImageSrc from './assets/images/settings-card.png';
import gameImageSrc from './assets/images/game-card.png';
import { UserRegisterWindow } from './components/modal-windows/user-register/user-register';
import { Database } from './database';

export class AboutGame {
  private readonly content: HTMLElement;

  private readonly title: HTMLElement;

  readonly userRegister: UserRegisterWindow;

  constructor(private readonly rootElement: HTMLElement, database: Database) {
    this.title = document.createElement('h2');
    this.title.classList.add('section__title');
    this.content = document.createElement('div');
    this.content.classList.add('about__content');
    this.userRegister = new UserRegisterWindow(database);
  }

  render() {
    this.clear();
    this.rootElement.appendChild(this.title);
    this.rootElement.appendChild(this.content);
    this.title.innerText = 'How to play?';

    const registerImage = this.renderClickableImage(registerImageSrc, [
      'register-card',
    ]);
    const settingsImage = this.renderClickableImage(
      settingsImageSrc,
      ['settings-card'],
      '#/settings'
    );
    const gameImage = this.renderClickableImage(
      gameImageSrc,
      ['game-card'],
      '#/game'
    );
    const images = [registerImage, settingsImage, gameImage];
    const texts = [
      'Register new player in game',
      'Configure your game settings',
      'Start your new game! Remember card positions and match it before times up.',
    ];

    for (let i = 0; i < 3; i++) {
      const numberedCard = document.createElement('div');
      numberedCard.classList.add('about__numbered-card');
      numberedCard.setAttribute('data-order', `${i + 1}`);
      numberedCard.innerHTML = `
        <p>${texts[i]}</p>
      `;
      this.content.appendChild(numberedCard);
      this.content.appendChild(images[i]);
    }

    this.content.appendChild(this.userRegister.element);

    registerImage.addEventListener('click', () => {
      this.userRegister.render();
      this.userRegister.element.classList.add('visible');
    });
  }

  private clear() {
    this.content.innerText = '';
  }

  private renderClickableImage(
    src: string,
    styles: string[] = [],
    href: string = ''
  ) {
    const figure = document.createElement('figure');
    figure.classList.add('about__card');
    const img = new Image();
    img.src = src;
    img.alt = '';
    img.classList.add(...styles);
    if (href) {
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = href;
      link.appendChild(img);
      figure.appendChild(link);
    } else {
      figure.appendChild(img);
    }
    return figure;
  }
}
