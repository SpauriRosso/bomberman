export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Renderable {
  constructor(className) {
    this.className = className;
  }
}

export class Movement {
  constructor(speed = 1) {
    this.speed = speed;
    this.direction = { x: 0, y: 0 };
  }
}

export class AI {
  constructor(type) {
    this.type = type;
    this.lastUpdate = 0;
  }
}

export class PlayerControlled {
  constructor() {
    this.controls = {
      up: false,
      down: false,
      left: false,
      right: false,
      bomb: false,
    };
  }
}

export class Collider {
  constructor(solid = true) {
    this.solid = solid;
  }
}

export class Bomb {
  constructor() {
    this.timer = 2000;
    this.range = 2;
  }
}
