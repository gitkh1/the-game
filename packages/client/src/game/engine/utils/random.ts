export const randFloat = (min = 1, max = 0) => Math.random() * (max - min) + min;
export const randInt = (min: number, max = 0) => Math.floor(randFloat(min, max));
export const randChoice = <T>(array: T[]) => array[randInt(array.length)];
