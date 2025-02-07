export default class Player {
  constructor(x, y, gameBoard) {
    this.x = x;
    this.y = y;
    this.gameBoard = gameBoard;
    console.log("Player initialized:", "player rended successfuly", {
      x,
      y,
      gameBoard,
    });
  }

  render() {
    console.log("Rendering player at:", { x: this.x, y: this.y });
    const playerTile = this.gameBoard.querySelector(
      `.tile[data-x="${this.x}"][data-y="${this.y}"]`
    );

    if (!playerTile) {
      console.error("Player tile not found!");
      return;
    }

    const existingPlayer = playerTile.querySelector(".player");
    if (existingPlayer) {
      existingPlayer.remove();
    }

    const playerElement = document.createElement("div");
    playerElement.classList.add("player");
    playerTile.appendChild(playerElement);
    // console.log("Player rendered successfully");
  }

  move(dx, dy, collision) {
    const newX = this.x + dx;
    const newY = this.y + dy;

    if (collision.checkCollision(newX, newY)) {
      const currentTile = this.gameBoard.querySelector(
        `.tile[data-x="${this.x}"][data-y="${this.y}"]`
      );

      currentTile.querySelector(".player")?.remove();
      this.x = newX;
      this.y = newY;
      this.render();
      return true;
    }
    return false;
  }
}
