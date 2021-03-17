import 'phaser';
import { GameConstants } from '../constants/game.constants';

export class GameScene extends Phaser.Scene {
    private giftbox: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload(): void {
        this.load.image('background', 'assets/images/sky.jpg');
        this.load.image('giftbox', 'assets/images/giftbox.jpg');
    }

    create(): void {
        this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, 'background');

        this.giftbox = this.add.sprite(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, 'giftbox');
        this.giftbox.scale = 0.5;
    }

    update(): void {}
}
