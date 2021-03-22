import { DisplayConstants } from 'Constants/display-constants';
import { GameScene } from 'Infrastructure/scenes/game-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: DisplayConstants.GAME_WIDTH,
    height: DisplayConstants.GAME_HEIGHT,
    parent: 'game',
    scene: [GameScene],
};
