export default class Bomb {
  // Static property to track if any bomb is currently active
  static activeBomb = false;

  constructor(x, y, gameBoard, tileMap, collision) {
    this.x = x;
    this.y = y;
    this.gameBoard = gameBoard;
    this.tileMap = tileMap;
    this.collision = collision;
    this.isPlaced = false;
    this.isDetonated = false;
    this.bombElement = null;
    this.explosionElements = [];
    this.boundHandleKeyPress = this.handleKeyPress.bind(this);

    document.addEventListener("keydown", this.boundHandleKeyPress);
  }

  handleKeyPress(event) {
    if (
      event.keyCode === 32 &&
      !this.isPlaced &&
      !this.isDetonated &&
      !Bomb.activeBomb
    ) {
      this.place();
    }
  }

  async place() {
    if (this.isPlaced || Bomb.activeBomb) return;

    this.isPlaced = true;
    Bomb.activeBomb = true;
    document.removeEventListener("keydown", this.boundHandleKeyPress);

    const bombTile = this.gameBoard.querySelector(
      `.tile[data-x="${this.x}"][data-y="${this.y}"]`
    );

    // Remove any existing bombs on this tile
    const existingBomb = bombTile.querySelector(".bomb");
    if (existingBomb) {
      existingBomb.remove();
    }

    this.bombElement = document.createElement("div");
    this.bombElement.classList.add("bomb");
    bombTile.appendChild(this.bombElement);

    // Wait for detonation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await this.detonate();
  }

  async detonate() {
    if (this.isDetonated) return;

    this.isDetonated = true;
    const explosionDirections = [
      { dx: 0, dy: 0 }, // Center
      { dx: -1, dy: 0 }, // Left
      { dx: 1, dy: 0 }, // Right
      { dx: 0, dy: -1 }, // Up
      { dx: 0, dy: 1 }, // Down
    ];

    // Clear any existing explosions first
    this.clearAllExplosions();

    explosionDirections.forEach(({ dx, dy }) => {
      const explodeX = this.x + dx;
      const explodeY = this.y + dy;

      if (this.collision.checkExplosionCollision(explodeX, explodeY)) {
        const explosionTile = this.gameBoard.querySelector(
          `.tile[data-x="${explodeX}"][data-y="${explodeY}"]`
        );

        if (explosionTile) {
          // Clear any existing explosion
          const existingExplosion = explosionTile.querySelector(".explosion");
          if (existingExplosion) {
            existingExplosion.remove();
          }

          const explosionElement = document.createElement("div");
          explosionElement.classList.add("explosion");
          explosionTile.appendChild(explosionElement);
          this.explosionElements.push(explosionElement);

          // Destroy bricks
          this.tileMap.destroyBrick(explodeX, explodeY);
        }
      }
    });

    // Remove bomb element
    if (this.bombElement && this.bombElement.parentNode) {
      this.bombElement.remove();
      this.bombElement = null;
    }

    // Clear explosions after delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    this.clearAllExplosions();

    // Reset the active bomb flag after explosion is complete
    Bomb.activeBomb = false;
  }

  clearAllExplosions() {
    // Clear all explosion elements
    this.explosionElements.forEach((element) => {
      if (element && element.parentNode) {
        element.remove();
      }
    });
    this.explosionElements = [];
  }

  destroy() {
    document.removeEventListener("keydown", this.boundHandleKeyPress);
    this.clearAllExplosions();
    if (this.bombElement && this.bombElement.parentNode) {
      this.bombElement.remove();
    }
    this.isPlaced = true;
    this.isDetonated = true;
    Bomb.activeBomb = false;
  }
}
