import { parsePuzzleInput, validate } from "./index";
import input from "./input";

describe("Day 19", () => {
  const interestingRules = [
    [4, 1, 5],
    [
      [2, 3],
      [3, 2],
    ],
    [
      [4, 4],
      [5, 5],
    ],
    [
      [4, 5],
      [5, 4],
    ],
    "a",
    "b",
  ];
  const rules = [
    [1, 2],
    "a",
    [
      [1, 3],
      [3, 1],
    ],
    "b",
  ];

  it(`validate`, () => {
    expect(validate("aab", rules)).toEqual(true);
    expect(validate("aba", rules)).toEqual(true);
    expect(validate("baa", rules)).toEqual(false);
    expect(validate("bab", rules)).toEqual(false);

    expect(validate("ababbb", interestingRules)).toEqual(true);
    expect(validate("bababa", interestingRules)).toEqual(false);
    expect(validate("abbbab", interestingRules)).toEqual(true);
    expect(validate("aaabbb", interestingRules)).toEqual(false);
    expect(validate("aaaabbb", interestingRules)).toEqual(false);
  });

  it(`parsePuzzleInput`, () => {
    const { rules, messages } = parsePuzzleInput(rawInput);
    expect(rules).toEqual(interestingRules);
    expect(messages).toEqual([
      "ababbb",
      "bababa",
      "abbbab",
      "aaabbb",
      "aaaabbb",
    ]);

    expect(
      parsePuzzleInput(`
1: "b"
0: "a"
2: "c"
10: "d"
11: 100 200

abc
cba
bca
`).rules
    ).toEqual(["a", "b", "c", , , , , , , , "d", [100, 200]]);
  });

  it(`Together`, () => {
    const { rules, messages } = parsePuzzleInput(rawInput);
    const validMessages = messages.filter((it) => validate(it, rules));
    expect(validMessages.length).toEqual(2);
  });

  it(`Part 1`, () => {
    const { rules, messages } = parsePuzzleInput(input);
    const validMessages = messages.filter((it) => validate(it, rules));
    expect(validMessages.length).toEqual(235);
  });
});

const rawInput = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;
