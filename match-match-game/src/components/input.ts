import { InputAttrsModel } from '../models/input-attrs-model';

export class Input {
  element: HTMLInputElement;

  constructor(attrs: InputAttrsModel, styles: string[] = []) {
    this.element = document.createElement('input');
    this.element.classList.add(...styles);
    this.element.type = attrs.type;
    if (attrs.id) this.element.id = attrs.id;
    if (attrs.name) this.element.name = attrs.name;
    if (attrs.value) this.element.value = attrs.value;
    if (attrs.errorMessage)
      this.element.setAttribute('data-error', attrs.errorMessage);
    if (attrs.isRequired) this.element.required = attrs.isRequired;
  }

  containerElement(content = ''): HTMLElement {
    const row = document.createElement('div');
    const bar = document.createElement('span');
    const label: HTMLLabelElement = document.createElement('label');
    row.classList.add('form__row');
    bar.classList.add('form__bar');
    label.classList.add('form__label');
    label.htmlFor = this.element.id;
    label.innerText = content;

    row.appendChild(this.element);
    row.appendChild(bar);
    row.appendChild(label);

    return row;
  }
}
