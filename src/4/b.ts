const validate = {
  isNumber: (value?: string) =>
    typeof value === "string" &&
    typeof parseInt(value) === "number" &&
    !Number.isNaN(parseInt(value)),
  isString: (value?: string) => typeof value === "string",
};

const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

export const validators = {
  byr: (it?: string) =>
    validate.isString(it) &&
    it.length === 4 &&
    validate.isNumber(it) &&
    parseInt(it) >= 1920 &&
    parseInt(it) <= 2002,
  iyr: (it?: string) =>
    validate.isString(it) &&
    it.length === 4 &&
    validate.isNumber(it) &&
    parseInt(it) >= 2010 &&
    parseInt(it) <= 2020,
  eyr: (it?: string) =>
    validate.isString(it) &&
    it.length === 4 &&
    validate.isNumber(it) &&
    parseInt(it) >= 2020 &&
    parseInt(it) <= 2030,
  hgt: (it?: string) => {
    if (!validate.isString(it)) return false;

    if (/cm/.test(it)) {
      const num = it.replace(/cm/, "");
      return (
        validate.isNumber(num) && parseInt(num) >= 150 && parseInt(num) <= 193
      );
    }

    if (/in/.test(it)) {
      const num = it.replace(/in/, "");
      return (
        validate.isNumber(num) && parseInt(num) >= 59 && parseInt(num) <= 76
      );
    }

    return false;
  },
  hcl: (it?: string) => validate.isString(it) && /\#[0-9a-f]{6}/i.test(it),
  ecl: (it?: string) => eyeColors.includes(it),
  pid: (it?: string) => validate.isString(it) && /^[0-9]{9}$/.test(it),
  cid: () => true,
};

export const validatePassport = (passport: Record<string, string>) => {
  let issues = [];
  return Object.keys(validators).every((field) => {
    const validate = validators[field];
    const valid = validate(passport[field]);
    if (!valid) {
      issues.push(field);
    }
    return valid;
  });
};
