import { DatabaseRecordModel } from '../models/database-record-model';

export class Form {
  element: HTMLFormElement;

  data: DatabaseRecordModel | null = null;

  constructor(styles: string[] = []) {
    this.element = document.createElement('form');
    this.element.classList.add(...styles);
  }

  getData(event: Event): DatabaseRecordModel {
    event.preventDefault();
    const fd: FormData = new FormData(this.element);

    this.data = {
      name: `${fd.get('first-name')} ${fd.get('last-name')}`,
      email: `${fd.get('email')}`,
      password: `${fd.get('password')}`,
      score: 0,
    };

    return this.data;
  }

  clear() {
    this.element.innerText = '';
  }
}
