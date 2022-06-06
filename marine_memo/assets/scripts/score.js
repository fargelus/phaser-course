class Score {
  constructor(scene) {
    this.points = 0;
    this.scene = scene;
    this.pairs = 0;
  }

  render() {
    this.score = this.scene.add.text(config.score.x, config.score.y, this.scoreText(), {
      fill: config.score.color,
      font: config.labelsFont.font
    });
  }

  scoreText() {
    return `${this.points} points`;
  }

  update() {
    this.score.setText(this.scoreText());
  }

  reset() {
    this.pairs = 0;
  }

  up() {
    this.points += config.score.table[++this.pairs];
  }
}
