export default class Enemies {
  constructor(gameBoard, tileMap, collision, player) {
    this.gameBoard = gameBoard;
    this.tileMap = tileMap;
    this.collision = collision;
    this.player = player;
    this.enemies = [];
    this.aiTypes = [
      this.randomWanderAI.bind(this),
      this.chasePlayerAI.bind(this),
      this.defensiveAI.bind(this),
    ];
  }

  spawnEnemies(count) {
    const map = this.tileMap.getMap();
    for (let i = 0; i < count; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * map[0].length);
        y = Math.floor(Math.random() * map.length);
      } while (!this.tileMap.isValidMove(x, y));

      const enemy = {
        x,
        y,
        aiType: this.aiTypes[Math.floor(Math.random() * this.aiTypes.length)],
        health: 3,
      };
      this.enemies.push(enemy);
      this.renderEnemy(enemy);
    }
  }

  renderEnemy(enemy) {
    const enemyTile = this.gameBoard.querySelector(
      `.tile[data-x="${enemy.x}"][data-y="${enemy.y}"]`
    );
    const enemyElement = document.createElement("div");
    enemyElement.classList.add("enemy");
    enemyTile.appendChild(enemyElement);
  }

  moveEnemies() {
    this.enemies.forEach((enemy) => {
      // Apply specific AI behavior
      enemy.aiType(enemy);
    });
  }

  randomWanderAI(enemy) {
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
    ];

    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    this.moveEnemy(enemy, randomDirection.dx, randomDirection.dy);
  }

  chasePlayerAI(enemy) {
    // Simple pathfinding towards player
    const dx = Math.sign(this.player.x - enemy.x);
    const dy = Math.sign(this.player.y - enemy.y);

    // Prioritize x-movement or y-movement randomly
    if (Math.random() > 0.5) {
      this.moveEnemy(enemy, dx, 0);
    } else {
      this.moveEnemy(enemy, 0, dy);
    }
  }

  defensiveAI(enemy) {
    // Move away from player if too close
    const distanceX = Math.abs(this.player.x - enemy.x);
    const distanceY = Math.abs(this.player.y - enemy.y);

    if (distanceX <= 3 || distanceY <= 3) {
      const dx = -Math.sign(this.player.x - enemy.x);
      const dy = -Math.sign(this.player.y - enemy.y);
      this.moveEnemy(enemy, dx, dy);
    } else {
      // Wander if far from player
      this.randomWanderAI(enemy);
    }
  }

  moveEnemy(enemy, dx, dy) {
    const newX = enemy.x + dx;
    const newY = enemy.y + dy;

    if (this.collision.checkCollision(newX, newY)) {
      const currentTile = this.gameBoard.querySelector(
        `.tile[data-x="${enemy.x}"][data-y="${enemy.y}"]`
      );
      const newTile = this.gameBoard.querySelector(
        `.tile[data-x="${newX}"][data-y="${newY}"]`
      );

      currentTile.querySelector(".enemy")?.remove();
      enemy.x = newX;
      enemy.y = newY;
      this.renderEnemy(enemy);
    }
  }
}
