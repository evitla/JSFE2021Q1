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

  async listen(eventFunction: () => void, isGarage: boolean): Promise<void> {
    this.nextButton.element.addEventListener('click', async () => {
      if (isGarage) {
        store.carsPage++;
      } else {
        store.winnersPage++;
      }
      eventFunction();
    });

    this.prevButton.element.addEventListener('click', async () => {
      if (isGarage) {
        store.carsPage--;
      } else {
        store.winnersPage--;
      }
      eventFunction();
    });
  }

  updateState(page: number, limit: number, count: number): void {
    if (page * limit < count) {
      this.nextButton.element.disabled = false;
    } else {
      this.nextButton.element.disabled = true;
    }

    if (page > 1) {
      this.prevButton.element.disabled = false;
    } else {
      this.prevButton.element.disabled = true;
    }
  }
}
