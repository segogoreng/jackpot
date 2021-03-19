import { IRandom } from '../../domain/random-interface';
import { Random as RandomLib } from 'seedrandom';

export class Random implements IRandom {
    public int(min: number, max: number): number {
        return RandomLib.int(min, max);
    }

    public normal(mean: number, standardDeviation: number): () => number {
        return RandomLib.normal(mean, standardDeviation);
    }
}
