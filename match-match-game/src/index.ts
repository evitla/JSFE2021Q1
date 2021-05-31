import './styles/style.scss';
import userImg from './assets/images/default-user-image.png';
import { App } from './app';
import { Header } from './components/header/header';
import Router from './router';
import { AboutGame } from './about-game';
import { GameSettings } from './game-settings';
import { Database } from './database';
import { BestScore } from './best-score';

const ROOT_URL = 'evitla-JSFE2021Q1/match-match-game';
const NUM_USERS_TO_SHOW = 10;

window.onload = () => {
  const header = new Header(ROOT_URL, userImg);
  const main = document.createElement('main');
  const gameSettings = new GameSettings(main);
  const database = new Database('evitla', 'user-data');
  database.init();
  const bestScore = new BestScore(main);
  const app = new App(main, header.button.element, gameSettings, database);
  const about = new AboutGame(main, database);
  about.render();

  document.body.appendChild(header.element);
  document.body.appendChild(main);
  const router = new Router({ mode: 'hash', root: ROOT_URL });

  const stopGameAndClearMain = () => {
    app.game.stopGame();
    header.button.element.innerText = 'Start Game';
    main.innerText = '';
  };

  router
    .add(/score/, () => {
      stopGameAndClearMain();
      bestScore.render(database, NUM_USERS_TO_SHOW);
    })
    .add(/settings/, () => {
      stopGameAndClearMain();
      gameSettings.render();
    })
    .add(/game/, () => {
      main.innerText = '';
      const currentUserEmail = window.localStorage.getItem('email') || '';
      app.start(ROOT_URL, currentUserEmail);
    })
    .add('', () => {
      stopGameAndClearMain();
      about.render();
    });
};
