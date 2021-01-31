export function validate(input: string, rules: Rule[]) {
  function doValidate(input: string, rule: Rule, level: number) {
    if (cache.get(rule)?.has(input)) {
      return cache.get(rule).get(input);
    }
    if (isChar(rule)) {
      const result = {
        valid: input.startsWith(rule),
        input: input.slice(rule.length),
      };
      addToCache(rule, input, result);
      return result;
    }

    if (isSubRule(rule)) {
      let valid = false;
      let nextInput = input;

      for (let subRuleNo = 0; subRuleNo < rule.length; subRuleNo++) {
        const subRule = rules[rule[subRuleNo]];
        const result = doValidate(nextInput, subRule, level + 1);

        if (result.valid) {
          valid = true;
          nextInput = result.input;
          continue;
        }

        valid = false;
        break;
      }

      const result = { valid, input: nextInput };
      addToCache(rule, input, result);
      return result;
    }

    // Ceci EST pas une pipe.
    let valid = false;
    let nextInput = input;
    for (let groupNo = 0; groupNo < rule.length; groupNo++) {
      const subRule = rule[groupNo];
      const result = doValidate(input, subRule, level + 1);

      if (result.valid) {
        valid = true;
        nextInput = result.input;
        break;
      }
    }

    const result = { valid, input: nextInput };
    addToCache(rule, input, result);
    return result;
  }

  const { valid, input: nextInput } = doValidate(input, rules[0], 0);
  return valid && !nextInput.length;
}

const cache = new Map<Rule, Map<string, Result>>();
function addToCache(rule: Rule, input: string, result: Result) {
  const ruleCache = cache.get(rule) || new Map<string, Result>();
  ruleCache.set(input, result);
  cache.set(rule, ruleCache);
}

type Char = string;
type RuleNum = number;
type SubRule = RuleNum[];
type Pipe = SubRule[];
type Rule = Char | SubRule | Pipe;
type Result = { valid: boolean; input: string };

function isChar(rule: Rule): rule is Char {
  return typeof rule === "string";
}

function isSubRule(rule: Rule): rule is SubRule {
  return Array.isArray(rule) && typeof rule[0] === "number";
}

function makeRule(input: string): Rule {
  // Pipe:
  if (/\|/.test(input)) {
    return input.split(/\|/).map((subGroup) => {
      return makeRule(subGroup);
    }) as Pipe;
  }
  // Subgroup
  if (/[\d+\s]/.test(input)) {
    return input.trim().split(" ").map(Number) as SubRule;
  }

  // Char:
  if (/[\"a-z]/i.test(input)) {
    return input.replace(/\"/g, "");
  }

  throw new Error(`Invalid rule input: "${input}"`);
}

export function parsePuzzleInput(input: string) {
  const [rawRules, rawMessages] = input.split(/\n\n/);
  const messages = rawMessages.split(/\n/);
  let rules = new Array<Rule>();
  rawRules
    .trim()
    .split(/\n/)
    .forEach((raw) => {
      const [, ruleNo, rule] = /(\d+)\:\s(.*)/.exec(raw);
      rules[Number(ruleNo)] = makeRule(rule);
    });

  return { messages, rules };
}
