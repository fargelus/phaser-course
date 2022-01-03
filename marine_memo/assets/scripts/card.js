class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, id, position) {
    super(scene, position.x, position.y, config.baseCardKey);

    this.scene = scene;
    this.id = id;
    this.setOrigin(0, 0);
    scene.add.existing(this);

    this.setInteractive();
  }

  open() {
    this.setTexture(config.baseCardKey + this.id);
  }
}