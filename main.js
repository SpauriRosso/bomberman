/*const timer = new Timer();
timer.start();

const scoreManager = new ScoreManager();*/

import PlayerEntity from "./entities/PlayerEntity.js";
import GameLogicSystem from "./systems/GameLogicSystem.js";
import RenderSystem from "./systems/RenderSystem.js";
import { generateGrid, findPlayerPosition } from "./utils/tileMap.js";
import MovementSystem from "./systems/MovementSystem.js";

generateGrid();
let { x, y } = findPlayerPosition();

const gameLogicSystem = new GameLogicSystem();
gameLogicSystem.run();
const player = new PlayerEntity(0, x * 64, y * 64); // Initialize player entity with position based on tilemap

gameLogicSystem.addEntity(player);
gameLogicSystem.addSystem(new MovementSystem());
gameLogicSystem.addSystem(new RenderSystem());
console.log(gameLogicSystem);

function gameLoop() {
  gameLogicSystem.update();
  // requestAnimationFrame(gameLoop);
}
console.log("player position on the map", findPlayerPosition());

requestAnimationFrame(gameLoop);
