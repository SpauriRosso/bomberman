export default class MovementSystem {
  update(entities) {
    console.log("Updating movement system...");
    entities.forEach((entity) => {
      const position = entity.getComponent("position");
      const velocity = entity.getComponent("velocity");
      const input = entity.getComponent("inputs");

      if (position && velocity && input) {
        input.update();
        position.x += velocity.vx * input.x;
        position.y += velocity.vy * input.y;
        console.log(position.x, position.y);
      }
    });
  }
}
