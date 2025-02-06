export default class Bomb {
  constructor(x, y, gameBoard, tileMap, collision) {
    this.x = x;
    this.y = y;
    this.gameBoard = gameBoard;
    this.tileMap = tileMap;
    this.collision = collision;
  }

  place() {
    const bombTile = this.gameBoard.querySelector(
      `.tile[data-x="${this.x}"][data-y="${this.y}"]`
    );

    const bombElement = document.createElement("div");
    bombElement.classList.add("bomb");
    bombTile.appendChild(bombElement);

    return new Promise((resolve) => {
      setTimeout(() => {
        this.detonate();
        resolve();
      }, 2000);
    });
  }

  detonate() {
    const explosionDirections = [
      { dx: 0, dy: 0 }, // Center
      { dx: -1, dy: 0 }, // Left
      { dx: 1, dy: 0 }, // Right
      { dx: 0, dy: -1 }, // Up
      { dx: 0, dy: 1 }, // Down
    ];

    explosionDirections.forEach(({ dx, dy }) => {
      const explodeX = this.x + dx;
      const explodeY = this.y + dy;

      if (this.collision.checkExplosionCollision(explodeX, explodeY)) {
        const explosionTile = this.gameBoard.querySelector(
          `.tile[data-x="${explodeX}"][data-y="${explodeY}"]`
        );

        const explosionElement = document.createElement("div");
        explosionElement.classList.add("explosion");
        explosionTile.appendChild(explosionElement);

        // Destroy bricks
        this.tileMap.destroyBrick(explodeX, explodeY);
      }
    });

    this.clearExplosion(explosionDirections);
  }

  clearExplosion(explosionDirections) {
    setTimeout(() => {
      const bombTile = this.gameBoard.querySelector(
        `.tile[data-x="${this.x}"][data-y="${this.y}"]`
      );
      bombTile.querySelector(".bomb")?.remove();

      explosionDirections.forEach(({ dx, dy }) => {
        const explodeX = this.x + dx;
        const explodeY = this.y + dy;
        const explosionTile = this.gameBoard.querySelector(
          `.tile[data-x="${explodeX}"][data-y="${explodeY}"]`
        );
        explosionTile.querySelector(".explosion")?.remove();
      });
    }, 500);
  }
}
