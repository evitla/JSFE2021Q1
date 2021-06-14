import { CarModel } from '../../models/car-model';

export class Form {
  element: HTMLFormElement;

  data: CarModel | null = null;

  constructor(styles: string[] = []) {
    this.element = document.createElement('form');
    this.element.classList.add(...styles);
  }

  getData(event: Event): CarModel {
    event.preventDefault();
    const fd: FormData = new FormData(this.element);

    this.data = {
      name: `${fd.get('model')}`,
      color: `${fd.get('color')}`,
    };

    return this.data;
  }
}
