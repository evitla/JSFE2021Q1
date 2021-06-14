import './garage-controller.scss';
import { BaseComponent } from '../base-component';
import { CarForm } from '../forms/car-form';
import { Button } from '../button/button';

export class GarageController extends BaseComponent {
  carFormToCreate = new CarForm('create');

  carFormToUpdate = new CarForm('update', true);

  startRaceButton = new Button('Start', ['btn', 'primary-btn']);

  resetRaceButton = new Button('Reset', ['btn', 'primary-btn']);

  generateCarsButton = new Button('Generate cars', ['btn', 'secondary-btn']);

  constructor(rootElement: HTMLElement) {
    super('div', ['garage-controller']);

    rootElement.appendChild(this.element);
  }

  render(): void {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'garage-controller_buttons';

    this.element.appendChild(this.carFormToCreate.element);
    this.element.appendChild(this.carFormToUpdate.element);
    buttonsContainer.appendChild(this.startRaceButton.element);
    buttonsContainer.appendChild(this.resetRaceButton.element);
    buttonsContainer.appendChild(this.generateCarsButton.element);
    this.element.appendChild(buttonsContainer);
  }
}
