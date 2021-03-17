import 'phaser';
import { GameConfig } from './game.config';

export class Game extends Phaser.Game {}

window.onload = () => {
    const game = new Game(GameConfig);
};
