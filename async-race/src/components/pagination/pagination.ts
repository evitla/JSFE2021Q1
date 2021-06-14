import store from '../../shared/store';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';

export class Pagination extends BaseComponent {
  prevButton = new Button('prev', ['btn', 'primary-btn']);

  nextButton = new Button('next', ['btn', 'primary-btn']);

  constructor() {
    super('div', ['pagination']);

    this.element.appendChild(this.prevButton.element);
    this.element.appendChild(this.nextButton.element);
  }

  async listen(eventFunction: () => void): Promise<void> {
    this.nextButton.element.addEventListener('click', async () => {
      store.carsPage++;
      eventFunction();
    });

    this.prevButton.element.addEventListener('click', async () => {
      store.carsPage--;
      eventFunction();
    });
  }

  updateState(count: number): void {
    if (store.carsPerPage * store.carsPage < count) {
      this.nextButton.element.disabled = false;
    } else {
      this.nextButton.element.disabled = true;
    }

    if (store.carsPage > 1) {
      this.prevButton.element.disabled = false;
    } else {
      this.prevButton.element.disabled = true;
    }
  }
}
