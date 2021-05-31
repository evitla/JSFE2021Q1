import '../modal-window.scss';
import { BaseComponent } from '../../base-component';
import { RegistrationForm } from '../../registration-form/registration-form';
import { DatabaseRecordModel } from '../../../models/database-record-model';
import { Database } from '../../../database';

export class UserRegisterWindow extends BaseComponent {
  userData: DatabaseRecordModel | null = null;

  readonly form: RegistrationForm;

  constructor(database: Database) {
    super('div', ['modal']);
    this.form = new RegistrationForm();

    this.form.submitButton.element.addEventListener('click', async (event) => {
      const data = this.form.getData(event);
      this.userData = await database.write(data);
      window.localStorage.setItem('email', this.userData.email);
      this.element.classList.remove('visible');
    });

    this.form.cancelButton.element.addEventListener('click', () => {
      this.element.classList.remove('visible');
      this.form.clearInputs();
      this.form.clear();
    });
  }

  render() {
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('modal-content');
    const title = document.createElement('h2');
    title.classList.add('section__title');
    title.innerText = 'Register New Player';

    this.form.render();

    this.element.appendChild(contentContainer);
    contentContainer.appendChild(title);
    contentContainer.appendChild(this.form.element);
  }
}
