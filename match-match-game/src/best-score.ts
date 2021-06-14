import { Database } from './database';

export class BestScore {
  private readonly content: HTMLElement;

  private readonly title: HTMLElement;

  constructor(private readonly rootElement: HTMLElement) {
    this.title = document.createElement('h2');
    this.title.classList.add('section__title');
    this.content = document.createElement('div');
    this.content.classList.add('best-score__content');
  }

  async render(database: Database, numOfUsersToShow: number) {
    this.clear();
    this.rootElement.appendChild(this.title);
    this.rootElement.appendChild(this.content);
    this.title.innerText = 'Best Players';

    const dataArray = await database.getFiltered(() => true);

    dataArray.forEach((data, index) => {
      if (index < numOfUsersToShow)
        this.addRow(data.name, data.email, data.score);
    });
  }

  private clear() {
    this.content.innerText = '';
  }

  private addRow(userName: string, userEmail: string, score: number) {
    const row = document.createElement('div');
    row.classList.add('best-score__row');
    const leftCol = document.createElement('div');
    leftCol.classList.add('best-score__row_left');
    const rightCol = document.createElement('div');
    rightCol.classList.add('best-score__row_right');
    leftCol.innerHTML = `
      <p class="best-score__user-name">${userName}</p>
      <p class="best-score__user-email">${userEmail}</p>
    `;
    rightCol.innerHTML = `
      <p class="best-score__user-score">
        Score: <span>${score}</span>
      </p>
    `;

    row.appendChild(leftCol);
    row.appendChild(rightCol);
    this.content.appendChild(row);
  }
}
