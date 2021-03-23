import 'phaser';
import { DisplayConstants } from 'Config/display-constants';
import { GameConstants } from 'Config/game-constants';
import { Jackpot } from 'Models/jackpot';
import { GiftBoxView } from 'Views/components/giftbox-view';
import { GetPrizeHandler } from 'Handlers/get-prize-handler';
import { BackdropView } from 'Views/components/backdrop-view';

export class GameScene extends Phaser.Scene {
    private jackpot: Jackpot;
    private getPrizeHandler: GetPrizeHandler;
    private backgroundMusic: Phaser.Sound.BaseSound;
    private backdrop: BackdropView;
    private giftboxes: GiftBoxView[];
    private text: Phaser.GameObjects.Text;
    private openingBox: boolean;

    constructor() {
        super({ key: 'GameScene' });

        this.getPrizeHandler = new GetPrizeHandler();
        this.openingBox = false;
    }

    public preload(): void {
        this.load.image('background', 'assets/images/sky.jpg');
        this.load.image('backdrop', 'assets/images/backdrop.png');
        this.load.image('giftbox', 'assets/images/giftbox.jpg');
        this.load.image('particle', 'assets/images/red.png');

        GameConstants.PRIZES.forEach((prize) => {
            this.load.image(prize.toString(), `assets/images/${prize}.jpg`);
        });

        this.load.audio('background-music', 'assets/audio/background-music.mp3');
    }

    public async create() {
        this.backgroundMusic = this.sound.add('background-music', {
            loop: true,
            volume: 0.5,
        });
        this.backgroundMusic.play();

        const prizeIndex = await this.getPrizeHandler.getPrize();
        this.jackpot = new Jackpot(GameConstants.PRIZES, prizeIndex, GameConstants.NUM_OF_BOXES);

        this.add.image(DisplayConstants.GAME_CENTER_X, DisplayConstants.GAME_CENTER_Y, 'background');
        this.initializeGiftBoxes();

        this.text = this.add.text(DisplayConstants.GAME_CENTER_X, DisplayConstants.GAME_CENTER_Y, 'CLICK TO OPEN', {
            fontSize: '60px',
            align: 'center',
            color: 'black',
        });
        this.text.setOrigin(0.5);
        this.text.setDepth(1);
        this.tweens.add({
            targets: [this.text],
            duration: 400,
            scale: 1.3,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1,
        });

        this.backdrop = new BackdropView(this);
    }

    public update(): void {}

    private initializeGiftBoxes() {
        this.giftboxes = [];

        for (let row = 0; row < GameConstants.BOX_ROWS; row++) {
            for (let col = 0; col < GameConstants.BOX_COLS; col++) {
                const x = (DisplayConstants.GAME_WIDTH / GameConstants.BOX_COLS / 2) * (col * 2 + 1);
                const y = (DisplayConstants.GAME_HEIGHT / GameConstants.BOX_ROWS / 2) * (row * 2 + 1);
                const giftbox = new GiftBoxView(this, x, y, () => {
                    this.openingBox = false;
                    this.backdrop.hide();
                    if (this.jackpot.isWinning()) {
                        this.win(giftbox.getPrize());
                    }
                });

                giftbox.getBoxSprite().on('pointerdown', () => {
                    if (!this.openingBox && !this.jackpot.isWinning() && !giftbox.isPrizeSet()) {
                        this.text.visible = false;
                        this.openingBox = true;
                        this.backdrop.show();
                        const prize = this.jackpot.getNextPrize();
                        giftbox.setPrize(prize);
                    }
                });

                this.giftboxes.push(giftbox);
            }
        }
    }

    private win(prize: number): void {
        this.text.setText(`You win ${prize} coins`);
        this.text.visible = true;
    }
}
