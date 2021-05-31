import './registration-form.scss';
import { Form } from '../form';
import { Input } from '../input';

export class RegistrationForm extends Form {
  submitButton: Input;

  cancelButton: Input;

  private readonly firstNameInput: Input;

  private readonly lastNameInput: Input;

  private readonly emailInput: Input;

  private readonly passwordInput: Input;

  constructor() {
    super(['form']);

    this.submitButton = new Input({ type: 'submit', value: 'Add User' }, [
      'btn',
      'secondary-btn',
      'form__submit',
    ]);
    this.cancelButton = new Input({ type: 'submit', value: 'Cancel' }, [
      'btn',
      'primary-btn',
      'form__submit',
    ]);

    this.firstNameInput = new Input(
      {
        type: 'text',
        id: 'first-name',
        name: 'first-name',
        errorMessage: 'Invalid name',
        isRequired: true,
      },
      ['form__input']
    );
    this.firstNameInput.element.addEventListener(
      'input',
      this.firstNameInput.validate
    );

    this.lastNameInput = new Input(
      {
        type: 'text',
        id: 'last-name',
        name: 'last-name',
        errorMessage: 'Invalid name',
        isRequired: true,
      },
      ['form__input']
    );
    this.lastNameInput.element.addEventListener(
      'input',
      this.lastNameInput.validate
    );

    this.emailInput = new Input(
      {
        type: 'email',
        id: 'email',
        name: 'email',
        errorMessage: 'Invalid email address',
        isRequired: true,
      },
      ['form__input']
    );
    this.emailInput.element.addEventListener('input', this.emailInput.validate);

    this.passwordInput = new Input(
      {
        type: 'password',
        id: 'password',
        name: 'password',
        errorMessage: 'Password must contain at least 8 characters',
        isRequired: true,
      },
      ['form__input']
    );
    this.passwordInput.element.addEventListener(
      'input',
      this.passwordInput.validate
    );
  }

  render() {
    const firstNameContainer =
      this.firstNameInput.containerElement('First Name');

    const lastNameContainer = this.lastNameInput.containerElement('Last Name');

    const emailInputContainer = this.emailInput.containerElement('E-mail');

    const passwordInputContainer =
      this.passwordInput.containerElement('Password');

    const row = document.createElement('div');
    row.classList.add('form__row');

    row.appendChild(this.submitButton.element);
    row.appendChild(this.cancelButton.element);

    this.element.appendChild(firstNameContainer);
    this.element.appendChild(lastNameContainer);
    this.element.appendChild(emailInputContainer);
    this.element.appendChild(passwordInputContainer);
    this.element.appendChild(row);
  }

  clearInputs() {
    this.firstNameInput.element.value = '';
    this.lastNameInput.element.value = '';
    this.emailInput.element.value = '';
    this.passwordInput.element.value = '';
  }
}
