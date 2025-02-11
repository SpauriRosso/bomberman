export default class Timer {
  constructor() {
    this.startTime = performance.now();
    this.elapsedTime = 0;
    this.running = true;
  }

  start() {
    this.startTime = performance.now();
    this.running = true;
  }

  stop() {
    this.elapsedTime = (performance.now() - this.startTime) / 1000;
    this.running = false;
  }

  reset() {
    this.startTime = performance.now();
    this.elapsedTime = 0;
  }

  update() {
    if (this.running) {
      this.elapsedTime = (performance.now() - this.startTime) / 1000;
    }
  }

  getElapsedTime() {
    return this.elapsedTime;
  }
}
