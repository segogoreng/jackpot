import 'phaser';
import { GameConfig } from 'Infrastructure/config/game-config';

window.onload = () => {
    new Phaser.Game(GameConfig);
};
