import { sumUniqueAnswers, sumUnanimousAnswers } from "./index";
import input from "./input.json";

describe(`Day 6`, () => {
  it(`Part 1`, () => {
    expect(sumUniqueAnswers(testInput)).toEqual(11);
    expect(sumUniqueAnswers(input)).toEqual(6382);
  });

  it(`Part 2`, () => {
    expect(sumUnanimousAnswers(testInput)).toEqual(6);
    expect(sumUnanimousAnswers(input)).toEqual(3197);
  });
});

const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;
