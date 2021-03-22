import { Random } from 'random';
const random: Random = require('random');

export class GiftBoxView {
    private static readonly SPRITE_SCALE = 0.3;

    private scene: Phaser.Scene;
    private boxSprite: Phaser.GameObjects.Sprite;
    private prizeSprite: Phaser.GameObjects.Sprite;
    private prizeSet: boolean;
    private vibratingAnimation: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;

        this.boxSprite = scene.add.sprite(x, y, 'giftbox').setInteractive();
        this.boxSprite.scale = GiftBoxView.SPRITE_SCALE;
        this.boxSprite.setDepth(1);

        this.prizeSet = false;

        this.startVibratingAnimation();
    }

    public getBoxSprite(): Phaser.GameObjects.Sprite {
        return this.boxSprite;
    }

    public setPrize(prize: number) {
        if (!this.prizeSet) {
            this.prizeSet = true;
            this.startOpeningPrizeAnimation(prize);
        }
    }

    public isPrizeSet(): boolean {
        return this.prizeSet;
    }

    public stopVibratingAnimation(): void {
        this.vibratingAnimation.stop();
    }

    private startVibratingAnimation() {
        this.vibratingAnimation = this.scene.tweens.add({
            targets: [this.boxSprite],
            delay: random.int(0, 500),
            duration: 60,
            y: this.boxSprite.y + 3,
            yoyo: true,
            repeat: -1,
        });
    }

    private startOpeningPrizeAnimation(prize: number): void {
        this.startBoxGoneAnimation(prize);
    }

    private startBoxGoneAnimation(prize: number): Phaser.Tweens.Tween {
        return this.scene.tweens.add({
            targets: [this.boxSprite],
            duration: 300,
            ease: 'Quad.easeOut',
            scaleX: 0,
            onComplete: () => {
                this.startPrizeDisplayAnimation(prize);
            },
        });
    }

    private startPrizeDisplayAnimation(prize: number): Phaser.Tweens.Tween {
        this.prizeSprite = this.scene.add.sprite(this.boxSprite.x, this.boxSprite.y, prize.toString());
        this.prizeSprite.scaleX = 0;
        this.prizeSprite.scaleY = GiftBoxView.SPRITE_SCALE;

        return this.scene.tweens.add({
            targets: [this.prizeSprite],
            duration: 300,
            ease: 'Quad.easeIn',
            scaleX: GiftBoxView.SPRITE_SCALE,
        });
    }
}
