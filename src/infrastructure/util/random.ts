import { IRandom } from '../../domain/random-interface';
import { Random as RandomLib } from '../../lib/random';
const randomLib: RandomLib = require('../../lib/random');

export class Random implements IRandom {
    int(min: number, max: number): number {
        return randomLib.int(min, max);
    }
    normal(mean: number, standardDeviation: number): () => number {
        return randomLib.normal(mean, standardDeviation);
    }
}
