import { evaluate, evaluateV2 } from "./index";
import input from "./input.json";

describe("Day 18", () => {
  it("evaluate", () => {
    expect(evaluate("1 + (2 * 3) + (4 * (5 + 6))")).toEqual(51);
    expect(evaluate("2 * 3 + (4 * 5)")).toEqual(26);
    expect(evaluate("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toEqual(437);
    expect(evaluate("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toEqual(
      12240
    );
    expect(evaluate("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")).toEqual(
      13632
    );
  });

  it("Part 1", () => {
    const sumOfAllLines = input.reduce((sum, line) => {
      return sum + evaluate(line);
    }, 0);
    expect(sumOfAllLines).toEqual(50956598240016);
  });

  it("evaluateV2", () => {
    expect(evaluateV2("1 + 2 + 3")).toEqual(6);
    expect(evaluateV2("1 + 2 * 3 + 4 * 5 + 6")).toEqual(231);
    expect(evaluateV2("1 + (2 * 3) + (4 * (5 + 6))")).toEqual(51);
    expect(evaluateV2("2 * 3 + (4 * 5)")).toEqual(46);
    expect(evaluateV2("5 + (8 * 3 + 9 + 3 * 4 * 3)")).toEqual(1445);
    expect(evaluateV2("5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))")).toEqual(
      669060
    );
    expect(
      evaluateV2("((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2")
    ).toEqual(23340);
  });

  it("Part 2", () => {
    const sumOfAllLines = input.reduce((sum, line) => {
      return sum + evaluateV2(line);
    }, 0);
    expect(sumOfAllLines).toEqual(535809575344339);
  });
});
