export function parseBusSchedule(schedule: string): [number, number[]] {
  const [departureTimeString, busesString] = schedule.trim().split(/\n/);
  const buses = busesString.split(",").map((it) => {
    const id = parseInt(it);
    return Number.isNaN(id) ? UNKNOWN_BUS : id;
  });

  return [Number(departureTimeString), buses];
}

export function findClosestBus(departureTime: number, buses: number[]) {
  let closestBus;
  let currentTime = departureTime;

  while (!closestBus) {
    closestBus = buses.find(
      (bus) => bus !== UNKNOWN_BUS && departsAt(bus, currentTime)
    );
    if (!closestBus) currentTime++;
  }

  return [closestBus, currentTime];
}

export const UNKNOWN_BUS = -1;

function departsAt(bus: number, time: number) {
  return time % bus === 0;
}

export function greatestCommonDivisor(smallest: number, largest: number) {
  let gcd: number;

  for (let i = smallest - 1; i > 0 && typeof gcd !== "number"; i--) {
    if (smallest % i === 0 && largest % i === 0) {
      gcd = i;
    }
  }

  return gcd;
}

export function leastCommonMultiple(smallest: number, largest: number) {
  if (smallest === largest) return smallest;
  if (smallest === 0 || largest === 0) return 0;

  return (smallest * largest) / greatestCommonDivisor(smallest, largest);
}

export function findOptimalDeparture(buses: number[]) {
  let optimalDepartureTime;
  let schedules = buses.reduce((schedule, bus, i) => {
    if (bus === UNKNOWN_BUS) return schedule;
    return [...schedule, [bus, i]];
  }, []);
  const [[largest]] = schedules;
  let currentTime = largest;
  let increment = largest;

  while (!optimalDepartureTime) {
    let isOptimal = false;

    for (let i = 0; i < schedules.length; i++) {
      const [bus, index] = schedules[i];
      const isValid = departsAt(bus, currentTime + index);
      const isLast = i === schedules.length - 1;

      if (isLast && isValid) {
        isOptimal = isValid;
      }

      if (!isValid) break;

      increment = leastCommonMultiple(
        Math.min(increment, bus),
        Math.max(increment, bus)
      );
      schedules.splice(0, i + 1);
    }

    if (isOptimal) {
      optimalDepartureTime = currentTime;
      break;
    }

    currentTime += increment;
  }

  return optimalDepartureTime;
}
