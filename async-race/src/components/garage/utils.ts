import { CarModel } from '../../models/car-model';

const models = [
  'Tesla',
  'Mercedes',
  'BMW',
  'Ferrari',
  'Honda',
  'Toyota',
  'Ford',
  'Volkswagen',
  'Porsche',
  'Bentley',
];

const names = [
  'Model S',
  'Camry',
  'CLK',
  'Combi',
  'Cayene',
  '7 Series',
  '9 Series',
  '11 Series',
  'DB9',
  'Model E',
  'X5',
];

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${model} ${name}`;
};

const getRandomColor = () => {
  const chars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const generateRandomCars = (count = 100): CarModel[] => {
  const result: CarModel[] = [];
  for (let i = 0; i < count; i++) {
    result.push({ name: getRandomName(), color: getRandomColor() });
  }
  return result;
};

export const renderMessage = (name: string, time: string): HTMLElement => {
  const element = document.createElement('div');
  element.className = 'modal';
  element.innerHTML = `
    <div class="modal-content">
      The winner is ${name}. Time: ${time} seconds.
    </div>
  `;
  return element;
};
