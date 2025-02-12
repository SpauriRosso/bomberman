class EnemyComponent {
    constructor() {
        this.aiBehavior = "random";
        this.x = 0
        this.y = 0

        this.moves = [
            {x: 0, y: -1}, // Up
            {x: 0, y: 1},  // Down
            {x: -1, y: 0}, // Left
            {x: 1, y: 0}   // Right
        ];
    }

    getRandMove() {
        return this.moves[Math.floor(Math.random() * this.moves.length)];
    }

    update() {
      let move = this.getRandMove()
      this.x = move.x;
      this.y = move.y;
    }
}

export default EnemyComponent;