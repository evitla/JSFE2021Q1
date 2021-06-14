import { InputAttrsModel } from '../../models/input-attrs-model';

export class Input {
  element: HTMLInputElement;

  constructor(attrs: InputAttrsModel, styles: string[] = []) {
    this.element = document.createElement('input');
    this.element.classList.add(...styles);
    if (attrs.id) this.element.id = attrs.id;
    if (attrs.name) this.element.name = attrs.name;
    if (attrs.type) this.element.type = attrs.type;
    if (attrs.value) this.element.value = attrs.value;
    if (attrs.isDisabled) this.element.disabled = attrs.isDisabled;
  }
}
