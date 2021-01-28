import { fixExpenseReport, fixExpenseReportTriple } from "./index";
import input from "./input.json";

describe("Challenge 1", () => {
  it("Part 1", () => {
    expect(fixExpenseReport(testInput)).toEqual(514579);
    expect(fixExpenseReport(input)).toEqual(927684);
  });

  it("Part 2", () => {
    expect(fixExpenseReportTriple(testInput)).toEqual(241861950);
    expect(fixExpenseReportTriple(input)).toEqual(292093004);
  });
});

const testInput = [1721, 979, 366, 299, 675, 1456];
