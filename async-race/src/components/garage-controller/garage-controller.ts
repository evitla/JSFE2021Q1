import './garage-controller.scss';
import { BaseComponent } from '../base-component';
import { CarForm } from '../forms/car-form';
import { Button } from '../button/button';
import store from '../../shared/store';

export class GarageController extends BaseComponent {
  carFormToCreate = new CarForm('create');

  carFormToUpdate = new CarForm('update', true);

  startRaceButton = new Button('Start', ['btn', 'primary-btn']);

  resetRaceButton = new Button('Reset', ['btn', 'primary-btn']);

  generateCarsButton = new Button('Generate cars', ['btn', 'secondary-btn']);

  private title = document.createElement('h1');

  private pageTitle = document.createElement('h2');

  constructor(rootElement: HTMLElement) {
    super('div', ['garage-controller']);

    rootElement.appendChild(this.element);
  }

  render(): void {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'garage-controller__buttons';

    this.element.appendChild(this.carFormToCreate.element);
    this.element.appendChild(this.carFormToUpdate.element);
    buttonsContainer.appendChild(this.startRaceButton.element);
    buttonsContainer.appendChild(this.resetRaceButton.element);
    buttonsContainer.appendChild(this.generateCarsButton.element);
    this.element.appendChild(buttonsContainer);

    this.element.appendChild(this.title);
    this.element.appendChild(this.pageTitle);
  }

  renderTitle(count: number): void {
    this.title.innerText = `Race(${count})`;
    this.pageTitle.innerText = `Page ${store.carsPage}`;
  }
}
