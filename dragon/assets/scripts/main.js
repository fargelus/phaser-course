const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [StartScene],
  imagePath: 'assets/sprites'
};

new Phaser.Game(config);
