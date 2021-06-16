import { CarModel } from './car-model';

export interface WinnerModel {
  wins: number;
  time: number;
  car?: CarModel;
  id?: number;
}
