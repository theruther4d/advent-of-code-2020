export function getBuiltInJoltageAdapterRating(
  adapterJoltageRatings: number[]
) {
  return Math.max(...adapterJoltageRatings) + MAX_DIFFERENCE;
}

function isCompatible(adapterJoltage: number, source: number) {
  if (adapterJoltage <= source) return false;
  const actualDifference = adapterJoltage - source;
  return actualDifference <= MAX_DIFFERENCE;
}

export function findNumValidCombinations(
  adapters: number[],
  start = 0,
  stop = getBuiltInJoltageAdapterRating(adapters),
  cache: Record<string, number> = {},
  needsSort = true
) {
  if (needsSort) adapters.sort(ASCENDING);

  const key = `${adapters.length}-${start}`;
  if (key in cache) return cache[key];

  let validCombinations = 0;

  if (stop - start <= MAX_DIFFERENCE) validCombinations++;

  if (!adapters.length) return validCombinations;

  const [nextStart, ...nextAdapters] = adapters;

  if (nextStart - start <= MAX_DIFFERENCE) {
    validCombinations += findNumValidCombinations(
      nextAdapters,
      nextStart,
      stop,
      cache,
      false
    );
  }

  validCombinations += findNumValidCombinations(
    nextAdapters,
    start,
    stop,
    cache,
    false
  );
  cache[key] = validCombinations;
  return validCombinations;
}

function chainAdapters(adapterJoltageRatings: number[]) {
  const remainingRatings = [...adapterJoltageRatings].sort(ASCENDING);
  const chain = [];
  let currentRating = 0;

  while (remainingRatings.length) {
    const compatibleRatings = remainingRatings.filter((adapterJoltage) =>
      isCompatible(adapterJoltage, currentRating)
    );

    if (!compatibleRatings.length) {
      break;
    }

    const [chosenPermutation] = compatibleRatings;

    const compatibleIndex = remainingRatings.indexOf(chosenPermutation);

    const [nextRating] = remainingRatings.splice(compatibleIndex, 1);
    chain.push(nextRating);
    currentRating = nextRating;
  }

  return chain;
}

export function findJoltageDifferenceDistributions(
  adapterJoltageRatings: number[],
  currentRating = 0
) {
  const joltageDifferencesEncountered: Record<number, number> = {};
  const chained = chainAdapters(adapterJoltageRatings);
  chained.forEach((rating, index) => {
    const prevRating = index ? chained[index - 1] : currentRating;
    const difference = Math.abs(rating - prevRating);
    joltageDifferencesEncountered[difference] =
      joltageDifferencesEncountered[difference] || 0;
    joltageDifferencesEncountered[difference]++;
  });

  const deviceRating = getBuiltInJoltageAdapterRating(adapterJoltageRatings);
  const maxRating = Math.max(...adapterJoltageRatings);
  const deviceDifference = Math.abs(deviceRating - maxRating);
  joltageDifferencesEncountered[deviceDifference] =
    joltageDifferencesEncountered[deviceDifference] || 0;
  joltageDifferencesEncountered[deviceDifference]++;

  return joltageDifferencesEncountered;
}

const MAX_DIFFERENCE = 3;
const ASCENDING = function sort(a: number, b: number) {
  return a < b ? -1 : 1;
};
