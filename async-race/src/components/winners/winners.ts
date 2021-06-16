import { WinnerModel } from '../../models/winner-model';
import store from '../../shared/store';
import { BaseComponent } from '../base-component';
import { Garage } from '../garage/garage';
import { Pagination } from '../pagination/pagination';
import { WinnersTable } from '../winners-table/winners-table';

export class Winners extends BaseComponent {
  private table = new WinnersTable();

  private count: number;

  constructor(
    private winnersURL: string,
    private garage: Garage,
    private pagination: Pagination
  ) {
    super('div', ['winners']);

    this.pagination.listen(async () => {
      this.element.innerHTML = '';
      await this.render();
    }, false);
  }

  async render(): Promise<void> {
    this.element.innerHTML = '';
    const cars = await this.getWinners(
      store.winnersPage,
      store.winnersPerPage,
      store.sortBy,
      store.sortOrder
    );

    this.count = +cars.count;
    this.renderTitle();
    this.table.render(this.element, cars);
    this.pagination.updateState(
      store.winnersPage,
      store.winnersPerPage,
      this.count
    );
  }

  listen(): void {
    const getSortedWinners = async (sort: string) => {
      store.sortBy = sort;
      store.sortOrder = store.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      const winners = await this.getWinners(
        store.winnersPage,
        store.winnersPerPage,
        store.sortBy,
        store.sortOrder
      );
      this.table.renderBody(winners);
    };

    this.table.winsHead.addEventListener('click', async () => {
      await getSortedWinners('wins');
    });

    this.table.bestTimeHead.addEventListener('click', async () => {
      await getSortedWinners('time');
    });
  }

  async saveWinner(id: number, time: number): Promise<void> {
    const winnerStatus = await this.getWinnerStatus(id);

    if (winnerStatus === 404) {
      await this.createWinner({ id, wins: 1, time });
      return;
    }

    const winner = await this.getWinner(id);
    await this.updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }

  private async getWinners(
    page: number,
    limit: number,
    sort: string,
    order: string
  ) {
    const sortOrder = sort && order ? `&_sort=${sort}&_order=${order}` : '';

    const response = await fetch(
      `${this.winnersURL}?_page=${page}&_limit=${limit}${sortOrder}`
    );

    const items: WinnerModel[] = await response.json();

    return {
      items: await Promise.all(
        items.map(async (winner: WinnerModel) => ({
          ...winner,
          car: await this.garage.getCar(winner.id),
        }))
      ),
      count: +response.headers.get('X-Total-Count'),
    };
  }

  private async getWinner(id: number): Promise<WinnerModel> {
    return (await fetch(`${this.winnersURL}/${id}`)).json();
  }

  private async getWinnerStatus(id: number) {
    return (await fetch(`${this.winnersURL}/${id}`)).status;
  }

  private async createWinner(body: WinnerModel) {
    return (
      await fetch(this.winnersURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
  }

  private async updateWinner(id: number, body: WinnerModel) {
    return (
      await fetch(`${this.winnersURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
  }

  private renderTitle() {
    const title = document.createElement('h1');
    const pageTitle = document.createElement('h2');
    title.innerText = `Winners(${this.count})`;
    pageTitle.innerText = `Page ${store.winnersPage}`;

    this.element.appendChild(title);
    this.element.appendChild(pageTitle);
  }
}
