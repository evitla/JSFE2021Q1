import './registration-form.scss';
import { Form } from '../form';
import { Input } from '../input';

export class RegistrationForm extends Form {
  submitButton: Input;

  cancelButton: Input;

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
  }

  render() {
    const firstNameInput = new Input(
      {
        type: 'text',
        id: 'first-name',
        name: 'first-name',
        errorMessage: 'Invalid name',
        isRequired: true,
      },
      ['form__input']
    );
    const firstNameContainer = firstNameInput.containerElement('First Name');

    const lastNameInput = new Input(
      {
        type: 'text',
        id: 'last-name',
        name: 'last-name',
        errorMessage: 'Invalid name',
        isRequired: true,
      },
      ['form__input']
    );
    const lastNameContainer = lastNameInput.containerElement('Last Name');

    const emailInput = new Input(
      {
        type: 'email',
        id: 'email',
        name: 'email',
        errorMessage: 'Invalid email address',
        isRequired: true,
      },
      ['form__input']
    );
    const emailInputContainer = emailInput.containerElement('E-mail');

    const passwordInput = new Input(
      {
        type: 'password',
        id: 'password',
        name: 'password',
        errorMessage: 'Password must contain 8-30 characters',
        isRequired: true,
      },
      ['form__input']
    );
    const passwordInputContainer = passwordInput.containerElement('Password');

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
}
