class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('bg', 'assets/sprites/background.png');
    this.load.image('card', 'assets/sprites/card.png')
  }

  create() {
    this.add.image(this.width() / 2, this.height() / 2, 'bg');

    this.drawCards();
  }

  drawCards() {
    const positions = this.getCardPositions();
    for (const position of positions) {
      this.add.image(position.x, position.y, 'card').setOrigin(0, 0);
    }
  }

  width() {
    return this.sys.game.config.width;
  }

  height() {
    return this.sys.game.config.height;
  }

  getCardPositions() {
    const PADDING = 4;
    const cardTexture = this.textures.get('card').getSourceImage();
    const CARD_WITH = cardTexture.width + PADDING;
    const CARD_HEIGHT = cardTexture.height + PADDING;
    const COLS = 5;
    const OFFSET_X = (this.width() - COLS * CARD_WITH) / 2;
    const ROWS = 2;
    const OFFSET_Y = (this.height() - ROWS * CARD_HEIGHT) / 2;

    const positions = [];
    for(let row = 0; row < ROWS; ++row) {
      for(let col = 0; col < COLS; ++col) {
        positions.push({
          x: CARD_WITH * col + OFFSET_X,
          y: CARD_HEIGHT * row + OFFSET_Y
        });
      }
    }

    return positions;
  }
}
