import { findTwoNumbersThatAddTo } from "../1";

export function findInvalidNumber(preamble: number, input: number[]) {
  let pool = input.slice(0, preamble);
  let index = preamble;
  let firstInvalidNumber: number;

  while (index < input.length && typeof firstInvalidNumber !== "number") {
    const numbersThatSum = findTwoNumbersThatAddTo(pool, input[index], true);
    const uniqueNumbersThatSum = new Set(numbersThatSum);
    if (!numbersThatSum || uniqueNumbersThatSum.size !== 2) {
      firstInvalidNumber = input[index];
      break;
    }
    index++;
    pool = input.slice(index - preamble, index);
  }

  return firstInvalidNumber;
}

export function findRangeWhichSumsTo(
  target: number,
  input: number[],
  minRangeSize = 2
) {
  let start = 0;
  let stop = start + minRangeSize;
  let inputs = [...input.slice(start + minRangeSize)];
  let sum = input.slice(start, stop).reduce((sum, value) => sum + value, 0);
  let range: number[];

  while (start + stop < input.length) {
    const next = inputs.shift();

    if (sum + next === target) {
      range = input.slice(start, stop + 1);
      break;
    } else if (sum + next < target) {
      sum += next;
      stop++;
    } else {
      start++;
      stop = start + minRangeSize;
      sum = input.slice(start, stop).reduce((sum, value) => sum + value, 0);
      inputs = [...input.slice(start + minRangeSize)];
    }
  }

  return range;
}

export function findEncryptionWeakness(preamble: number, input: number[]) {
  const invalidNumber = findInvalidNumber(preamble, input);
  const range = findRangeWhichSumsTo(invalidNumber, input);
  const min = Math.min(...range);
  const max = Math.max(...range);

  return min + max;
}
