import { GameConstants } from './constants/game.constants';
import { GameScene } from './scenes/game.scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: GameConstants.GAME_WIDTH,
    height: GameConstants.GAME_HEIGHT,
    parent: 'game',
    scene: [GameScene],
};
