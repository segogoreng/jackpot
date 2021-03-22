import { DisplayConstants } from 'Constants/display-constants';
import { OnCompleteAnimation } from 'Infrastructure/components/on-complete-animation';
import { Random } from 'random';
const random: Random = require('random');

export class GiftBoxView {
    private static readonly SPRITE_SCALE = 0.3;
    private static readonly SPRITE_SCALE_BIG = 0.7;
    private static readonly NUM_OF_EMITTER_FOR_FIREWORK_EFFECT = 72;

    private scene: Phaser.Scene;
    private x: number;
    private y: number;
    private onCompleteAnimation: OnCompleteAnimation;
    private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private boxSprite: Phaser.GameObjects.Sprite;
    private prizeSprite: Phaser.GameObjects.Sprite;
    private prizeSet: boolean;
    private vibratingAnimation: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number, onCompleteAnimation: OnCompleteAnimation) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.onCompleteAnimation = onCompleteAnimation;

        this.particles = scene.add.particles('particle');
        this.particles.setDepth(2);

        this.boxSprite = scene.add.sprite(x, y, 'giftbox').setInteractive();
        this.boxSprite.scale = GiftBoxView.SPRITE_SCALE;

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

    private stopVibratingAnimation(): void {
        this.vibratingAnimation.stop();
    }

    private startOpeningPrizeAnimation(prize: number): void {
        this.stopVibratingAnimation();
        this.startBoxGoesCenterAnimation(prize);
    }

    private startBoxGoesCenterAnimation(prize: number): Phaser.Tweens.Tween {
        this.boxSprite.setDepth(3);

        return this.scene.tweens.add({
            targets: [this.boxSprite],
            duration: 1000,
            ease: 'Cubic.easeOut',
            scale: GiftBoxView.SPRITE_SCALE_BIG,
            x: DisplayConstants.GAME_CENTER_X,
            y: DisplayConstants.GAME_CENTER_Y,
            onComplete: () => {
                this.startBoxAboutToOpenAnimation(prize);
            },
        });
    }

    private startBoxAboutToOpenAnimation(prize: number): Phaser.Tweens.Tween {
        let ctr = 0;
        const tween = this.scene.tweens.add({
            targets: [this.boxSprite],
            repeat: 2,
            duration: 450,
            yoyo: true,
            ease: 'Quad.easeIn',
            scaleX: 0,
            onYoyo: () => {
                ctr++;
                if (ctr === 3) {
                    tween.stop();
                    this.boxSprite.destroy();
                    this.startPrizeRevealingAnimation(prize);
                    this.startFireworkEffect();
                }
            },
        });

        return tween;
    }

    private startPrizeRevealingAnimation(prize: number): Phaser.Tweens.Tween {
        this.prizeSprite = this.scene.add.sprite(this.boxSprite.x, this.boxSprite.y, prize.toString());
        this.prizeSprite.scaleX = 0;
        this.prizeSprite.scaleY = GiftBoxView.SPRITE_SCALE_BIG;
        this.prizeSprite.setDepth(3);

        return this.scene.tweens.add({
            targets: [this.prizeSprite],
            duration: 450,
            ease: 'Quad.easeOut',
            scaleX: GiftBoxView.SPRITE_SCALE_BIG,
            onComplete: () => {
                this.startBoxGoBackAnimation();
            },
        });
    }

    private startFireworkEffect(): void {
        for (let i = 0; i < GiftBoxView.NUM_OF_EMITTER_FOR_FIREWORK_EFFECT; i++) {
            const angle = i * (360 / GiftBoxView.NUM_OF_EMITTER_FOR_FIREWORK_EFFECT);

            this.particles.createEmitter({
                x: DisplayConstants.GAME_CENTER_X,
                y: DisplayConstants.GAME_CENTER_Y,
                angle: { min: angle - 2, max: angle + 2 },
                speed: { min: 250, max: 500 },
                scale: { start: 1.5, end: 0.5, ease: 'Quad.easeIn' },
                alpha: { start: 1, end: 0.0, ease: 'Quint.easeIn' },
                blendMode: 'ADD',
                maxParticles: 3,
                lifespan: 1300,
            });
        }
    }

    private startBoxGoBackAnimation() {
        return this.scene.tweens.add({
            targets: [this.prizeSprite],
            delay: 2000,
            duration: 1000,
            ease: 'Cubic.easeOut',
            scale: GiftBoxView.SPRITE_SCALE,
            x: this.x,
            y: this.y,
            onComplete: () => {
                this.prizeSprite.setDepth(0);
                this.onCompleteAnimation();
            },
        });
    }
}
