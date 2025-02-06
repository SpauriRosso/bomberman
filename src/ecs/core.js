export class Entity {
  constructor() {
    this.id = crypto.randomUUID();
    this.components = new Map();
  }

  addComponent(component) {
    this.components.set(component.constructor.name, component);
    return this;
  }

  getComponent(componentClass) {
    return this.components.get(componentClass.name);
  }

  hasComponent(componentClass) {
    return this.components.has(componentClass.name);
  }
}

export class World {
  constructor() {
    this.entities = new Map();
    this.systems = new Set();
    this.toRemove = new Set();
  }

  addEntity(entity) {
    this.entities.set(entity.id, entity);
    return entity;
  }

  removeEntity(entityId) {
    this.toRemove.add(entityId);
  }

  addSystem(system) {
    this.systems.add(system);
  }

  update(deltaTime) {
    // Update all systems
    for (const system of this.systems) {
      system.update(deltaTime, this.entities);
    }

    // Remove marked entities
    for (const entityId of this.toRemove) {
      this.entities.delete(entityId);
    }
    this.toRemove.clear();
  }
}
