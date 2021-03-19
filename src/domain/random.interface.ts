export interface IRandom {
    int(min: number, max: number): number;
    normal(mean: number, standardDeviation: number): () => number;
}
