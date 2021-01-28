export function evaluate(expression: string): number {
  if (numeric.test(expression)) {
    const [, stringValue] = numeric.exec(expression);
    return parseInt(stringValue);
  }

  while (parser.test(expression)) {
    expression = expression.replace(parser, (_, left, operator, right) => {
      switch (operator) {
        case "+":
          return String(evaluate(left) + evaluate(right));
        case "*":
          return String(evaluate(left) * evaluate(right));
        default:
          throw new Error(`Invalid operator "${operator}"`);
      }
    });
  }

  return evaluate(expression);
}

const numeric = /^\(?(\d+)\)?$/;
const parser = /(\d+|\([^\(\)]+\))\s([\+\*])\s(\d+|\([^\(\)]+\))/;
