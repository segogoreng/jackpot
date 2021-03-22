import 'phaser';
import { DisplayConstants } from 'Constants/display-constants';
import { GameConstants } from 'Constants/game-constants';
import { Jackpot } from 'Domain/jackpot';
import { GiftBoxView } from 'Infrastructure/components/giftbox-view';
import { JackpotService } from 'Infrastructure/services/jackpot-service';

export class GameScene extends Phaser.Scene {
    private jackpot: Jackpot;
    private jackpotService: JackpotService;
    private giftboxes: GiftBoxView[];
    private text: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'GameScene' });

        this.jackpotService = new JackpotService();
    }

    public preload(): void {
        this.load.image('background', 'assets/images/sky.jpg');
        this.load.image('giftbox', 'assets/images/giftbox.jpg');
        this.load.image('particle', 'assets/images/white.png');

        GameConstants.PRIZES.forEach((prize) => {
            this.load.image(prize.toString(), `assets/images/${prize}.jpg`);
        });
    }

    public async create() {
        const prizeIndex = await this.jackpotService.getPrize();
        this.jackpot = new Jackpot(GameConstants.PRIZES, prizeIndex, GameConstants.NUM_OF_BOXES);

        this.add.image(DisplayConstants.GAME_CENTER_X, DisplayConstants.GAME_CENTER_Y, 'background');
        this.initializeGiftBoxes();

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

                giftbox.getBoxSprite().on('pointerdown', () => {
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
}
