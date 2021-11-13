const config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    rows: 2,
    cols: 5,
    scene: {
      preload: preload,
      create: create
    }
};

function preload() {
  this.load.image('bg', 'assets/sprites/background.png');
  this.load.image('card', 'assets/sprites/card.png')
}

function create() {
  this.add.image(config.width / 2, config.height / 2, 'bg');

  drawCards(this);
}

function drawCards(scene) {
  const cardTexture = scene.textures.get('card').getSourceImage();
  const positions = getCardPositions(cardTexture.width, cardTexture.height);
  for (const position of positions) {
    scene.add.image(position.x, position.y, 'card').setOrigin(0, 0);
  }
}

function getCardPositions(cardWith, cardHeight) {
  const PADDING = 4;
  const CARD_WITH = cardWith + PADDING;
  const CARD_HEIGHT = cardHeight + PADDING;
  const OFFSET_X = (config.width - config.cols * CARD_WITH) / 2;
  const OFFSET_Y = (config.height - config.rows * CARD_HEIGHT) / 2;

  const positions = [];
  for(let row = 0; row < config.rows; ++row) {
    for(let col = 0; col < config.cols; ++col) {
      positions.push({
        x: CARD_WITH * col + OFFSET_X,
        y: CARD_HEIGHT * row + OFFSET_Y
      });
    }
  }
  return positions;
}

const game = new Phaser.Game(config);
