function evaluator(expression: string, parsers: Parser[]) {
  parsers.forEach((parser) => {
    while (parser.test(expression)) {
      expression = expression.replace(parser.regex, (_, ...matches) => {
        return String(
          parser.transform((match) => evaluator(match, parsers), ...matches)
        );
      });
    }
  });

  return parseInt(expression);
}

function add(evaluate: Evaluator, left: string, right: string) {
  return evaluate(left) + evaluate(right);
}

function multiply(evaluate: Evaluator, left: string, right: string) {
  return evaluate(left) * evaluate(right);
}

class Parser {
  constructor(
    public regex: RegExp,
    public transform: (evaluator: Evaluator, ...matches: string[]) => number
  ) {}

  test = (value: string) => this.regex.test(value);
}

const uselessParenthesisParser = new Parser(
  /\((\d+)\)/,
  (evaluate, soleNumber) => evaluate(soleNumber)
);

const parenthesisParser = new Parser(/\(([^\(\)]+)\)/, (parse, contents) =>
  parse(contents)
);

const multiplicationParser = new Parser(/(\d+)\s\*\s(\d+)/, multiply);

const additionParser = new Parser(/(\d+)\s\+\s(\d+)/, add);

const additionOrMultiplicationParser = new Parser(
  /(\d+)\s([\+\*])\s(\d+)/,
  (evaluate, left, operator, right) => {
    switch (operator) {
      case "+":
        return add(evaluate, left, right);
      case "*":
        return multiply(evaluate, left, right);
      default:
        throw new Error(
          `Invalid operator in additionOrMultiplicationParser: "${operator}"`
        );
    }
  }
);

export function evaluate(expression: string) {
  return evaluator(expression, [
    parenthesisParser,
    additionOrMultiplicationParser,
    uselessParenthesisParser,
  ]);
}

export function evaluateV2(expression: string) {
  return evaluator(expression, [
    parenthesisParser,
    additionParser,
    multiplicationParser,
    uselessParenthesisParser,
  ]);
}

type Evaluator = (expression: string) => number;
