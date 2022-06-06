const config = {
    type: Phaser.CANVAS, // webgl or canvas
    width: 1280,
    height: 720,
    levels: levels,
    timer: {
      x: 10,
      y: 330
    },
    labelsFont: {
      fill: '#fff',
      font: '36px CurseCasual'
    },
    score: {
      x: 1024,
      y: 5,
      color: '#fca547',
      table: {
        1: 100,
        2: 250,
        3: 500,
        4: 1000,
        5: 5000
      }
    },
    restartDelayMsec: 2000,
    baseCardKey: 'card',
    cards: [1, 2, 3, 4, 5],
    imagePath: 'assets/sprites',
    soundsPath: 'assets/sounds',
    scene: new GameScene()
};

const game = new Phaser.Game(config);
