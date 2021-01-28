import { playMemoryGame } from "./index";

describe("Day 15", () => {
  it("playMemoryGame", () => {
    expect(playMemoryGame([0, 3, 6], 10)).toEqual(0);
    expect(playMemoryGame([0, 3, 6], 2020)).toEqual(436);
    expect(playMemoryGame([1, 3, 2], 2020)).toEqual(1);
    expect(playMemoryGame([2, 1, 3], 2020)).toEqual(10);
    expect(playMemoryGame([1, 2, 3], 2020)).toEqual(27);
    expect(playMemoryGame([2, 3, 1], 2020)).toEqual(78);
    expect(playMemoryGame([3, 2, 1], 2020)).toEqual(438);
    expect(playMemoryGame([3, 1, 2], 2020)).toEqual(1836);
  });

  it("Part 1", () => {
    expect(playMemoryGame([0, 20, 7, 16, 1, 18, 15], 2020)).toEqual(1025);
  });

  it("Part 2", () => {
    expect(playMemoryGame([0, 3, 6], 30_000_000)).toEqual(175594);
    expect(playMemoryGame([1, 3, 2], 30_000_000)).toEqual(2578);
    expect(playMemoryGame([2, 1, 3], 30_000_000)).toEqual(3544142);
    expect(playMemoryGame([1, 2, 3], 30_000_000)).toEqual(261214);
    expect(playMemoryGame([2, 3, 1], 30_000_000)).toEqual(6895259);
    expect(playMemoryGame([3, 2, 1], 30_000_000)).toEqual(18);
    expect(playMemoryGame([3, 1, 2], 30_000_000)).toEqual(362);
    expect(playMemoryGame([0, 20, 7, 16, 1, 18, 15], 30_000_000)).toEqual(
      129262
    );
  });
});
