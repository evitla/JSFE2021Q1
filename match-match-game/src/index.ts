import './styles/style.scss';
import imgSrc from './assets/images/card-back.png';

window.onload = () => {
  document.body.innerHTML = '<h1>Hello, World!</h1>';
  const img = new Image();
  img.src = imgSrc;
  document.body.appendChild(img);
};
