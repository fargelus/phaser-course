class StartScene extends Phaser.Scene {
  constructor() {
    super('Start');
  }

  preload() {
    this.preloadBackground();
  }

  preloadBackground() {
    this.load.image('bg', `${config.imagePath}/bg.png`);
  }

  create() {
    this.createBackgroud();
  }

  createBackgroud() {
    this.add.image(this.width() / 2, this.height() / 2, 'bg');
  }

  width() {
    return this.sys.game.config.width;
  }

  height() {
    return this.sys.game.config.height;
  }
}
