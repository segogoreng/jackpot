import 'phaser';
import { GameConfig } from './infrastructure/config/game.config';

window.onload = () => {
    new Phaser.Game(GameConfig);
};
