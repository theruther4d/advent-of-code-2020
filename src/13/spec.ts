import {
  findClosestBus,
  findOptimalDeparture,
  parseBusSchedule,
  UNKNOWN_BUS,
  greatestCommonDivisor,
  leastCommonMultiple,
} from ".";
import input from "./input.json";

describe("Day 13", () => {
  it("Part 1 Sample", () => {
    const [departureTime, buses] = parseBusSchedule(sampleInput);
    expect(departureTime).toEqual(939);
    expect(buses).toEqual([
      7,
      13,
      UNKNOWN_BUS,
      UNKNOWN_BUS,
      59,
      UNKNOWN_BUS,
      31,
      19,
    ]);
    const result = findClosestBus(departureTime, buses);
    expect(result).toEqual([59, 944]);
    const [busId, actualTime] = result;
    expect(busId * (actualTime - departureTime)).toEqual(295);
  });

  it("Part 1", () => {
    const schedule = parseBusSchedule(input);
    const [busId, actualTime] = findClosestBus(...schedule);
    const [departureTime] = schedule;
    expect(busId * (actualTime - departureTime)).toEqual(3215);
  });

  it("Part 2 sample", () => {
    expect(greatestCommonDivisor(24, 108)).toEqual(12);
    expect(leastCommonMultiple(24, 108)).toEqual(216);
    const [, buses] = parseBusSchedule(sampleInput);
    expect(findOptimalDeparture(buses)).toEqual(1068781);
    expect(findOptimalDeparture([17, UNKNOWN_BUS, 13, 19])).toEqual(3417);
    expect(findOptimalDeparture([67, 7, 59, 61])).toEqual(754018);
    expect(findOptimalDeparture([67, UNKNOWN_BUS, 7, 59, 61])).toEqual(779210);
    expect(findOptimalDeparture([67, 7, UNKNOWN_BUS, 59, 61])).toEqual(1261476);
    expect(findOptimalDeparture([1789, 37, 47, 1889])).toEqual(1202161486);
    expect(findOptimalDeparture([2, 11, 13])).toEqual(76);
  });

  it("Part 2", () => {
    const [, buses] = parseBusSchedule(input);
    expect(findOptimalDeparture(buses)).toEqual(1001569619313439);
  });
});

const sampleInput = `
939
7,13,x,x,59,x,31,19
`;
