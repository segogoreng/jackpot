export class Utils {
    static shuffleArray(array: any[]): any[] {
        let currentIndex = array.length;
        let randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            Utils.swapArrayElements(array, currentIndex, randomIndex);
        }

        return array;
    }

    private static swapArrayElements(array: any[], firstIndex: number, secondIndex: number) {
        let temporaryValue = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = temporaryValue;
    }
}
