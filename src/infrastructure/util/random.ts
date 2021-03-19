import { IRandom } from '../../domain/random-interface';
import { Random as RandomLib } from 'random';
const randomLib: RandomLib = require('random');

export class Random implements IRandom {
    public int(min: number, max: number): number {
        return randomLib.int(min, max);
    }

    public normal(mean: number, standardDeviation: number): () => number {
        return randomLib.normal(mean, standardDeviation);
    }
}
