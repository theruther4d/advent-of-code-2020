import {
  departureValuesProduct,
  orderRules,
  Rule,
  ticketScanningErrorRate,
} from "./index";
import input from "./input.json";

const inputRules: Rule[] = Object.keys(input.rules).map((name) => ({
  name,
  value: input.rules[name],
}));

describe("Day 16", () => {
  it("Part 1", () => {
    const rules = [
      {
        name: "class",
        value: [
          [1, 3],
          [5, 7],
        ],
      },
      {
        name: "row",
        value: [
          [6, 11],
          [33, 44],
        ],
      },
      {
        name: "seat",
        value: [
          [13, 40],
          [45, 50],
        ],
      },
    ];
    const nearbyTickets = [
      [7, 3, 47],
      [40, 4, 50],
      [55, 2, 20],
      [38, 6, 12],
    ];
    expect(ticketScanningErrorRate(rules as Rule[], nearbyTickets)).toEqual(71);

    expect(ticketScanningErrorRate(inputRules, input.nearbyTickets)).toEqual(
      26941
    );
  });

  it("Part 2", () => {
    const rules: Rule[] = [
      {
        name: "class",
        value: [
          [0, 1],
          [4, 19],
        ],
      },
      {
        name: "row",
        value: [
          [0, 5],
          [8, 19],
        ],
      },
      {
        name: "seat",
        value: [
          [0, 13],
          [16, 19],
        ],
      },
    ];
    const nearbyTickets = [
      [3, 9, 18],
      [15, 1, 5],
      [5, 14, 9],
    ];
    expect(orderRules(rules, nearbyTickets).map((it) => it.name)).toEqual([
      "row",
      "class",
      "seat",
    ]);
    expect(
      departureValuesProduct(inputRules, input.nearbyTickets, input.yourTicket)
    ).toEqual(634796407951);
  });
});
