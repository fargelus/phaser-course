class GameScene extends Phaser.Scene {
  preload() {
    this.preloadBackground();
    this.preloadCards();
    this.preloadAudio();
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

  preloadAudio() {
    this.load.audio('card', `${config.soundsPath}/card.mp3`);
    this.load.audio('complete', `${config.soundsPath}/complete.mp3`);
    this.load.audio('success', `${config.soundsPath}/success.mp3`);
    this.load.audio('theme', `${config.soundsPath}/theme.mp3`);
    this.load.audio('timeout', `${config.soundsPath}/timeout.mp3`);
  }

  create() {
    this.createSounds();
    this.createBackgroud();
    this.createCards();
    this.createTimer();
  }

  createBackgroud() {
    this.add.image(this.width() / 2, this.height() / 2, 'bg');
  }

  createCards() {
    this.initCards();
    this.placeCardsOnScreen();
    this.input.on('gameobjectdown', this.onCardClicked, this);
  }

  createSounds() {
    this.sounds = {
      'card': this.sound.add('card'),
      'complete': this.sound.add('complete'),
      'success': this.sound.add('success'),
      'theme': this.sound.add('theme'),
      'timeout': this.sound.add('timeout')
    }
    this.sounds.theme.play({
      volume: 0.1
    });
  }

  initCards() {
    this.cards = [];

    for(let value of config.cards) {
      for(let i = 0; i < config.rows; ++i) {
        const initPosition = { x: -this.cardTexture().width, y: -this.cardTexture().height };
        this.cards.push(new Card(this, value, initPosition));
      }
    }
  }

  placeCardsOnScreen() {
    const positions = this.getCardsPositions();
    for(let i = 0; i < this.cards.length; ++i) {
      const position = positions[i];
      const moveParams = {x: position.x, y: position.y, delay: i * 100};
      this.cards[i].move(moveParams);
    }
  }

  cardTexture() {
    return this.textures.get(config.baseCardKey).getSourceImage();
  }

  getCardsPositions() {
    const PADDING = 4;
    const CARD_WITH = this.cardTexture().width + PADDING;
    const CARD_HEIGHT = this.cardTexture().height + PADDING;
    const TIMER_OFFSET_X = 20;
    const OFFSET_X = (this.width() - config.cols * CARD_WITH) / 2 + CARD_WITH / 2 + TIMER_OFFSET_X;
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

  width() {
    return this.sys.game.config.width;
  }

  height() {
    return this.sys.game.config.height;
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
        this.sounds.success.play();
        this.prevOpenedCard = null;
      }
    } else {
      this.prevOpenedCard = card;
    }

    card.open();
    this.sounds.card.play();
    this.checkGameOver();
  }

  checkGameOver() {
    const allCardsOpened = this.cards.every(card => card.opened);
    if (!allCardsOpened) return;

    this.sounds.complete.play();
    this.restartGame();
  }

  restartGame() {
    this.sounds.theme.stop();
    setTimeout(this.create.bind(this), config.restartDelayMsec);
  }

  createTimer() {
    const timerX = 10;
    const timerY = 330;

    this.timerText = this.add.text(timerX, timerY, `Timer: ${config.timerSeconds}`, {
      font: '36px CurseCasual',
      fill: '#fff'
    });

    this.timer = this.time.addEvent({
      delay: 1000,
      repeat: config.timerSeconds,
      callback: this.onTimerTick.bind(this)
    });
  }

  onTimerTick() {
    const timeLeft = this.timer.repeatCount - 1;

    if (timeLeft < 0) {
      this.sounds.timeout.play();
      return this.restartGame();
    }

    this.timerText.setText(`Timer: ${timeLeft}`);
  }
}
