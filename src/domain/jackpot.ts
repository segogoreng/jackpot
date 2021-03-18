import { Random } from '../lib/random';
const random: Random = require('../lib/random');

export class Jackpot {
    private static readonly MIN_NUM_OF_BOXES_OPENNED = 2;

    private prizes: readonly number[];
    private prizeReceivedIndex: number;
    private prizeReceived: number;
    private numOfBoxes: number;
    private numOfBoxOpenned: number;
    private openBoxes: number[];

    constructor(prizes: readonly number[], prizeReceivedIndex: number, numOfBoxes: number) {
        this.prizes = prizes;
        this.prizeReceivedIndex = prizeReceivedIndex;
        this.prizeReceived = prizes[prizeReceivedIndex];
        this.numOfBoxes = numOfBoxes;
        this.numOfBoxOpenned = this.randomizeNumOfBoxOpenned();

        this.generateOpenBoxesData();
    }

    getPrize(openIndex: number) {
        if (openIndex > this.numOfBoxOpenned) {
            return null;
        }

        return this.openBoxes[openIndex];
    }

    private randomizeNumOfBoxOpenned(): number {
        const mean = (this.numOfBoxes + Jackpot.MIN_NUM_OF_BOXES_OPENNED) / 2;
        const standardDeviation = (this.numOfBoxes - mean) / 2;
        const normalRandom = random.normal(mean, standardDeviation);

        let result = Math.round(normalRandom());
        result = Math.min(result, this.numOfBoxes);
        result = Math.max(result, Jackpot.MIN_NUM_OF_BOXES_OPENNED);

        return result;
    }

    private generateOpenBoxesData() {
        const lastIndex = this.numOfBoxOpenned - 1;
        this.openBoxes = new Array(this.numOfBoxOpenned);

        this.openBoxes[lastIndex] = this.prizeReceived;
    }
}
