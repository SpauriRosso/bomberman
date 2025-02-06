import TileMap from "./tileMap.js";
import { World, Entity } from "./ecs/core.js";
import * as Components from "./ecs/components.js";
import * as Systems from "./ecs/systems.js";
import Collision from "./Collision.js";
import Player from "./Player.js";
import Bomb from "./Bomb.js";
import Enemies from "./Enemies.js";

export default class Bomberman {
  constructor() {
    this.board = document.getElementById("game-board");
    this.tileMap = new TileMap();
    this.collision = new Collision(this.tileMap);

    this.init();
  }

  init() {
    this.renderBoard();
    this.initializePlayer();
    this.initializeEnemies();
    this.setupControls();
  }

  initializePlayer() {
    this.player = new Player(1, 1, this.board);
    this.player.render();
  }

  initializeEnemies() {
    this.enemies = new Enemies(
      this.board,
      this.tileMap,
      this.collision,
      this.player
    );
    this.enemies.spawnEnemies(3);
    setInterval(() => this.enemies.moveEnemies(), 1000);
  }
  renderBoard() {
    this.board.innerHTML = "";
    const map = this.tileMap.getMap();

    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.x = x;
        tile.dataset.y = y;

        if (cell === 1) {
          tile.classList.add("wall");
        }

        if (cell === 2) {
          tile.classList.add("brick");
        }

        this.board.appendChild(tile);
      });
    });
  }

  setupControls() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.player.move(0, -1, this.collision);
          break;
        case "ArrowDown":
          this.player.move(0, 1, this.collision);
          break;
        case "ArrowLeft":
          this.player.move(-1, 0, this.collision);
          break;
        case "ArrowRight":
          this.player.move(1, 0, this.collision);
          break;
        case " ":
          this.placeBomb();
          break;
      }
    });
  }

  placeBomb() {
    const bomb = new Bomb(
      this.player.x,
      this.player.y,
      this.board,
      this.tileMap,
      this.collision
    );
    bomb.place();
  }
}

// Start the game
window.addEventListener("DOMContentLoaded", () => {
  const game = new Bomberman();
});
