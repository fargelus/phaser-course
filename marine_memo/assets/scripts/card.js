class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, id, position) {
    super(scene, position.x, position.y, config.baseCardKey);

    this.scene = scene;
    this.id = id;
    scene.add.existing(this);
    this.opened = false;
    this.animation = new CardAnimation(scene, this);

    this.setInteractive();
  }

  open() {
    this.opened = true;
    this.animation.fold(() => {
      this.setTexture(`${config.baseCardKey}${this.id}`);
      this.animation.expand();
    });
  }

  move(params) {
    this.animation.move(params);
  }

  close() {
    this.opened = false;
    this.animation.fold(() => {
      this.setTexture(`${config.baseCardKey}`);
      this.animation.expand();
    });
  }
}
