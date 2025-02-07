export default class InputComponent {
  constructor() {
    this.x = 0; // Déplacement horizontal
    this.y = 0; // Déplacement vertical
    this.keys = new Set(); // Ensemble des touches pressées

    window.addEventListener("keydown", (e) => {
      this.keys.add(e.key);
      console.log("keydown ");
    });

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key);
      console.log("keyup ");
    });
  }

  update() {
    // Réinitialiser les déplacements
    this.x = 0;
    this.y = 0;

    // Mise à jour en fonction des touches pressées
    for (const key of this.keys) {
      switch (key) {
        case "q":
          this.x = -1;
          break;
        case "d":
          this.x = 1;
          break;
        case "z":
          this.y = -1;
          break;
        case "s":
          this.y = 1;
          break;
        default:
          // Handle unknown keys
          console.log(`Unknown key: ${key}`);
          break;
      }
    }
  }
}
