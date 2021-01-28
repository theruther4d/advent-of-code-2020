import {
  modelSeatingLayout,
  getAdjacentSpots,
  countOccupiedSeats,
  countFinalOccupiedSeats,
  getFirstSeatInEveryDirection,
  modelSeatingLayout2,
  makeGrid,
} from "./index";
import input from "./input.json";

describe("Day 11", () => {
  it("Part 1", () => {
    const grid = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ];
    expect(getAdjacentSpots(0, 0, grid)).toEqual(["b", "d", "e"]);
    expect(getAdjacentSpots(1, 1, grid)).toEqual([
      "a",
      "b",
      "c",
      "d",
      "f",
      "g",
      "h",
      "i",
    ]);

    expect(modelSeatingLayout(sampleInput)).toEqual(sampleInputIter1);
    expect(modelSeatingLayout(sampleInputIter1)).toEqual(sampleInputIter2);
    expect(modelSeatingLayout(sampleInputIter2)).toEqual(sampleInputIter3);
    expect(modelSeatingLayout(sampleInputIter3)).toEqual(sampleInputIter4);
    expect(modelSeatingLayout(sampleInputIter4)).toEqual(stableSampleInput);
    expect(modelSeatingLayout(stableSampleInput)).toEqual(stableSampleInput);

    expect(countOccupiedSeats(stableSampleInput)).toEqual(37);

    expect(countFinalOccupiedSeats(sampleInput)).toEqual(37);
    expect(countFinalOccupiedSeats(input)).toEqual(2296);
  });

  it("Part 2", () => {
    expect(
      getFirstSeatInEveryDirection(
        4,
        3,
        makeGrid(`.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`)
      ).length
    ).toEqual(8);
    expect(
      getFirstSeatInEveryDirection(
        1,
        1,
        makeGrid(`.............
.L.L.#.#.#.#.
.............`)
      ).length
    ).toEqual(1);
    expect(modelSeatingLayout2(sampleInput)).toEqual(sampleInput2Iter1);
    expect(modelSeatingLayout2(sampleInput2Iter1)).toEqual(sampleInput2Iter2);
    expect(modelSeatingLayout2(sampleInput2Iter2)).toEqual(sampleInput2Iter3);
    expect(modelSeatingLayout2(sampleInput2Iter3)).toEqual(sampleInput2Iter4);
    expect(modelSeatingLayout2(sampleInput2Iter4)).toEqual(sampleInput2Iter5);
    expect(modelSeatingLayout2(sampleInput2Iter5)).toEqual(stableSampleInput2);
    expect(modelSeatingLayout2(stableSampleInput2)).toEqual(stableSampleInput2);

    expect(countOccupiedSeats(stableSampleInput2)).toEqual(26);
    expect(countFinalOccupiedSeats(input, modelSeatingLayout2)).toEqual(2089);
  });
});

const sampleInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const sampleInputIter1 = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`;

const sampleInputIter2 = `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`;

const sampleInputIter3 = `#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##`;

const sampleInputIter4 = `#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##`;

const stableSampleInput = `#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##`;

const sampleInput2Iter1 = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`;

const sampleInput2Iter2 = `#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`;

const sampleInput2Iter3 = `#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#`;

const sampleInput2Iter4 = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#`;

const sampleInput2Iter5 = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#`;

const stableSampleInput2 = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#`;
