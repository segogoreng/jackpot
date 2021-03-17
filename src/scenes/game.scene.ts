import 'phaser';
import { GameConstants } from '../constants/game.constants';

export class GameScene extends Phaser.Scene {
    private giftbox: Phaser.GameObjects.Sprite;
    private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

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

        this.giftbox = this.add.sprite(GameConstants.GAME_CENTER_X, GameConstants.GAME_CENTER_Y, 'giftbox');
        this.giftbox.scale = 0.5;
        this.giftbox.scaleX = 0.85;

        this.tweens.add({
            targets: [this.giftbox],
            repeat: 2,
            duration: 450,
            yoyo: true,
            ease: 'Quad.easeIn',
            scaleX: 0,
        });

        const particles = this.add.particles('particle');
        this.emitter = particles.createEmitter({
            x: GameConstants.GAME_CENTER_X,
            y: GameConstants.GAME_CENTER_Y,
            speed: { min: 400, max: 500 },
            scale: { start: 0.5, end: 0 },
            alpha: { start: 0.85, end: 0.1, ease: 'Quart.easeIn' },
            blendMode: 'ADD',
            lifespan: 500,
            quantity: 1,
        });
    }

    update(): void {}
}
