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

        this.animateGiftbox();
    }

    update(): void {}

    private animateGiftbox(): void {
        this.giftbox = this.add.sprite(GameConstants.GAME_CENTER_X, GameConstants.GAME_CENTER_Y, 'giftbox');
        this.giftbox.scale = 0.5;
        this.giftbox.scaleX = 0.85;
        this.giftbox.setDepth(1);
        let ctr = 0;

        this.tweens.add({
            targets: [this.giftbox],
            repeat: 2,
            duration: 450,
            yoyo: true,
            ease: 'Quad.easeIn',
            scaleX: 0,
            onYoyo: () => {
                ctr++;
                if (ctr == 3) {
                    this.fireworkEffect();
                }
            },
        });
    }

    private fireworkEffect(): void {
        const p0 = new Phaser.Math.Vector2(595, 405);
        const p1 = new Phaser.Math.Vector2(595, 395);
        const p2 = new Phaser.Math.Vector2(605, 395);
        const p3 = new Phaser.Math.Vector2(605, 405);

        const curve = new Phaser.Curves.CubicBezier(p0, p1, p2, p3);

        const max = 28;
        const points = [];
        const tangents = [];

        for (let c = 0; c <= max; c++) {
            const t = curve.getUtoTmapping(c / max);

            points.push(curve.getPoint(t));
            tangents.push(curve.getTangent(t));
        }

        const tempVec = new Phaser.Math.Vector2();

        const spark0 = this.add.particles('particle');

        for (let i = 0; i < points.length; i++) {
            const p = points[i];

            tempVec.copy(tangents[i]).normalizeRightHand().scale(32).add(p);

            const angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

            spark0.createEmitter({
                x: tempVec.x,
                y: tempVec.y,
                angle: angle,
                speed: { min: 100, max: 500 },
                scale: { start: 0.6, end: 0.4 },
                lifespan: 1000,
                blendMode: 'SCREEN',
                maxParticles: 6,
            });
        }

        for (let i = 0; i < points.length; i++) {
            const p = points[i];

            tempVec.copy(tangents[i]).normalizeRightHand().scale(-32).add(p);

            const angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(p, tempVec));

            spark0.createEmitter({
                x: tempVec.x,
                y: tempVec.y,
                angle: angle,
                speed: { min: 100, max: 500 },
                scale: { start: 0.6, end: 0.4 },
                lifespan: 1000,
                blendMode: 'SCREEN',
                maxParticles: 6,
            });
        }
    }
}
