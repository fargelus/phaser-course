class CardAnimation {
  constructor(scene, card) {
    this.scene = scene;
    this.card = card;
  }

  foldCard(onComplete) {
    this.scene.tweens.add({
      targets: this.card,
      scaleX: 0,
      ease: 'Linear',
      duration: 300,
      onComplete: onComplete
    });
  }

  expandCard() {
    this.scene.tweens.add({
      targets: this.card,
      scaleX: 1,
      ease: 'Linear',
      duration: 300
    });
  }
}
