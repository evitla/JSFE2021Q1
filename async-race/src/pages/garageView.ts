import { GarageController } from '../components/garage-controller/garage-controller';
import { Garage } from '../components/garage/garage';
import { Pagination } from '../components/pagination/pagination';

export class GarageView {
  element: HTMLElement;

  constructor(
    garage: Garage,
    garageController: GarageController,
    pagination: Pagination
  ) {
    this.element = document.createElement('div');
    this.element.id = 'garage-view';

    garageController.render();
    garage.render();

    this.element.appendChild(garageController.element);
    this.element.appendChild(garage.element);
    this.element.appendChild(pagination.element);
  }
}
