export class RenderSystem {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
  }

  update(deltaTime, entities) {
    // Clear existing entities
    const renderables = this.gameBoard.querySelectorAll(
      ".player, .enemy, .bomb, .explosion"
    );
    renderables.forEach((el) => el.remove());

    // Render all entities
    entities.forEach((entity) => {
      if (entity.hasComponent(Position) && entity.hasComponent(Renderable)) {
        const pos = entity.getComponent(Position);
        const render = entity.getComponent(Renderable);

        const tile = this.gameBoard.querySelector(
          `.tile[data-x="${Math.floor(pos.x)}"][data-y="${Math.floor(pos.y)}"]`
        );

        if (tile) {
          const element = document.createElement("div");
          element.classList.add(render.className);
          tile.appendChild(element);
        }
      }
    });
  }
}

export class MovementSystem {
  constructor(collision) {
    this.collision = collision;
  }

  update(deltaTime, entities) {
    entities.forEach((entity) => {
      if (entity.hasComponent(Position) && entity.hasComponent(Movement)) {
        const pos = entity.getComponent(Position);
        const movement = entity.getComponent(Movement);

        if (movement.direction.x !== 0 || movement.direction.y !== 0) {
          const newX = pos.x + movement.direction.x * movement.speed;
          const newY = pos.y + movement.direction.y * movement.speed;

          if (
            this.collision.checkCollision(Math.floor(newX), Math.floor(newY))
          ) {
            pos.x = newX;
            pos.y = newY;
          }
        }
      }
    });
  }
}

export class InputSystem {
  constructor() {
    this.setupListeners();
    this.keyStates = new Set();
  }

  setupListeners() {
    document.addEventListener("keydown", (e) => this.keyStates.add(e.code));
    document.addEventListener("keyup", (e) => this.keyStates.delete(e.code));
  }

  update(deltaTime, entities) {
    entities.forEach((entity) => {
      if (
        entity.hasComponent(PlayerControlled) &&
        entity.hasComponent(Movement)
      ) {
        const movement = entity.getComponent(Movement);

        movement.direction.x = 0;
        movement.direction.y = 0;

        if (this.keyStates.has("ArrowLeft")) movement.direction.x = -1;
        if (this.keyStates.has("ArrowRight")) movement.direction.x = 1;
        if (this.keyStates.has("ArrowUp")) movement.direction.y = -1;
        if (this.keyStates.has("ArrowDown")) movement.direction.y = 1;
      }
    });
  }
}

export class AISystem {
  update(deltaTime, entities) {
    let playerPos = null;

    // Find player position
    entities.forEach((entity) => {
      if (entity.hasComponent(PlayerControlled)) {
        playerPos = entity.getComponent(Position);
      }
    });

    if (!playerPos) return;

    entities.forEach((entity) => {
      if (
        entity.hasComponent(AI) &&
        entity.hasComponent(Movement) &&
        entity.hasComponent(Position)
      ) {
        const ai = entity.getComponent(AI);
        const movement = entity.getComponent(Movement);
        const pos = entity.getComponent(Position);

        ai.lastUpdate += deltaTime;
        if (ai.lastUpdate < 1000) return; // Update AI every second
        ai.lastUpdate = 0;

        switch (ai.type) {
          case "chase":
            movement.direction.x = Math.sign(playerPos.x - pos.x);
            movement.direction.y = Math.sign(playerPos.y - pos.y);
            break;
          case "wander":
            movement.direction.x = Math.floor(Math.random() * 3) - 1;
            movement.direction.y = Math.floor(Math.random() * 3) - 1;
            break;
        }
      }
    });
  }
}

export class BombSystem {
  constructor(tileMap, world) {
    this.tileMap = tileMap;
    this.world = world;
  }

  update(deltaTime, entities) {
    entities.forEach((entity) => {
      if (entity.hasComponent(Bomb)) {
        const bomb = entity.getComponent(Bomb);
        const pos = entity.getComponent(Position);

        bomb.timer -= deltaTime;
        if (bomb.timer <= 0) {
          this.explode(pos, bomb.range);
          this.world.removeEntity(entity.id);
        }
      }
    });
  }

  explode(pos, range) {
    const directions = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    directions.forEach((dir) => {
      const x = Math.floor(pos.x + dir.x * range);
      const y = Math.floor(pos.y + dir.y * range);

      const explosion = new Entity()
        .addComponent(new Position(x, y))
        .addComponent(new Renderable("explosion"));

      this.world.addEntity(explosion);

      setTimeout(() => {
        this.world.removeEntity(explosion.id);
      }, 500);

      this.tileMap.destroyBrick(x, y);
    });
  }
}
