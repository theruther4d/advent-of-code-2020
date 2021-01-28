import {
  toBitString,
  parse,
  apply,
  sumNonZeroValuesInMemory,
  fromBitString,
  applyV2,
  sumNonZeroValuesInMemoryV2,
} from "./index";
import input from "./input.json";

describe("Day 14", () => {
  it("to/from bit string", () => {
    expect(toBitString(11)).toEqual("000000000000000000000000000000001011");
    expect(fromBitString("000000000000000000000000000000001011")).toEqual(11);
    expect(toBitString(101)).toEqual("000000000000000000000000000001100101");
    expect(fromBitString("000000000000000000000000000001100101")).toEqual(101);
    expect(toBitString(0)).toEqual("000000000000000000000000000000000000");
    expect(fromBitString("000000000000000000000000000000000000")).toEqual(0);
  });

  it("parse", () => {
    expect(
      parse(
        "mask = 100110X100000XX0X100X1100110X001X100\nmem[21836] = 68949\nmem[61020] = 7017251\nmask = X00X0011X11000X1010X0X0X110X0X011000\nmem[30885] = 231192\nmem[26930] = 133991367\nmem[1005] = 121034\nmem[20714] = 19917\nmem[55537] = 9402614"
      )
    ).toEqual([
      [
        "100110X100000XX0X100X1100110X001X100",
        [
          [21836, 68949],
          [61020, 7017251],
        ],
      ],
      [
        "X00X0011X11000X1010X0X0X110X0X011000",
        [
          [30885, 231192],
          [26930, 133991367],
          [1005, 121034],
          [20714, 19917],
          [55537, 9402614],
        ],
      ],
    ]);
  });

  it("apply", () => {
    const mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X";
    expect(apply(mask, 11)).toEqual(73);
    expect(apply(mask, 101)).toEqual(101);
    expect(apply(mask, 0)).toEqual(64);
  });

  it("sumNonZeroValuesInMemory", () => {
    const program =
      "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0\n";
    const result = sumNonZeroValuesInMemory(program);

    expect(result).toEqual(165);
  });

  it("Part 1", () => {
    expect(sumNonZeroValuesInMemory(input)).toEqual(10452688630537);
  });

  it("applyV2", () => {
    expect(applyV2("000000000000000000000000000000X1001X", 42)).toEqual([
      26,
      27,
      58,
      59,
    ]);

    expect(
      sumNonZeroValuesInMemoryV2(
        "mask = 000000000000000000000000000000X1001X\nmem[42] = 100\nmask = 00000000000000000000000000000000X0XX\nmem[26] = 1"
      )
    ).toEqual(208);
  });

  it("Part 2", () => {
    expect(sumNonZeroValuesInMemoryV2(input)).toEqual(2881082759597);
  });
});
