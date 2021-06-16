import './styles/style.scss';
import { Header } from './components/header/header';
import { GarageView } from './pages/garageView';
import { WinnersView } from './pages/winnersView';
import { Pagination } from './components/pagination/pagination';
import { GarageController } from './components/garage-controller/garage-controller';
import { Garage } from './components/garage/garage';
import { Winners } from './components/winners/winners';
import store from './shared/store';

const base = 'http://localhost:3000';
const garageURL = `${base}/garage`;
const engineURL = `${base}/engine`;
const winnersURL = `${base}/winners`;

const url = { garage: garageURL, engine: engineURL, winners: winnersURL };

const header = new Header(document.body);
const main = document.createElement('main');

const garagePagination = new Pagination();
const winnersPagination = new Pagination();
const garageController = new GarageController(main);
const garage = new Garage(main, url, garageController, garagePagination);
const winners = new Winners(winnersURL, garage, winnersPagination);

const buttons = [
  garageController.startRaceButton.element,
  garageController.generateCarsButton.element,
  garagePagination.nextButton.element,
  garagePagination.prevButton.element,
];

garageController.startRaceButton.element.addEventListener('click', async () => {
  garageController.carFormToCreate.changeDisabling(true);

  buttons.forEach((button) => {
    button.disabled = true;
  });
  garageController.resetRaceButton.element.disabled = false;

  const winner = await garage.startRace(garage.cars);
  winners.saveWinner(winner.car.id, +winner.time);
});

garageController.resetRaceButton.element.addEventListener('click', async () => {
  garageController.resetRaceButton.element.disabled = true;
  await Promise.all(garage.cars.map((car) => car.stopDriving()));

  garageController.carFormToCreate.changeDisabling(false);
  buttons.forEach((button) => {
    button.disabled = false;
  });
  garagePagination.updateState(store.carsPage, store.carsPerPage, garage.count);
});

const garageView = new GarageView(garage, garageController, garagePagination);
const winnersView = new WinnersView(winners, winnersPagination);

header.render();
main.appendChild(garageView.element);
main.appendChild(winnersView.element);

header.raceButton.element.addEventListener('click', () => {
  garageView.element.style.display = 'block';
  winnersView.element.style.display = 'none';
});

header.winnersButton.element.addEventListener('click', () => {
  winners.render();
  garageView.element.style.display = 'none';
  winnersView.element.style.display = 'block';
});

document.body.appendChild(main);
