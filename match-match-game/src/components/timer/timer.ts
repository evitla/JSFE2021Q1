import './timer.scss';
import { BaseComponent } from '../base-component';

export class Timer extends BaseComponent {
  currentTime = 0;

  private minutes = 0;

  private seconds = 0;

  private minutesText: HTMLElement;

  private secondsText: HTMLElement;

  constructor() {
    super('div', ['timer']);
    this.minutesText = document.createElement('span');
    this.secondsText = document.createElement('span');
    this.render();
  }

  updateTime(): number {
    return window.setInterval(() => {
      this.currentTime++;
      this.render();
    }, 1000);
  }

  clear() {
    this.currentTime = 0;
    this.render();
  }

  renderText(): string {
    if (this.minutes === 0) return `${this.seconds} seconds`;
    if (this.minutes === 1) return `1 minute and ${this.seconds} seconds`;
    return `${this.minutes} minutes and ${this.seconds} seconds`;
  }

  private render() {
    const padTime = (time: number) => time.toString().padStart(2, '0');
    this.minutes = Math.floor(this.currentTime / 60);
    this.seconds = this.currentTime % 60;
    this.minutesText.innerText = `${padTime(this.minutes)}:`;
    this.secondsText.innerText = padTime(this.seconds);
    this.element.appendChild(this.minutesText);
    this.element.appendChild(this.secondsText);
  }
}
