import './styles/style.scss';
import userImg from './assets/images/default-user-image.png';
import { App } from './app';
import { Header } from './components/header/header';
import Router from './router';
import { AboutGame } from './about-game';

window.onload = () => {
  const header = new Header(userImg);
  const main = document.createElement('main');
  const app = new App(main, header.button.element);
  const about = new AboutGame(main);
  about.render();

  document.body.appendChild(header.element);
  document.body.appendChild(main);

  const router = new Router({ mode: 'hash', root: '/' });

  router
    .add(/score/, () => {
      /* TODO */
      app.game.stopGame();
      header.button.element.innerText = 'Start Game';
      main.innerText = '';
      const title = document.createElement('h1');
      title.innerText = 'Hello, Score!';
      main.appendChild(title);
    })
    .add(/settings/, () => {
      /* TODO */
      app.game.stopGame();
      header.button.element.innerText = 'Start Game';
      main.innerText = '';
      const title = document.createElement('h1');
      title.innerText = 'Hello, Settings!';
      main.appendChild(title);
    })
    .add(/game/, () => {
      main.innerText = '';
      app.start();
    })
    .add('', () => {
      app.game.stopGame();
      header.button.element.innerText = 'Start Game';
      main.innerText = '';
      about.render();
    });
};
