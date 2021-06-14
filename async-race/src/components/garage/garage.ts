import { BaseComponent } from '../base-component';
import { CarModel } from '../../models/car-model';
import { Car } from '../car/car';
import { GarageController } from '../garage-controller/garage-controller';

export class Garage extends BaseComponent {
  private title = document.createElement('h1');

  private pageTitle = document.createElement('h2');

  private count: number;

  private page: number;

  constructor(
    rootElement: HTMLElement,
    private url: { garage: string; engine: string },
    private garageController: GarageController
  ) {
    super('div', ['garage']);

    this.garageController.carFormToCreate
      .listen()
      .then((carModel) => this.createCar(carModel));

    this.element.appendChild(this.title);
    this.element.appendChild(this.pageTitle);
    rootElement.appendChild(this.element);
  }

  getCar = async (id: number): Promise<CarModel> => {
    return (await fetch(`${this.url.garage}/${id}`)).json();
  };

  async createCar(body: CarModel): Promise<void> {
    const carModel = (
      await fetch(this.url.garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();

    this.count++;
    this.renderTitle();
    this.renderCar(await carModel);
  }

  async removeCar(car: Car): Promise<CarModel> {
    this.element.removeChild(car.track);

    this.count--;
    this.renderTitle();

    return (
      await fetch(`${this.url.garage}/${car.id}`, { method: 'DELETE' })
    ).json();
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

  async render(page: number, limit: number): Promise<void> {
    const cars = await this.getCars(page, limit);

    this.count = +cars.count;
    this.page = page;

    this.renderTitle();

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

  private renderTitle() {
    this.title.innerText = `Race(${this.count})`;
    this.pageTitle.innerText = `Page ${this.page}`;
  }
}
