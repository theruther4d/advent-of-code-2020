const ACTIVE = "#";
const INACTIVE = ".";
type Cube = string;
type Coord = number[];
type Slot = typeof ACTIVE | typeof INACTIVE;
type Grid = Array<Slot>[];
type State = Set<Cube>;
type Slice = string;
type Cycle = Record<string, Slice> & { bounds: [Coord, Coord] };

export function toCoord(cube: Cube): Coord {
  return cube.split(",").map(Number);
}

export function toCube(coords: Coord): Cube {
  return coords.join(",");
}

const neighborCache = new Map<Cube, Set<Cube>>();

export function getNeighbors(cube: Cube): Cube[] {
  if (!neighborCache.has(cube)) {
    const neighbors = new Set<Cube>();

    function traverseNeighbors(
      coords: Coord,
      accumulated: number[],
      maxDepth: number,
      depth: number
    ) {
      coords.forEach((position, i) => {
        [position - 1, position, position + 1].forEach((offset) => {
          if (depth === maxDepth) {
            const neighboringCube = toCube([...accumulated, offset]);
            if (neighboringCube === cube) return;
            neighbors.add(neighboringCube);
          } else {
            traverseNeighbors(
              coords.slice(i + 1),
              [...accumulated, offset],
              maxDepth,
              depth + 1
            );
          }
        });
      });
    }

    const coords = toCoord(cube);
    traverseNeighbors(coords, [], coords.length - 1, 0);

    neighborCache.set(cube, neighbors);
  }

  return [...neighborCache.get(cube)];
}

export function getBounds(state: State): Coord[] {
  if (!state.size) return [];

  const sampleCube = Array.from(state.entries()).pop().pop();
  const dimensions = sampleCube.split(",").length;
  const initialMin = new Array(dimensions).fill(Infinity);
  const initialMax = new Array(dimensions).fill(0);

  return [...state].reduce(
    ([mins, maxes], cube) => {
      const coords = toCoord(cube);
      return [
        mins.map((prevMin, i) => Math.min(prevMin, coords[i])),
        maxes.map((prevMax, i) => Math.max(prevMax, coords[i])),
      ];
    },
    [initialMin, initialMax]
  );
}

export function toSlice(state: State, z: number): Slice {
  const [mins, maxes] = getBounds(state);
  const [minX, minY] = mins;
  const [maxX, maxY] = maxes;
  const slice = [];

  for (let y = minY; y <= maxY; y++) {
    const row = [];

    for (let x = minX; x <= maxX; x++) {
      if (state.has(toCube([x, y, z]))) {
        row.push(ACTIVE);
      } else {
        row.push(INACTIVE);
      }
    }

    slice.push(row.join(""));
  }

  return slice.join("\n");
}

export function toState(grid: Grid, dimensions: number): State {
  const activeCubes = new Set<Cube>();

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === ACTIVE) {
        let cube = [x, y];
        while (cube.length < dimensions) cube.push(0);
        activeCubes.add(toCube(cube));
      }
    });
  });

  return activeCubes;
}

export function toGrid(slice: Slice): Grid {
  return slice.split(/\n/).map((row) => row.split("")) as Grid;
}

export function permute(input: Array<Coord>) {
  let permutations = new Set<Cube>();

  if (input.length === 1) {
    return input[0].map((it) => toCube([it]));
  }

  function loop(accumulated: Coord = [], remaining: Array<Coord>) {
    remaining.forEach((coord, i) => {
      const isLast = i === remaining.length - 1;
      coord.forEach((position) => {
        if (isLast) {
          if (accumulated.length) {
            const cube = toCube([...accumulated, position]);
            permutations.add(cube);
          }
        } else {
          loop([...accumulated, position], remaining.slice(i + 1));
        }
      });
    });
  }

  loop([], input);

  return Array.from(permutations);
}

export function toCycle(state: State): Cycle {
  const [mins, maxes] = getBounds(state);
  const [minX, minY, ...otherMins] = mins;
  const [maxX, maxY, ...otherMaxes] = maxes;
  const cycle = { bounds: [mins, maxes] } as Cycle;

  const extrapolatedRanges = new Array<Coord>();
  otherMins.forEach((min, i) => {
    const max = otherMaxes[i];
    let set: Coord = [];
    for (let j = min; j <= max; j++) {
      set.push(j);
    }
    extrapolatedRanges.push(set);
  });

  const uniqueOtherDimensions = permute(extrapolatedRanges);

  uniqueOtherDimensions.forEach((dimension) => {
    let grid = [];

    for (let y = minY; y <= maxY; y++) {
      let row = [];

      for (let x = minX; x <= maxX; x++) {
        if (state.has(toCube([x, y, ...toCoord(dimension)]))) {
          row.push(ACTIVE);
        } else {
          row.push(INACTIVE);
        }
      }

      grid.push(row.join(""));
    }

    cycle[dimension] = grid.join("\n");
  });

  return cycle;
}

export function simulatePocketDimension(
  initialState: Slice,
  maxCycles = 6,
  dimensions = 3
): [Cycle[], State] {
  const grid = toGrid(initialState);
  let state = toState(grid, dimensions);
  let nextState = new Set(state);
  const cycles = new Array<Cycle>();

  for (let cycle = 0; cycle < maxCycles; cycle++) {
    let seenCubes = new Set<Cube>();

    state.forEach((activeCube) => {
      [activeCube, ...getNeighbors(activeCube)].forEach((cube) => {
        if (seenCubes.has(cube)) return;
        const neighbors = getNeighbors(cube);
        const activeNeighbors = neighbors.filter((it) => state.has(it)).length;

        if (state.has(cube) && ![2, 3].includes(activeNeighbors)) {
          nextState.delete(cube);
        } else if (activeNeighbors === 3) {
          nextState.add(cube);
        }

        seenCubes.add(cube);
      });
    });

    cycles.push(toCycle(nextState));
    state = new Set(nextState);
  }

  return [cycles, state];
}
