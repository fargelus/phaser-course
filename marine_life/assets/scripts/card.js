class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, id, position) {
    super(scene, position.x, position.y, config.baseCardKey + id);

    this.scene = scene;
    this.setOrigin(0, 0);
    scene.add.existing(this);
  }
}
