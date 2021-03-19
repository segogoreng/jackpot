import 'phaser';
import { DisplayConstants } from '../../constants/display-constants';
import { GameConstants } from '../../constants/game-constants';
import { Jackpot } from '../../domain/jackpot';
import { GiftBoxView } from '../components/giftbox-view';
import { JackpotService } from '../services/jackpot-service';
import { Random } from '../util/random';

export class GameScene extends Phaser.Scene {
    private jackpot: Jackpot;
    private jackpotService: JackpotService;
    private giftboxes: GiftBoxView[];
    private particle: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private animating = false;
    private text: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'GameScene' });

        this.jackpotService = new JackpotService();
    }

    public preload(): void {
        this.load.image('background', 'assets/images/sky.jpg');
        this.load.image('giftbox', 'assets/images/giftbox.jpg');
        this.load.image('particle', 'assets/images/white.png');
    }

    public async create() {
        const prizeIndex = await this.jackpotService.getPrize();
        this.jackpot = new Jackpot(new Random(), GameConstants.PRIZES, prizeIndex, GameConstants.NUM_OF_BOXES);

        this.add.image(DisplayConstants.GAME_CENTER_X, DisplayConstants.GAME_CENTER_Y, 'background');
        this.initializeGiftBoxes();
        // this.particle = this.add.particles('particle');

        this.text = this.add.text(DisplayConstants.GAME_CENTER_X, DisplayConstants.GAME_HEIGHT - 30, 'CLICK TO OPEN', {
            fontSize: '40px',
            align: 'center',
            color: 'black',
        });
        this.text.setOrigin(0.5);
        this.text.setDepth(2);
    }

    public update(): void {}

    private initializeGiftBoxes() {
        this.giftboxes = [];

        for (let row = 0; row < GameConstants.BOX_ROWS; row++) {
            for (let col = 0; col < GameConstants.BOX_COLS; col++) {
                const x = (DisplayConstants.GAME_WIDTH / GameConstants.BOX_COLS / 2) * (col * 2 + 1);
                const y = (DisplayConstants.GAME_HEIGHT / GameConstants.BOX_ROWS / 2) * (row * 2 + 1);
                const giftbox = new GiftBoxView(this, x, y);

                giftbox.getSprite().on('pointerdown', () => {
                    if (!this.jackpot.isWinning() && !giftbox.isPrizeSet()) {
                        const prize = this.jackpot.getNextPrize();
                        giftbox.setPrize(prize);
                        if (this.jackpot.isWinning()) {
                            this.win(prize);
                        }
                    }
                });

                this.giftboxes.push(giftbox);
            }
        }
    }

    private win(prize: number): void {
        this.text.setText(`You win ${prize} coins`);
    }

    private startGiftboxAnimation(): void {
        if (!this.animating) {
            this.animating = true;
            let ctr = 0;
            this.tweens.add({
                targets: [this.giftboxes[0].getSprite()],
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
                onComplete: () => {
                    this.animating = false;
                },
            });
        }
    }

    private startFireworkEffect(): void {
        for (let i = 0; i < 72; i++) {
            const angle = i * 5;

            this.particle.createEmitter({
                x: DisplayConstants.GAME_CENTER_X,
                y: DisplayConstants.GAME_CENTER_Y,
                angle: { min: angle - 2, max: angle + 2 },
                speed: { min: 100, max: 350 },
                scale: { start: 0.8, end: 0.6 },
                alpha: { start: 0.8, end: 0.0, ease: 'Quint.easeIn' },
                blendMode: 'SCREEN',
                maxParticles: 5,
                lifespan: 2200,
            });
        }
    }
}
