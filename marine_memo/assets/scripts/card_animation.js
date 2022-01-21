class CardAnimation {
  constructor(scene, card) {
    this.scene = scene;
    this.card = card;
    this.duration = 150;
    this.function = 'Linear';
  }

  foldCard(onComplete) {
    this.scene.tweens.add({
      targets: this.card,
      scaleX: 0,
      ease: this.function,
      duration: this.duration,
      onComplete: onComplete
    });
  }

  expandCard() {
    this.scene.tweens.add({
      targets: this.card,
      scaleX: 1,
      ease: this.function,
      duration: this.duration
    });
  }
}
