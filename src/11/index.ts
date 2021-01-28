const EMPTY_SEAT = "L";
const OCCUPIED_SEAT = "#";
const FLOOR = ".";
const NOT_UNDEFINED = Boolean;

type Layout = string;
type Grid = Readonly<Array<string[]>>;

export function getAdjacentSpots(
  rowIndex: number,
  spotIndex: number,
  grid: Grid
): string[] {
  return [
    ...(grid[rowIndex - 1] ?? []).slice(
      Math.max(spotIndex - 1, 0),
      spotIndex + 2
    ),
    ...[grid[rowIndex][spotIndex - 1], grid[rowIndex][spotIndex + 1]].filter(
      NOT_UNDEFINED
    ),
    ...(grid[rowIndex + 1] ?? []).slice(
      Math.max(spotIndex - 1, 0),
      spotIndex + 2
    ),
  ];
}

const directions = {
  Up: [0, -1],
  UpRight: [1, -1],
  Right: [1, 0],
  DownRight: [1, 1],
  Down: [0, 1],
  DownLeft: [-1, 1],
  Left: [-1, 0],
  LeftUp: [-1, -1],
};

export function getFirstSeatInEveryDirection(
  targetRowIndex: number,
  targetSpotIndex: number,
  grid: Grid
): string[] {
  const encounteredSeats = [];

  Object.values(directions).forEach(([spotOffset, rowOffset]) => {
    let rowIndex = targetRowIndex;
    let spotIndex = targetSpotIndex;
    let spot = FLOOR;

    while (
      rowIndex >= 0 &&
      rowIndex < grid.length &&
      spotIndex >= 0 &&
      spotIndex < grid[rowIndex].length &&
      spot !== EMPTY_SEAT &&
      spot !== OCCUPIED_SEAT
    ) {
      rowIndex += rowOffset;
      spotIndex += spotOffset;
      spot = grid[rowIndex]?.[spotIndex] ?? FLOOR;
    }

    spot !== FLOOR && encounteredSeats.push(spot);
  });

  return encounteredSeats;
}

export function makeGrid(layout: Layout): Grid {
  const grid = layout.split(/\n/g).map((row) => row.split(""));
  return Object.freeze(grid);
}

function makeLayout(grid: Grid): Layout {
  return grid.reduce((layout, row, rowIndex) => {
    const separator = rowIndex === grid.length - 1 ? "" : "\n";
    return layout + row.join("") + separator;
  }, "");
}

export function modelSeatingLayout(
  layout: Layout,
  occupiedNeighborTolerance = 4,
  neighborGetter = getAdjacentSpots
): Layout {
  const grid = makeGrid(layout);
  return makeLayout(
    grid.map((row, rowIndex) => {
      return row.map((spot, spotIndex) => {
        if (spot === FLOOR) {
          return spot;
        }

        const neighboringSpots = neighborGetter(rowIndex, spotIndex, grid);

        if (spot === EMPTY_SEAT) {
          if (neighboringSpots.every((it) => it !== OCCUPIED_SEAT)) {
            return OCCUPIED_SEAT;
          }

          return EMPTY_SEAT;
        }

        const occupiedNeighbors = neighboringSpots.filter(
          (spot) => spot === OCCUPIED_SEAT
        );

        if (occupiedNeighbors.length >= occupiedNeighborTolerance) {
          return EMPTY_SEAT;
        }

        if (spot !== OCCUPIED_SEAT) {
          throw new Error(
            `Expected OCCUPIED_SEAT (${OCCUPIED_SEAT}) but got "${spot}"`
          );
        }

        return OCCUPIED_SEAT;
      });
    })
  );
}

export function countOccupiedSeats(layout: Layout) {
  return (
    layout.length - layout.replace(new RegExp(OCCUPIED_SEAT, "g"), "").length
  );
}

export function countFinalOccupiedSeats(
  prevLayout: Layout,
  modelingFn = modelSeatingLayout
) {
  const nextLayout = modelingFn(prevLayout);

  if (nextLayout === prevLayout) {
    return countOccupiedSeats(prevLayout);
  }

  return countFinalOccupiedSeats(nextLayout, modelingFn);
}

export function modelSeatingLayout2(layout: Layout) {
  return modelSeatingLayout(layout, 5, getFirstSeatInEveryDirection);
}
