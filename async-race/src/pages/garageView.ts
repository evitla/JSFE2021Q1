import { GarageController } from '../components/garage-controller/garage-controller';
import { Garage } from '../components/garage/garage';
import { Pagination } from '../components/pagination/pagination';
import store from '../shared/store';

export class GarageView {
  element: HTMLElement;

  constructor(
    rootElement: HTMLElement,
    url: { garage: string; engine: string }
  ) {
    this.element = document.createElement('div');
    this.element.id = 'garage-view';

    const garageContoller = new GarageController(rootElement);
    const pagination = new Pagination();
    const garage = new Garage(rootElement, url, garageContoller, pagination);

    garageContoller.render();
    garage.render(store.carsPage, store.carsPerPage).then(() => {
      pagination.updateState(garage.count);
    });

    this.element.appendChild(garageContoller.element);
    this.element.appendChild(garage.element);
    this.element.appendChild(pagination.element);
  }
}
