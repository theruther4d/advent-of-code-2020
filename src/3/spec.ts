import input from "./input.json";
import { countTrees } from "./index";

describe("Day 3", () => {
  it("Part 1", () => {
    expect(countTrees(testInput, [3, 1])).toEqual(7);
    expect(countTrees(input, [3, 1])).toEqual(262);
  });

  it("Part 2", () => {
    [2, 7, 3, 4, 2].forEach((expected, i) => {
      expect(countTrees(testInput, slopes[i])).toEqual(expected);
    });
    const product = slopes.reduce((product, slope) => {
      return product * countTrees(input, slope);
    }, 1);
    expect(product).toEqual(2698900776);
  });
});

const testInput = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

const slopes: Array<[number, number]> = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];
