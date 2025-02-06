class Timer {
  constructor() {
    this.time = 0;
    this.intervalId = null;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.time++;
      this.updateTime();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  updateTime() {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.getElementById("timer").innerText = timeString;
  }
}

export default Timer;
