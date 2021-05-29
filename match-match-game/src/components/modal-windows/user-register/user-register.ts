import '../modal-window.scss';
import { BaseComponent } from '../../base-component';
import { RegistrationForm } from '../../registration-form/registration-form';

export class UserRegisterWindow extends BaseComponent {
  private readonly form: RegistrationForm;

  constructor() {
    super('div', ['modal']);
    this.form = new RegistrationForm();
  }

  render() {
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('modal-content');
    const title = document.createElement('h2');
    title.classList.add('section__title');
    title.innerText = 'Register New Player';

    this.form.render();

    this.form.cancelButton.element.addEventListener('click', () => {
      this.element.classList.remove('visible');
      this.form.clear();
    });

    this.element.appendChild(contentContainer);
    contentContainer.appendChild(title);
    contentContainer.appendChild(this.form.element);
  }
}
