import {
  findJoltageDifferenceDistributions,
  findNumValidCombinations,
  getBuiltInJoltageAdapterRating,
} from "./index";
import input from "./input.json";

describe(`Day 10`, () => {
  it("Part 1", () => {
    expect(getBuiltInJoltageAdapterRating(testInput)).toEqual(22);
    expect(findJoltageDifferenceDistributions(testInput)).toEqual({
      1: 7,
      3: 5,
    });
    expect(findJoltageDifferenceDistributions(testInput2)).toEqual({
      1: 22,
      3: 10,
    });
    const differences = findJoltageDifferenceDistributions(input);
    expect(differences[1] * differences[3]).toEqual(1755);
  });

  it("Part 2", () => {
    expect(findNumValidCombinations(testInput)).toEqual(8);
    expect(findNumValidCombinations(testInput2)).toEqual(19208);
    expect(findNumValidCombinations(input)).toEqual(4049565169664);
  });
});

const testInput = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
const testInput2 = [
  28,
  33,
  18,
  42,
  31,
  14,
  46,
  20,
  48,
  47,
  24,
  23,
  49,
  45,
  19,
  38,
  39,
  11,
  1,
  32,
  25,
  35,
  8,
  17,
  7,
  9,
  4,
  2,
  34,
  10,
  3,
];
