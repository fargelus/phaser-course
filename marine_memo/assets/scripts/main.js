const config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    levels: levels,
    rows: 2,
    cols: 5,
    timer: {
      x: 10,
      y: 330
    },
    labelsFont: {
      fill: '#fff',
      font: '36px CurseCasual'
    },
    restartDelayMsec: 2000,
    baseCardKey: 'card',
    cards: [1, 2, 3, 4, 5],
    imagePath: 'assets/sprites',
    soundsPath: 'assets/sounds',
    scene: new GameScene()
};

const game = new Phaser.Game(config);
