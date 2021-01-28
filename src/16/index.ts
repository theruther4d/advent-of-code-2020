type Ticket = number[];
type ValueRange = [number, number];
export type Rule = {
  name: string;
  value: ValueRange[];
};

const validityCache = new Map<Rule[], Map<number, boolean>>();
function validateTicket(rules: Rule[], ticket) {
  const cache = validityCache.get(rules) || new Map<number, boolean>();
  const invalid = ticket.filter((value) => {
    if (cache.has(value)) return cache.get(value) === false;
    const valid = rules.some((rule) =>
      rule.value.some(([min, max]) => value >= min && value <= max)
    );
    cache.set(value, valid);
    return !valid;
  });

  validityCache.set(rules, cache);

  return invalid;
}

export function ticketScanningErrorRate(
  rules: Rule[],
  nearbyTickets: Ticket[]
) {
  return nearbyTickets.reduce((invalidSum, ticket) => {
    const invalidValues = validateTicket(rules, ticket);
    return invalidSum + invalidValues.reduce((sum, it) => sum + it, 0);
  }, 0);
}

export function orderRules(rules: Rule[], tickets: Ticket[]): Rule[] {
  const validTickets = tickets.filter((ticket) => {
    const invalidValues = validateTicket(rules, ticket);
    return !invalidValues.length;
  });
  const numFields = validTickets[0].length;

  let possibilities = [...new Array(numFields)].map((_, position) => {
    const values = validTickets.map((ticket) => ticket[position]);
    return rules.filter((rule) => {
      return values.every((value) => {
        return rule.value.some(([min, max]) => value >= min && value <= max);
      });
    });
  });

  while (possibilities.some((candidates) => candidates.length !== 1)) {
    const deduced = possibilities.reduce((deduced, candidates) => {
      if (candidates.length === 1) return deduced.concat(candidates);

      return deduced;
    }, new Array<Rule>());

    possibilities = possibilities.map((candidates) => {
      if (candidates.length === 1) return candidates;
      return candidates.filter((candidate) => !deduced.includes(candidate));
    });
  }

  return possibilities.reduce((flat, it) => flat.concat(it), []);
}

export function departureValuesProduct(
  rules: Rule[],
  nearbyTickets: Ticket[],
  yourTicket: Ticket
) {
  const ordered = orderRules(rules, nearbyTickets);
  return ordered.reduce((product, rule, field) => {
    if (rule.name.startsWith("departure")) return product * yourTicket[field];

    return product;
  }, 1);
}
