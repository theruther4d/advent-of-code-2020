export const decodeSeat = function (
  seatString: string,
  numRows = 128,
  numColumns = 8
) {
  const rows = Seat.rows(seatString);
  const columns = Seat.columns(seatString);
  let nextRow = rows.shift();
  let remainingRows = [...new Array(numRows)].map((_, i) => i);

  while (nextRow) {
    const half = Math.floor(remainingRows.length / 2);
    let lower = remainingRows.slice(0, half);
    let upper = remainingRows.slice(half);

    remainingRows = nextRow === FRONT ? lower : upper;
    nextRow = rows.shift();
  }
  const row = remainingRows.pop();

  let nextColumn = columns.shift();
  let remainingColumns = [...new Array(numColumns)].map((_, i) => i);

  while (nextColumn) {
    const half = Math.floor(remainingColumns.length / 2);
    let lower = remainingColumns.slice(0, half);
    let upper = remainingColumns.slice(half);

    remainingColumns = nextColumn === LEFT ? lower : upper;
    nextColumn = columns.shift();
  }
  const column = remainingColumns.pop();

  return { id: getSeatId(row, column), row, column };
};

const getSeatId = (row: number, column: number): SeatId => {
  return row * 8 + column;
};

export const findMissingSeat = function (
  seats: string[],
  numRows = 128,
  numColumns = 8
): SeatId {
  const grid: Record<RowNum, Record<ColNum, SeatId>> = {};
  const ids = new Set<SeatId>();

  seats.forEach((seat) => {
    const { row, column, id } = decodeSeat(seat);
    ids.add(id);
    grid[row] = grid[row] || {};
    grid[row][column] = id;
  });

  let missingSeat: SeatId;
  for (let row = 0; row < numRows; row++) {
    for (let column = 0; column < numColumns; column++) {
      if (typeof grid[row]?.[column] === "number") continue;
      const id = getSeatId(row, column);
      if (ids.has(id - 1) && ids.has(id + 1)) {
        missingSeat = id;
        break;
      }
    }
  }

  return missingSeat;
};

class Seat {
  static rows = function (seatString: string) {
    return seatString.split("").slice(0, 7) as Row[];
  };

  static columns = function (seatString: string) {
    return seatString.split("").slice(-3) as Column[];
  };
}

const FRONT = "F";
const BACK = "B";
const LEFT = "L";
const RIGHT = "R";

type Row = typeof FRONT | typeof BACK;
type Column = typeof LEFT | typeof RIGHT;

type RowNum = number;
type ColNum = number;
type SeatId = number;
