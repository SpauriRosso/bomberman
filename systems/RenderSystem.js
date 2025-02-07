export default class RenderSystem {
  constructor() {
    this.container = document.getElementById("gameGrid");
  }
  update(entities) {
    console.log("Updating render system...");
    // Afficher les entités sur l'écran
    entities.forEach((entity) => {
      let entityDOM = document.createElement("div");

      entityDOM.id = entity.id;
      console.log("Entity ID:", entity.id);

      let position = entity.getComponent("position");
      let offset = { x: 0, y: 0 };
      entityDOM.style.position = "absolute";
      entityDOM.style.top = `${position.y + offset.y}px`;
      entityDOM.style.left = `${position.x + offset.x}px`;
      entityDOM.style.width = "64px";
      entityDOM.style.height = "64px";

      entityDOM.style.background = "black"; // Default for other entities

      this.container.appendChild(entityDOM);
    });
  }
}
