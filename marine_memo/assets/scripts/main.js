const config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    rows: 2,
    cols: 5,
    timerSeconds: 30,
    baseCardKey: 'card',
    cards: [1, 2, 3, 4, 5],
    imagePath: 'assets/sprites',
    scene: new GameScene()
};

const game = new Phaser.Game(config);
