export enum Direction {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}

enum Transform {
  Forward = "F",
  Right = "R",
  Left = "L",
}

export type Coord = [number, number];

type Instruction = Direction | Transform;
type Rule = (state: State, units: number, subject?: Coord) => State;
type RuleSet = Record<Instruction, Rule>;

export class State {
  constructor(
    public position: Coord = [0, 0],
    public direction = Direction.East,
    public wayPoint?: Coord
  ) {}
}

const directions = [
  Direction.East,
  Direction.South,
  Direction.West,
  Direction.North,
];

export const rotate = (direction: Direction, degrees: number): Direction => {
  const rotations = degrees / 90;
  const index = directions.indexOf(direction);
  let adjustedIndex = (index + rotations) % directions.length;

  if (adjustedIndex < 0) {
    adjustedIndex = directions.length - Math.abs(rotations + index);
  }

  return directions[adjustedIndex];
};

const rotate90Deg = ([x, y]: Coord): Coord => [y, -x];

export const rotateCoord = ([x, y]: Coord, degrees: number): Coord => {
  let rotations = degrees / 90;
  if (rotations < 0) {
    rotations = directions.length + rotations;
  }
  let coord: Coord = [x, y];

  for (let i = 0; i < rotations; i++) {
    coord = rotate90Deg(coord);
  }

  return coord;
};

const translate = ([positionX, positionY]: Coord, [tx, ty]: Coord): Coord => {
  return [positionX + tx, positionY + ty];
};

const rules1: RuleSet = {
  [Direction.North](state, units) {
    return {
      ...state,
      position: translate(state.position, [0, units]),
    };
  },
  [Direction.East](state, units) {
    return {
      ...state,
      position: translate(state.position, [units, 0]),
    };
  },
  [Direction.South](state, units) {
    return {
      ...state,
      position: translate(state.position, [0, -units]),
    };
  },
  [Direction.West](state, units) {
    return {
      ...state,
      position: translate(state.position, [-units, 0]),
    };
  },

  [Transform.Forward](state, units) {
    return rules1[state.direction](state, units);
  },

  [Transform.Right](state, degrees) {
    return { ...state, direction: rotate(state.direction, degrees) };
  },

  [Transform.Left](state, degrees) {
    return { ...state, direction: rotate(state.direction, -degrees) };
  },
};

export const rules2: RuleSet = {
  [Direction.North](state, units) {
    return {
      ...state,
      wayPoint: translate(state.wayPoint, [0, units]),
    };
  },
  [Direction.East](state, units) {
    return {
      ...state,
      wayPoint: translate(state.wayPoint, [units, 0]),
    };
  },
  [Direction.South](state, units) {
    return {
      ...state,
      wayPoint: translate(state.wayPoint, [0, -units]),
    };
  },
  [Direction.West](state, units) {
    return {
      ...state,
      wayPoint: translate(state.wayPoint, [-units, 0]),
    };
  },

  [Transform.Forward](state, units) {
    return {
      ...state,
      position: translate(
        state.position,
        <Coord>state.wayPoint.map((it) => it * units)
      ),
    };
  },

  [Transform.Right](state, degrees) {
    return { ...state, wayPoint: rotateCoord(state.wayPoint, degrees) };
  },

  [Transform.Left](state, degrees) {
    return { ...state, wayPoint: rotateCoord(state.wayPoint, -degrees) };
  },
};

function applyInstruction(
  instruction: string,
  state: State,
  rules = rules1
): State {
  const match = /([a-z])([0-9]+)/i.exec(instruction);
  const [, instructionCode, units] = match;

  return rules[instructionCode](state, Number(units));
}

export function applyInstructions(
  instructions: string[],
  initialState: State,
  rules = rules1,
  log = false
): State[] {
  const intermediateStates = [];

  instructions.reduce((state, instruction) => {
    log && console.log({ state, instruction });
    const applied = applyInstruction(instruction, state, rules);
    const nextState = new State(
      applied.position,
      applied.direction,
      applied.wayPoint
    );
    intermediateStates.push(nextState);
    return nextState;
  }, initialState);

  return intermediateStates;
}

export function manhattanDistance([x1, y1]: Coord, [x2, y2]: Coord) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
