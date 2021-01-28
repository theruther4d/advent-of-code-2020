import { Password } from "./index";
import { Password as PasswordB } from "./b";
import input from "./input.json";

describe("Day 2", () => {
  it("Part 1", () => {
    expect(Password.from("1-3 a: abcde").valid).toBe(true);
    expect(Password.from("1-3 b: cdefg").valid).toBe(false);
    expect(Password.from("2-9 c: ccccccccc").valid).toBe(true);

    const validPasswords = input.reduce((validCount, string) => {
      if (Password.from(string).valid) return validCount + 1;
      return validCount;
    }, 0);
    expect(validPasswords).toEqual(477);
  });

  it("Part 2", () => {
    expect(PasswordB.from("1-3 a: abcde").valid).toBe(true);
    expect(PasswordB.from("1-3 b: cdefg").valid).toBe(false);
    expect(PasswordB.from("2-9 c: ccccccccc").valid).toBe(false);

    const validPasswords = input.reduce((validCount, string) => {
      if (PasswordB.from(string).valid) return validCount + 1;
      return validCount;
    }, 0);
    expect(validPasswords).toEqual(686);
  });
});
