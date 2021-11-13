const config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    scene: {
      preload: preload,
      create: create
    }
};

function preload() {
  this.load.image('bg', 'assets/sprites/background.png');
}

function create() {
  this.add.image(640, 360, 'bg');
}

const game = new Phaser.Game(config);
