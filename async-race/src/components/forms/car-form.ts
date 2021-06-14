import { Button } from '../button/button';
import { Form } from './form';
import { Input } from '../input/input';
import { CarModel } from '../../models/car-model';

export class CarForm extends Form {
  modelInput: Input;

  colorInput: Input;

  submitButton: Button;

  constructor(content: string, isDisabled = false) {
    super(['form']);

    this.render(content, isDisabled);
  }

  listen(): Promise<CarModel> {
    return new Promise((resolve) => {
      this.submitButton.element.addEventListener('click', (event) => {
        const formData = this.getData(event);
        resolve(formData);
        this.clear();
      });
    });
  }

  clear(): void {
    this.modelInput.element.value = '';
    this.colorInput.element.value = '#ffffff';
  }

  changeDisabling(isDisabling: boolean): void {
    this.modelInput.element.disabled = isDisabling;
    this.colorInput.element.disabled = isDisabling;
    this.submitButton.element.disabled = isDisabling;
  }

  private render(content: string, isDisabled: boolean) {
    this.modelInput = new Input(
      { type: 'text', id: `${content}-model`, name: 'model', isDisabled },
      ['text-input']
    );

    this.colorInput = new Input(
      {
        type: 'color',
        id: `${content}-color`,
        name: 'color',
        value: '#ffffff',
        isDisabled,
      },
      ['color-input']
    );

    this.submitButton = new Button(content, ['btn', 'primary-btn'], isDisabled);

    this.submitButton.element.type = 'submit';

    this.element.appendChild(this.modelInput.element);
    this.element.appendChild(this.colorInput.element);
    this.element.appendChild(this.submitButton.element);
  }
}
