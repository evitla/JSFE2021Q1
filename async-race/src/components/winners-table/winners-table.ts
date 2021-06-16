import './winners-table.scss';
import { BaseComponent } from '../base-component';
import { WinnerModel } from '../../models/winner-model';
import { Car } from '../car/car';

export class WinnersTable extends BaseComponent {
  winsHead = document.createElement('th');

  bestTimeHead = document.createElement('th');

  constructor() {
    super('table', ['winners-table']);
  }

  render(
    rootElement: HTMLElement,
    winners: { items: WinnerModel[]; count: number }
  ): void {
    this.element.innerHTML = '';
    this.renderHead();
    this.renderBody(winners);
    rootElement.appendChild(this.element);
  }

  private renderHead() {
    const head = document.createElement('thead');
    const headsContent = ['Number', 'Car', 'Name'];

    headsContent.forEach((content) => {
      const th = document.createElement('th');
      th.textContent = content;
      head.appendChild(th);
    });

    this.winsHead.textContent = 'Wins';
    this.bestTimeHead.textContent = 'Best time (seconds)';
    head.appendChild(this.winsHead);
    head.appendChild(this.bestTimeHead);
    this.element.appendChild(head);
  }

  private renderBody(winners: { items: WinnerModel[]; count: number }): void {
    const body = document.createElement('tbody');

    winners.items.forEach((winner, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${new Car(winner.car).renderImage(winner.car.color)}</td>
        <td>${winner.car.name}</td>
        <td>${winner.wins}</td>
        <td>${winner.time}</td>
      `;

      body.appendChild(row);
    });

    this.element.appendChild(body);
  }
}
