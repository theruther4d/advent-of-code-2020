const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  /*"cid"*/
];

export const processBatch = (batch: string) => {
  return batch.split(/\n{2}/).map((raw) => {
    const pairs = raw.split(/\s|\n/);
    const passport = {};

    pairs.forEach((pair) => {
      const [key, value] = pair.split(":");
      passport[key] = value;
    });

    return passport;
  });
};

export const validatePassport = (passport: Record<string, string>) => {
  return requiredFields.every((field) => {
    return field in passport;
  });
};
