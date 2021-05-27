import './registration-form.scss';
import { BaseComponent } from '../base-component';

export class RegistrationForm extends BaseComponent {
  cancelButton: HTMLInputElement;

  constructor() {
    super('form', ['form']);

    this.cancelButton = this.renderSubmitInput('Cancel', [
      'btn',
      'primary-btn',
      'form__submit',
    ]);
  }

  render() {
    const firstNameInput = this.renderInput('First Name', {
      type: 'text',
      id: 'first-name',
      name: 'first-name',
      validation: 'user-name',
      validationLength: '1-30',
      error: 'Invalid name',
      isRequired: true,
    });

    const lastNameInput = this.renderInput('Last Name', {
      type: 'text',
      id: 'last-name',
      name: 'last-name',
      validation: 'user-name',
      validationLength: '1-30',
      error: 'Invalid name',
      isRequired: true,
    });

    const emailInput = this.renderInput('E-mail', {
      type: 'email',
      id: 'email',
      name: 'email',
      validation: 'email',
      validationLength: '1-30',
      error: 'Invalid email address',
      isRequired: true,
    });

    const passwordInput = this.renderInput('Password', {
      type: 'password',
      id: 'password',
      name: 'password',
      validation: 'length',
      validationLength: '8-30',
      error: 'Password must contain 8-30 characters',
      isRequired: true,
    });

    const addUserInput = this.renderSubmitInput('Add User', [
      'btn',
      'secondary-btn',
      'form__submit',
    ]);

    const row = document.createElement('div');
    row.classList.add('form__row');

    row.appendChild(addUserInput);
    row.appendChild(this.cancelButton);

    this.element.appendChild(firstNameInput);
    this.element.appendChild(lastNameInput);
    this.element.appendChild(emailInput);
    this.element.appendChild(passwordInput);
    this.element.appendChild(row);
  }

  clear() {
    this.element.innerText = '';
  }

  private renderInput(
    content: string,
    inputData: {
      type: string;
      id: string;
      name: string;
      validation: string;
      validationLength: string;
      error: string;
      isRequired: boolean;
    }
  ) {
    const row = document.createElement('div');
    row.classList.add('form__row');

    const input: HTMLInputElement = document.createElement('input');
    input.classList.add('form__input');
    input.type = inputData.type;
    input.id = inputData.id;
    input.name = inputData.name;
    input.setAttribute('data-validation', inputData.validation);
    input.setAttribute('data-validation-length', inputData.validationLength);
    input.setAttribute('data-error', inputData.error);
    input.required = inputData.isRequired;

    const bar = document.createElement('span');
    bar.classList.add('form__bar');
    const label: HTMLLabelElement = document.createElement('label');
    label.classList.add('form__label');
    label.htmlFor = inputData.id;
    label.innerText = content;

    row.appendChild(input);
    row.appendChild(bar);
    row.appendChild(label);

    return row;
  }

  private renderSubmitInput(content: string, styles: string[]) {
    const input: HTMLInputElement = document.createElement('input');
    input.classList.add(...styles);
    input.type = 'submit';
    input.value = content;
    input.style.fontSize = '0.875rem';

    return input;
  }
}
