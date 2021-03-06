import { DisplayConstants } from 'Config/display-constants';

export class Backdrop {
    private static readonly ALPHA = 0.8;

    private image: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene) {
        this.image = scene.add.image(DisplayConstants.GAME_CENTER_X, DisplayConstants.GAME_CENTER_Y, 'backdrop');
        this.image.setAlpha(Backdrop.ALPHA);
        this.image.visible = false;
        this.image.setDepth(1);
    }

    public show(): void {
        this.image.visible = true;
    }

    public hide(): void {
        this.image.visible = false;
    }
}
