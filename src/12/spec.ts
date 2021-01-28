import {
  rotate,
  applyInstructions,
  Direction,
  manhattanDistance,
  State,
  rotateCoord,
  Coord,
  rules2,
} from "./index";
import input from "./input.json";

describe("Day 12", () => {
  it("Part 1", () => {
    const originalState = new State();
    let intermediateStates = applyInstructions(sampleInput, originalState);

    expect(intermediateStates).toEqual([
      new State([10, 0]),
      new State([10, 3]),
      new State([17, 3]),
      new State([17, 3], Direction.South),
      new State([17, -8], Direction.South),
    ]);

    let finalState = intermediateStates.pop();
    expect(
      manhattanDistance(originalState.position, finalState.position)
    ).toEqual(25);

    intermediateStates = applyInstructions(input, originalState);
    finalState = intermediateStates.pop();

    expect(rotate(Direction.North, 90)).toEqual(Direction.East);
    expect(rotate(Direction.North, 180)).toEqual(Direction.South);
    expect(rotate(Direction.North, 270)).toEqual(Direction.West);
    expect(rotate(Direction.North, -90)).toEqual(Direction.West);
    expect(rotate(Direction.North, -180)).toEqual(Direction.South);
    expect(rotate(Direction.North, -270)).toEqual(Direction.East);

    expect(rotate(Direction.East, 90)).toEqual(Direction.South);
    expect(rotate(Direction.East, 180)).toEqual(Direction.West);
    expect(rotate(Direction.East, 270)).toEqual(Direction.North);
    expect(rotate(Direction.East, -90)).toEqual(Direction.North);
    expect(rotate(Direction.East, -180)).toEqual(Direction.West);
    expect(rotate(Direction.East, -270)).toEqual(Direction.South);

    expect(rotate(Direction.South, 90)).toEqual(Direction.West);
    expect(rotate(Direction.South, 180)).toEqual(Direction.North);
    expect(rotate(Direction.South, 270)).toEqual(Direction.East);
    expect(rotate(Direction.South, -90)).toEqual(Direction.East);
    expect(rotate(Direction.South, -180)).toEqual(Direction.North);
    expect(rotate(Direction.South, -270)).toEqual(Direction.West);

    expect(rotate(Direction.West, 90)).toEqual(Direction.North);
    expect(rotate(Direction.West, 180)).toEqual(Direction.East);
    expect(rotate(Direction.West, 270)).toEqual(Direction.South);
    expect(rotate(Direction.West, -90)).toEqual(Direction.South);
    expect(rotate(Direction.West, -180)).toEqual(Direction.East);
    expect(rotate(Direction.West, -270)).toEqual(Direction.North);

    intermediateStates = applyInstructions(input, originalState);
    finalState = intermediateStates.pop();

    expect(
      manhattanDistance(originalState.position, finalState.position)
    ).toEqual(2270);
  });

  it("Part 2", () => {
    expect(rotateCoord(<Coord>[10, 1], 90)).toEqual([1, -10]);
    expect(rotateCoord(<Coord>[10, 1], 180)).toEqual([-10, -1]);
    expect(rotateCoord(<Coord>[10, 1], 270)).toEqual([-1, 10]);

    expect(rotateCoord(<Coord>[10, 1], -90)).toEqual([-1, 10]);
    expect(rotateCoord(<Coord>[10, 1], -180)).toEqual([-10, -1]);
    expect(rotateCoord(<Coord>[10, 1], -270)).toEqual([1, -10]);

    const originalState = new State(undefined, undefined, [10, 1]);
    let intermediateStates = applyInstructions(
      sampleInput,
      originalState,
      rules2
    );

    expect(intermediateStates).toEqual([
      new State([100, 10], Direction.East, [10, 1]),
      new State([100, 10], Direction.East, [10, 4]),
      new State([170, 38], Direction.East, [10, 4]),
      new State([170, 38], Direction.East, [4, -10]),
      new State([214, -72], Direction.East, [4, -10]),
    ]);

    let finalState = intermediateStates.pop();
    expect(
      manhattanDistance(originalState.position, finalState.position)
    ).toEqual(286);

    intermediateStates = applyInstructions(input, originalState, rules2);
    finalState = intermediateStates.pop();
    expect(
      manhattanDistance(originalState.position, finalState.position)
    ).toEqual(138669);
  });
});

const sampleInput = ["F10", "N3", "F7", "R90", "F11"];
