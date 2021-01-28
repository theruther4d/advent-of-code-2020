import {
  findEncryptionWeakness,
  findInvalidNumber,
  findRangeWhichSumsTo,
} from "./index";
import input from "./input.json";

describe("Day 9", () => {
  it("Part 1", () => {
    expect(findInvalidNumber(5, testInput)).toEqual(127);
    expect(findInvalidNumber(25, input)).toEqual(133015568);
  });

  it("Part 2", () => {
    expect(findRangeWhichSumsTo(127, testInput)).toEqual([15, 25, 47, 40]);
    expect(findEncryptionWeakness(5, testInput)).toEqual(62);
    expect(findEncryptionWeakness(25, input)).toEqual(16107959);
  });
});

const testInput = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576,
];
