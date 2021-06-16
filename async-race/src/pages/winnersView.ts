import { Pagination } from '../components/pagination/pagination';
import { Winners } from '../components/winners/winners';

export class WinnersView {
  element: HTMLElement;

  constructor(winners: Winners, pagination: Pagination) {
    this.element = document.createElement('div');
    this.element.id = 'winners-view';
    this.element.style.display = 'none';

    this.element.appendChild(winners.element);
    this.element.appendChild(pagination.element);
  }
}
