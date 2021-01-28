import { processBatch, validatePassport } from "./index";
import { validatePassport as validatePassport2, validators } from "./b";
import input from "./input.json";

describe("Day 4", () => {
  it("Part 1", () => {
    const passports = processBatch(testInput);
    [true, false, true, false].forEach((expected, i) => {
      expect(validatePassport(passports[i])).toEqual(expected);
    });

    const numValid = processBatch(input).reduce(
      (validCount: number, passport) => {
        if (validatePassport(passport)) return validCount + 1;
        return validCount;
      },
      0
    );
    expect(numValid).toEqual(182);
  });

  it("Part 2", () => {
    expect(validators.byr("2002")).toEqual(true);
    expect(validators.byr("2003")).toEqual(false);

    expect(validators.hgt("60in")).toEqual(true);
    expect(validators.hgt("190cm")).toEqual(true);
    expect(validators.hgt("190in")).toEqual(false);
    expect(validators.hgt("190")).toEqual(false);

    expect(validators.hcl("#123abc")).toEqual(true);
    expect(validators.hcl("#123abz")).toEqual(false);
    expect(validators.hcl("123abc")).toEqual(false);

    expect(validators.ecl("brn")).toEqual(true);
    expect(validators.ecl("wat")).toEqual(false);

    expect(validators.pid("000000001")).toEqual(true);
    expect(validators.pid("0123456789")).toEqual(false);

    processBatch(invalidInputs).forEach((passport) => {
      expect(validatePassport2(passport)).toEqual(false);
    });

    processBatch(validInputs).forEach((passport) => {
      expect(validatePassport2(passport)).toEqual(true);
    });

    const numValid = processBatch(input).reduce(
      (validCount: number, passport) => {
        if (validatePassport2(passport)) return validCount + 1;
        return validCount;
      },
      0
    );
    expect(numValid).toEqual(109);
  });
});

const testInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const invalidInputs = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
`;

const validInputs = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
`;
