export default class Collision {
  constructor(tileMap) {
    this.tileMap = tileMap;
  }

  checkCollision(x, y) {
    return this.tileMap.isValidMove(x, y);
  }

  checkExplosionCollision(x, y) {
    return (
      x >= 0 &&
      x < this.tileMap.getMap()[0].length &&
      y >= 0 &&
      y < this.tileMap.getMap().length &&
      this.tileMap.getMap()[y][x] !== 1
    );
  }
}
