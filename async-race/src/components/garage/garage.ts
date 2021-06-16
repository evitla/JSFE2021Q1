import { BaseComponent } from '../base-component';
import { CarModel } from '../../models/car-model';
import { Car } from '../car/car';
import { GarageController } from '../garage-controller/garage-controller';
import { Pagination } from '../pagination/pagination';
import store from '../../shared/store';
import { generateRandomCars } from './utils';

const RANDOM_CARS_COUNT = 100;

export class Garage extends BaseComponent {
  cars: Car[] = [];

  count: number;

  constructor(
    rootElement: HTMLElement,
    private url: { garage: string; engine: string; winners: string },
    private garageController: GarageController,
    private pagination: Pagination
  ) {
    super('div', ['garage']);

    this.listen();

    rootElement.appendChild(this.element);
  }

  private listen() {
    this.garageController.carFormToCreate.submitButton.element.addEventListener(
      'click',
      async (event) => {
        const formData = this.garageController.carFormToCreate.getData(event);
        await this.createCar(formData);
        await this.render();
        this.garageController.carFormToCreate.clear();
      }
    );

    this.garageController.generateCarsButton.element.addEventListener(
      'click',
      async () => {
        const cars = generateRandomCars(RANDOM_CARS_COUNT);
        await Promise.all(cars.map((car) => this.createCar(car)));
        await this.render();
      }
    );

    this.pagination.listen(async () => {
      this.element.innerHTML = '';
      await this.render();
    }, true);
  }

  async startRace(cars: Car[]): Promise<{ car: Car; time: string }> {
    const promises = this.cars.map((car) => car.startDriving());
    const winner = await this.raceAll(
      promises,
      cars.map((car) => car.id)
    );

    return winner;
  }

  private async raceAll(
    promises: Promise<{ success: boolean; id: number; time: number }>[],
    ids: number[]
  ): Promise<{ car: Car; time: string }> {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedIndex = ids.findIndex((i) => i === id);
      const restPromises = [
        ...promises.slice(0, failedIndex),
        ...promises.slice(failedIndex + 1, promises.length),
      ];
      const restIds = [
        ...ids.slice(0, failedIndex),
        ...ids.slice(failedIndex + 1, ids.length),
      ];
      return this.raceAll(restPromises, restIds);
    }

    return {
      car: this.cars.find((car) => car.id === id),
      time: (time / 1000).toFixed(2),
    };
  }

  async createCar(body: CarModel): Promise<void> {
    const carModel = (
      await fetch(this.url.garage, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();

    return carModel;
  }

  async removeCar(car: Car): Promise<CarModel> {
    const carModel = (
      await fetch(`${this.url.garage}/${car.id}`, { method: 'DELETE' })
    ).json();

    await this.render();

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
    this.cars = [];
    const cars = await this.getCars(store.carsPage, store.carsPerPage);

    this.count = +cars.count;
    this.garageController.renderTitle(this.count);

    cars.models.forEach((model) => this.renderCar(model));
    this.pagination.updateState(store.carsPage, store.carsPerPage, this.count);
  }

  getCar = async (id: number): Promise<CarModel> => {
    return (await fetch(`${this.url.garage}/${id}`)).json();
  };

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

  private async deleteWinner(id: number): Promise<void> {
    (await fetch(`${this.url.winners}/${id}`, { method: 'DELETE' })).json();
  }

  private renderCar(carModel: CarModel) {
    const car = new Car(carModel, this.url.engine);
    car.render();
    this.cars.push(car);

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
      await this.deleteWinner(car.id);
    });

    this.element.appendChild(car.track);
  }
}
