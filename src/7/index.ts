function parse(rule: string): Rule {
  const matches = rule.match(/(?:([0-9]?\s?\w+\b\s\w+\b)(?=\sbags?))+/gm);

  if (!matches) {
    throw new Error(`Invalid rule: "${rule}`);
  }

  if (/contain no other bags/.test(rule)) {
    return { type: matches.shift(), description: rule, required: {} };
  }

  const [type, ...allowedBagDescriptions] = matches;
  const required: Record<BagType, Qty> = {};

  allowedBagDescriptions.forEach((bagDescription) => {
    const [match, qty, type] = /([0-9]+)\s(\w+\b\s\w+\b)/g.exec(bagDescription);
    required[type] = Number(qty);
  });

  return {
    type,
    required,
    description: rule,
  };
}

export function validOuterBags(bagType: BagType, allRules: string): BagType[] {
  const rulesByType: Record<BagType, Rule> = {};
  const rules = allRules
    .split(/\n/g)
    .filter((it) => it.trim().length)
    .map((ruleDescription) => {
      const rule = parse(ruleDescription);
      rulesByType[rule.type] = rule;
      return rule;
    });

  function hasAllowedSubType(rule: Rule) {
    if (bagType in rule.required) return true;
    return Object.keys(rule.required).some((allowedType) => {
      const allowedSubTypes = Object.keys(rulesByType[allowedType].required);
      return (
        allowedSubTypes.includes(bagType) ||
        allowedSubTypes.some((it) => hasAllowedSubType(rulesByType[it]))
      );
    });
  }

  return rules.filter(hasAllowedSubType).map((it) => it.type);
}

export function countRequiredInnerBags(
  bagType: BagType,
  allRules: string
): number {
  const rulesByType: Record<BagType, Rule> = {};
  allRules.split(/\n/g).forEach((ruleDescription) => {
    if (!ruleDescription.trim().length) return;

    const rule = parse(ruleDescription);
    rulesByType[rule.type] = rule;

    return rule;
  });

  function countRequiredBags(bagType: BagType, includeBagItself = false) {
    const rule = rulesByType[bagType];
    return Object.keys(rule.required).reduce(
      (total, requiredType) =>
        total +
        rule.required[requiredType] * countRequiredBags(requiredType, true),
      includeBagItself ? 1 : 0
    );
  }

  return countRequiredBags(bagType);
}

type BagType = string;
type Qty = number;
type Rule = {
  type: BagType;
  description: string;
  required: Record<BagType, Qty>;
};
