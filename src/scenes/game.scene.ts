import 'phaser';
import { GameConstants } from '../constants/game.constants';

export class GameScene extends Phaser.Scene {
    private giftbox: Phaser.GameObjects.Sprite;
    private tweenGiftbox: Phaser.Tweens.Tween;
    private fireworkEmitter: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

    constructor() {
        super({ key: 'GameScene' });
    }

    preload(): void {
        this.load.image('background', 'assets/images/sky.jpg');
        this.load.image('giftbox', 'assets/images/giftbox.jpg');
        this.load.image('particle', 'assets/images/white.png');
    }

    create(): void {
        this.add.image(GameConstants.GAME_CENTER_X, GameConstants.GAME_CENTER_Y, 'background');

        this.initializeGiftbox();
        this.initializeFireworkEffect();
    }

    update(): void {}

    private initializeGiftbox(): void {
        this.giftbox = this.add.sprite(GameConstants.GAME_CENTER_X, GameConstants.GAME_CENTER_Y, 'giftbox');
        this.giftbox.scale = 0.5;
        this.giftbox.scaleX = 0.85;
        this.giftbox.setDepth(1);

        let ctr = 0;

        this.tweenGiftbox = this.tweens.add({
            targets: [this.giftbox],
            repeat: 2,
            duration: 450,
            yoyo: true,
            ease: 'Quad.easeIn',
            scaleX: 0,
            onYoyo: () => {
                ctr++;
                if (ctr == 3) {
                    this.startFireworkEffect();
                }
            },
        });
    }

    private initializeFireworkEffect(): void {
        const spark0 = this.add.particles('particle');

        for (let i = 0; i < 72; i++) {
            const angle = i * 5;

            const emitter = spark0.createEmitter({
                x: GameConstants.GAME_CENTER_X,
                y: GameConstants.GAME_CENTER_Y,
                angle: { min: angle - 2, max: angle + 2 },
                speed: { min: 100, max: 450 },
                scale: { start: 0.6, end: 0.4 },
                blendMode: 'SCREEN',
                maxParticles: 5,
            });
            emitter.stop();

            this.fireworkEmitter.push(emitter);
        }
    }

    private startFireworkEffect(): void {
        this.fireworkEmitter.forEach((emitter) => {
            emitter.start();
        });
    }
}
