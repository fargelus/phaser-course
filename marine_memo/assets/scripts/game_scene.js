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
    this.createBackgroud();

    this.currentLevel ||= 1;
    this.score ||= new Score(this);
    this.score.render();

    this.createSounds();
    this.createTimer();
    this.createLevelLabel();
    this.createCards();
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

  createSounds() {
    this.sounds = {
      'card': this.sound.add('card'),
      'complete': this.sound.add('complete'),
      'success': this.sound.add('success'),
      'theme': this.sound.add('theme'),
      'timeout': this.sound.add('timeout')
    };
    this.sounds.theme.play({
      volume: 0.1
    });
  }

  createTimer() {
    this.timerText = this.add.text(
      config.timer.x,
      config.timer.y,
      `Timer: ${this.timerSeconds()}`,
      config.labelsFont
    );

    this.timer = this.time.addEvent({
      delay: 1000,
      repeat: this.timerSeconds(),
      callback: this.onTimerTick.bind(this)
    });
    this.timer.paused = true;
  }

  timerSeconds() {
    return config.levels[this.currentLevel].timerSeconds;
  }

  onTimerTick() {
    const timeLeft = this.timer.repeatCount - 1;

    if (timeLeft < 0) {
      this.sounds.timeout.play();
      return this.restartGame();
    }

    this.timerText.setText(`Timer: ${timeLeft}`);
  }

  restartGame() {
    this.sounds.theme.stop();
    this.hideCards();
    this.timer.paused = true;
    setTimeout(this.create.bind(this), config.restartDelayMsec);
  }

  hideCards() {
    const hidePositionX = this.width() + this.cardWidth();
    for(let i = this.cards.length - 1; i >= 0; --i) {
      const delay = (this.cards.length - i) * 100;
      const moveParams = {x: hidePositionX, y: 0, delay: delay};
      this.cards[i].move(moveParams);
    }
  }

  cardWidth() {
    return this.cardTexture().width;
  }

  cardTexture() {
    return this.textures.get(config.baseCardKey).getSourceImage();
  }

  createLevelLabel() {
    const labelX = config.timer.x;
    const labelY = config.timer.y - this.timerText.displayHeight;
    this.add.text(labelX, labelY, `Level: ${this.currentLevel}`, config.labelsFont);
  }

  createCards() {
    this.initCards();
    this.placeCardsOnScreen();
    this.input.on('gameobjectdown', this.onCardClicked, this);
  }

  initCards() {
    this.cards = [];
    this.cardsValues = [...config.cards];
    Phaser.Utils.Array.Shuffle(this.cardsValues);

    const totalCards = this.cardRows() * this.cardCols();
    for(let i = 0; i < totalCards; ++i) {
      const initPosition = { x: -this.cardWidth(), y: -this.cardHeight() };
      const index = Math.floor(i / 2);
      const value = this.cardsValues[index];
      this.cards.push(new Card(this, value, initPosition));
    }
  }

  cardRows() {
    return config.levels[this.currentLevel].rows;
  }

  cardCols() {
    return config.levels[this.currentLevel].cols;
  }

  cardHeight() {
    return this.cardTexture().height;
  }

  placeCardsOnScreen() {
    const positions = this.getCardsPositions();
    for(let i = 0; i < this.cards.length; ++i) {
      const position = positions[i];
      const moveParams = {x: position.x, y: position.y, delay: i * 100};
      this.cards[i].move(moveParams);
    }
  }

  getCardsPositions() {
    const PADDING = 4;
    const CARD_WITH = this.cardWidth() + PADDING;
    const CARD_HEIGHT = this.cardHeight() + PADDING;
    const TIMER_OFFSET_X = 20;
    const OFFSET_X = (this.width() - this.cardCols() * CARD_WITH) / 2 + CARD_WITH / 2 + TIMER_OFFSET_X;
    const OFFSET_Y = (this.height() - this.cardRows() * CARD_HEIGHT) / 2 + CARD_HEIGHT / 2;

    const positions = [];
    for(let row = 0; row < this.cardRows(); ++row) {
      for(let col = 0; col < this.cardCols(); ++col) {
        positions.push({
          x: CARD_WITH * col + OFFSET_X,
          y: CARD_HEIGHT * row + OFFSET_Y
        });
      }
    }

    return positions;
  }

  onCardClicked(_pointer, card) {
    if (card.opened) {
      return;
    }

    if (this.timer.paused) {
      this.timer.paused = false;
    }

    if (this.prevOpenedCard) {
      if (this.prevOpenedCard.id != card.id) {
        this.prevOpenedCard.close();
        this.prevOpenedCard = card;
        this.score.reset();
      } else {
        this.sounds.success.play();
        this.score.up();
        this.prevOpenedCard = null;
      }
    } else {
      this.prevOpenedCard = card;
    }

    card.open();
    this.sounds.card.play();
    this.score.update();
    this.checkGameOver();
  }

  checkGameOver() {
    const allCardsOpened = this.cards.every(card => card.opened);
    if (!allCardsOpened) return;

    if (config.levels[this.currentLevel + 1]) {
      ++this.currentLevel;
    }
    this.sounds.complete.play();
    this.restartGame();
  }
}
