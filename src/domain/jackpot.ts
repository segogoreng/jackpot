import { Random } from '../lib/random';
import { Utils } from './utils';
const random: Random = require('../lib/random');

export class Jackpot {
    private static readonly MIN_NUM_OF_BOXES_OPENNED = 2;
    private static readonly JACKPOT_DISPLAYED_PROBABILITY = 0.8;

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
        if (openIndex < 0 || openIndex >= this.numOfBoxOpenned) {
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
        this.openBoxes = [];
        this.openBoxes.push(this.prizeReceived);
        const prizesRemaining = this.prizes.filter((prize) => prize !== this.prizeReceived);
        let remainingToBeFilled = this.numOfBoxOpenned - 2;
        const jackpot = prizesRemaining.pop();

        if (remainingToBeFilled > 0 && this.isJackpotDisplayed()) {
            this.openBoxes.push(jackpot);
            remainingToBeFilled--;
        }

        for (let i = 0; i < remainingToBeFilled; i++) {
            const pickedIndex = random.int(0, prizesRemaining.length - 1);
            const pickedPrize = prizesRemaining.splice(pickedIndex, 1);
            this.openBoxes.push(...pickedPrize);
        }

        Utils.shuffleArray(this.openBoxes);
        this.openBoxes.push(this.prizeReceived);
    }

    private isJackpotDisplayed(): boolean {
        if (this.isJackpotReceived()) return false;
        if (Math.random() <= Jackpot.JACKPOT_DISPLAYED_PROBABILITY) return true;
        return false;
    }

    private isJackpotReceived(): boolean {
        return this.prizeReceivedIndex === this.prizes.length - 1;
    }
}
