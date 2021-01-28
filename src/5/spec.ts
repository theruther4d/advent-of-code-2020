import { decodeSeat, findMissingSeat } from "./index";
import input from "./input.json";

describe("Day 5", () => {
  it("Part 1", () => {
    expect(decodeSeat("FBFBBFFRLR")).toEqual({ row: 44, column: 5, id: 357 });
    expect(decodeSeat("BFFFBBFRRR")).toEqual({ row: 70, column: 7, id: 567 });
    expect(decodeSeat("FFFBBBFRRR")).toEqual({ row: 14, column: 7, id: 119 });
    expect(decodeSeat("BBFFBBFRLL")).toEqual({ row: 102, column: 4, id: 820 });

    const highestSeatId = input.reduce((highest, seat) => {
      const { id } = decodeSeat(seat);
      return Math.max(highest, id);
    }, -1);

    expect(highestSeatId).toBe(928);
  });

  it("Part 2", () => {
    expect(findMissingSeat(input)).toEqual(610);
  });
});
