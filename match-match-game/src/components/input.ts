import { InputAttrsModel } from '../models/input-attrs-model';

export class Input {
  element: HTMLInputElement;

  private errorMessage: string;

  constructor(attrs: InputAttrsModel, styles: string[] = []) {
    this.element = document.createElement('input');
    this.element.classList.add(...styles);
    this.element.type = attrs.type;
    if (attrs.id) this.element.id = attrs.id;
    if (attrs.name) this.element.name = attrs.name;
    if (attrs.value) this.element.value = attrs.value;
    this.errorMessage = attrs.errorMessage || '';
    if (attrs.isRequired) this.element.required = attrs.isRequired;
  }

  containerElement(content = ''): HTMLElement {
    const row = document.createElement('div');
    const bar = document.createElement('span');
    const label: HTMLLabelElement = document.createElement('label');
    row.classList.add('form__row');
    row.setAttribute('data-error', this.errorMessage);
    bar.classList.add('form__bar');
    label.classList.add('form__label');
    label.htmlFor = this.element.id;
    label.innerText = content;

    row.appendChild(this.element);
    row.appendChild(bar);
    row.appendChild(label);

    return row;
  }

  validate = () => {
    const nameRegex = /^[^(0-9~!@#$%*&()_—+=|:;"'`<>,.?\\/\\\s)]{1,30}$/;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^[a-zA-Z0-9]{8,}/;
    let regex: RegExp;
    switch (this.element.type) {
      case 'email':
        regex = emailRegex;
        break;
      case 'password':
        regex = passwordRegex;
        break;
      default:
        regex = nameRegex;
    }
    const isValid = regex.test(this.element.value);

    if (!isValid) {
      this.element.parentElement?.classList.add('invalid');
    } else {
      this.element.parentElement?.classList.remove('invalid');
    }
  };
}
