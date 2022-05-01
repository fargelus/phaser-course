class CardAnimation {
  constructor(scene, card) {
    this.scene = scene;
    this.card = card;
    this.duration = 150;
    this.function = 'Linear';
  }

  fold(onComplete) {
    this.scene.tweens.add({
      targets: this.card,
      scaleX: 0,
      ease: this.function,
      duration: this.duration,
      onComplete: onComplete
    });
  }

  expand() {
    this.scene.tweens.add({
      targets: this.card,
      scaleX: 1,
      ease: this.function,
      duration: this.duration
    });
  }

  move(params) {
    this.scene.tweens.add({
      targets: this.card,
      x: params.x,
      y: params.y,
      delay: params.delay,
      ease: this.function,
      duration: this.duration * 4
    });
  }
}
