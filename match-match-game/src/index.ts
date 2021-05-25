import './styles/style.scss';
import userImg from './assets/images/default-user-image.png';
import { App } from './app';
import { Header } from './components/header/header';

window.onload = () => {
  const header = new Header(userImg);
  const main = document.createElement('main');
  document.body.appendChild(header.element);
  document.body.appendChild(main);

  new App(main, header.button.element).start();
};
