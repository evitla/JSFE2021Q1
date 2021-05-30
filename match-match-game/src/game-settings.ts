export class GameSettings {
  cardsType: string = '';

  difficulty: string = '';

  private readonly content: HTMLElement;

  private readonly cardsTypeInput: HTMLInputElement;

  private readonly difficultyInput: HTMLInputElement;

  constructor(private readonly rootElement: HTMLElement) {
    this.content = document.createElement('div');
    this.content.classList.add('settings__content');

    this.cardsTypeInput = document.createElement('input');
    this.difficultyInput = document.createElement('input');

    this.cardsTypeInput.addEventListener('input', () => {
      this.cardsType = this.cardsTypeInput.value;
    });

    this.difficultyInput.addEventListener('input', () => {
      this.difficulty = this.difficultyInput.value;
    });
  }

  render() {
    this.clear();
    this.rootElement.appendChild(this.content);
    this.renderList(
      this.cardsTypeInput,
      'Game cards',
      ['animals', 'cars', 'cities'],
      'cards',
      'cards',
      'cards-list',
      'select games card type'
    );
    this.renderList(
      this.difficultyInput,
      'Difficulty',
      ['4x4', '6x6', '8x8'],
      'difficulty',
      'difficulty',
      'difficulty-list',
      'select game type'
    );
  }

  private clear() {
    this.content.innerText = '';
  }

  private renderList(
    input: HTMLInputElement,
    content: string,
    options: string[],
    id: string,
    name: string,
    list: string,
    placeholder: string
  ) {
    const container = document.createElement('div');
    container.classList.add('settings__container');
    const listLabel: HTMLLabelElement = document.createElement('label');
    const datalist: HTMLDataListElement = document.createElement('datalist');
    listLabel.textContent = content;
    listLabel.htmlFor = name;
    input.id = id;
    input.name = name;
    input.setAttribute('list', list);
    input.placeholder = placeholder;
    datalist.id = list;

    options.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      datalist.appendChild(option);
    });

    container.appendChild(listLabel);
    container.appendChild(input);
    container.appendChild(datalist);
    this.content.appendChild(container);
  }
}
