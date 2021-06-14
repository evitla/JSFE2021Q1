import { BaseComponent } from '../base-component';
import { CarModel } from '../../models/car-model';
import { Car } from '../car/car';
import { GarageController } from '../garage-controller/garage-controller';
import { Pagination } from '../pagination/pagination';
import store from '../../shared/store';

export class Garage extends BaseComponent {
  count: number;

  constructor(
    rootElement: HTMLElement,
    private url: { garage: string; engine: string },
    private garageController: GarageController,
    private pagination: Pagination
  ) {
    super('div', ['garage']);

    this.garageController.carFormToCreate
      .listen()
      .then((carModel) => this.createCar(carModel));

    this.pagination.listen(async () => {
      this.element.innerHTML = '';
      await this.render();
      this.garageController.renderTitle(this.count);
    });

    rootElement.appendChild(this.element);
  }

  async createCar(body: CarModel): Promise<void> {
    const carModel = (
      await fetch(this.url.garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();

    this.count++;
    this.garageController.renderTitle(this.count);
    this.render();

    return carModel;
  }

  async removeCar(car: Car): Promise<CarModel> {
    const carModel = (
      await fetch(`${this.url.garage}/${car.id}`, { method: 'DELETE' })
    ).json();

    this.count--;
    this.garageController.renderTitle(this.count);
    this.render();

    return carModel;
  }

  async updateCar(car: Car, newCarModel: CarModel): Promise<CarModel> {
    car.renderName(newCarModel.name);
    car.renderImage(newCarModel.color);

    return (
      await fetch(`${this.url.garage}/${car.id}`, {
        method: 'PUT',
        body: JSON.stringify(newCarModel),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
  }

  async render(): Promise<void> {
    this.element.innerHTML = '';
    const cars = await this.getCars(store.carsPage, store.carsPerPage);
    this.pagination.updateState(this.count);

    this.count = +cars.count;
    this.garageController.renderTitle(this.count);

    cars.models.forEach((model) => this.renderCar(model));
  }

  private async getCars(
    page: number,
    limit: number
  ): Promise<{ models: CarModel[]; count: string }> {
    const response = await fetch(
      `${this.url.garage}?_page=${page}&_limit=${limit}`
    );

    return {
      models: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  }

  private renderCar(carModel: CarModel) {
    const car = new Car(carModel, this.url.engine);

    car.selectButton.element.addEventListener('click', async () => {
      car.removeButton.element.disabled = true;
      this.garageController.carFormToUpdate.changeDisabling(false); // enable update form

      const newCarModel = await this.garageController.carFormToUpdate.listen();
      await this.updateCar(car, newCarModel);

      car.removeButton.element.disabled = false;
      this.garageController.carFormToUpdate.changeDisabling(true); // disable update form
    });

    car.removeButton.element.addEventListener('click', async () => {
      await this.removeCar(car);
    });

    this.element.appendChild(car.track);
  }
}
