export function findTwoNumbersThatAddTo(
  numbers: number[],
  target: number,
  unique = false
) {
  let second: number;
  const first = numbers.find((a) => {
    return numbers.find((b) => {
      const addsUp = a + b === target;
      const valid = unique ? addsUp && a !== b : addsUp;

      if (valid) {
        second = b;
        return true;
      }
    });
  });

  if (typeof first !== "number" || typeof second !== "number") return null;
  return [first, second];
}

export function fixExpenseReport(expenses: number[], target = 2020) {
  return findTwoNumbersThatAddTo(expenses, target).reduce((product, it) => {
    return it * product;
  }, 1);
}

export function fixExpenseReportTriple(expenses: number[], target = 2020) {
  let product: number;

  expenses.find((a) => {
    return expenses.find((b) => {
      return expenses.find((c) => {
        if (a + b + c === target) {
          product = a * b * c;
          return true;
        }
      });
    });
  });

  return product;
}
