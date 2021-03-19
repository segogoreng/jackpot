export class GiftBoxView {
    private sprite: Phaser.GameObjects.Sprite;
    private text: Phaser.GameObjects.Text;
    private prizeSet: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.sprite = scene.add.sprite(x, y, 'giftbox').setInteractive();
        this.sprite.scale = 0.25;
        this.sprite.scaleX = 0.4;
        this.sprite.setDepth(1);

        this.text = scene.add.text(x, y, '', {
            fontSize: '64px',
            align: 'center',
            color: 'black',
        });
        this.text.setOrigin(0.5);
        this.text.setDepth(2);

        this.prizeSet = false;
    }

    public getSprite(): Phaser.GameObjects.Sprite {
        return this.sprite;
    }

    public setPrize(prize: number) {
        if (!this.prizeSet) {
            this.text.setText(prize.toString());
            this.prizeSet = true;
        }
    }

    public isPrizeSet(): boolean {
        return this.prizeSet;
    }
}
