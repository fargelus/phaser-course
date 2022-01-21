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
    this.animation.foldCard(() => {
      this.opened = true;
      this.setTexture(`${config.baseCardKey}${this.id}`);
      this.animation.expandCard();
    });
  }

  close() {
    this.animation.foldCard(() => {
      this.opened = false;
      this.setTexture(`${config.baseCardKey}`);
      this.animation.expandCard();
    });
  }
}
