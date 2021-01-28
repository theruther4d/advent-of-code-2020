import { fixInfiniteLoop, parseInstructions, run } from "./index";
import input from "./input.json";

describe("Day 7", () => {
  it("Part 1", () => {
    expect(run(parseInstructions(testInput))).toEqual([5, true]);
    expect(run(parseInstructions(input))).toEqual([1528, true]);
  });

  it("Part 2", () => {
    expect(run(fixInfiniteLoop(parseInstructions(testInput)))).toEqual([
      8,
      false,
    ]);
    expect(run(fixInfiniteLoop(parseInstructions(input)))).toEqual([
      640,
      false,
    ]);
  });
});

const testInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;
