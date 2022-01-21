class GameScene extends Phaser.Scene {
  preload() {
    this.preloadBackground();
    this.preloadCards();
  }

  preloadBackground() {
    this.load.image('bg', `${config.imagePath}/background.png`);
  }

  preloadCards() {
    this.load.image(config.baseCardKey, `${config.imagePath}/card.png`);
    for(let i = 1; i <= config.cards.length; ++i) {
      const cardKey = `${config.baseCardKey}${i}`;
      this.load.image(cardKey, `${config.imagePath}/${cardKey}.png`);
    }
  }

  create() {
    this.createBackgroud();
    this.createCards();
  }

  createBackgroud() {
    this.add.image(this.width() / 2, this.height() / 2, 'bg');
  }

  createCards() {
    this.placeCardsOnScreen();
    this.input.on('gameobjectdown', this.onCardClicked, this);
  }

  placeCardsOnScreen() {
    this.cards = [];
    const positions = this.getCardsPositions();

    for(let value of config.cards) {
      for(let i = 0; i < config.rows; ++i) {
        const randomIndex = Math.floor(Math.random() * positions.length);
        this.cards.push(new Card(this, value, positions[randomIndex]));
        positions.splice(randomIndex, 1);
      }
    }
  }

  onCardClicked(_pointer, card) {
    if (card.opened) {
      return;
    }

    if (this.prevOpenedCard) {
      if (this.prevOpenedCard.id != card.id) {
        this.prevOpenedCard.close();
        this.prevOpenedCard = card;
      } else {
        this.prevOpenedCard = null;
      }
    } else {
      this.prevOpenedCard = card;
    }

    card.open();
    this.checkGameOver();
  }

  checkGameOver() {
    const allCardsOpened = this.cards.every(card => card.opened);
    if (!allCardsOpened) return;

    setTimeout(this.placeCardsOnScreen.bind(this), 750);
  }

  width() {
    return this.sys.game.config.width;
  }

  height() {
    return this.sys.game.config.height;
  }

  getCardsPositions() {
    const PADDING = 4;
    const cardTexture = this.textures.get(config.baseCardKey).getSourceImage();
    const CARD_WITH = cardTexture.width + PADDING;
    const CARD_HEIGHT = cardTexture.height + PADDING;
    const OFFSET_X = (this.width() - config.cols * CARD_WITH) / 2 + CARD_WITH / 2;
    const OFFSET_Y = (this.height() - config.rows * CARD_HEIGHT) / 2 + CARD_HEIGHT / 2;

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
}
