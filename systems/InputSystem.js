class InputSystem {
  update(entities) {
    entities.forEach((entity) => {
      const inputComponent = entity.getComponent("InputComponent");
      if (inputComponent) {
        // Handle user input
        inputComponent.update();
      }
    });
  }
}
