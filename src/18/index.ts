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

export function evaluateV2(expression: string): number {
  if (numeric.test(expression)) {
    const [, stringValue] = numeric.exec(expression);
    return parseInt(stringValue);
  }

  while (addParser.test(expression)) {
    expression = expression.replace(addParser, (_, left, operator, right) => {
      switch (operator) {
        case "+":
          return String(evaluate(left) + evaluate(right));
        // case "*":
        //   return String(evaluate(left) * evaluate(right));
        default:
          throw new Error(`Invalid operator in addParser "${operator}"`);
      }
    });
  }

  while (multiplyParser.test(expression)) {
    expression = expression.replace(
      multiplyParser,
      (_, left, operator, right) => {
        switch (operator) {
          // case "+":
          //   return String(evaluate(left) + evaluate(right));
          case "*":
            return String(evaluate(left) * evaluate(right));
          default:
            throw new Error(`Invalid operator in multiplyParser "${operator}"`);
        }
      }
    );
  }

  return evaluate(expression);
}

const numeric = /^\(?(\d+)\)?$/;
const parser = /(\d+|\([^\(\)]+\))\s([\+\*])\s(\d+|\([^\(\)]+\))/;
const addParser = /(\d+|\([^\(\)]+\))\s([\+])\s(\d+|\([^\(\)]+\))/;
const multiplyParser = /(\d+|\([^\(\)]+\))\s([\+])\s(\d+|\([^\(\)]+\))/;
