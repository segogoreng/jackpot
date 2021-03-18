export class GameConstants {
    static readonly BOX_ROWS = 3;

    static readonly BOX_COLS = 3;

    static readonly NUM_OF_BOXES = GameConstants.BOX_ROWS * GameConstants.BOX_COLS;

    static readonly PRIZES = Object.freeze([0, 50, 100, 150, 200, 500, 1000, 100000]);
}
