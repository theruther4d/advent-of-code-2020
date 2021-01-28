import {
  toSlice,
  getNeighbors,
  simulatePocketDimension,
  toGrid,
  toState,
  toCycle,
} from "./index";

describe("Day 17", () => {
  it("getNeighbors", () => {
    const neighbors = getNeighbors("1,2,3");
    expect(neighbors.length).toEqual(26);
    expect(neighbors.includes("1,2,3")).toEqual(false);

    const multiDimensionalNeighbors = getNeighbors("1,2,3,4");
    expect(multiDimensionalNeighbors.length).toEqual(80);
    expect(multiDimensionalNeighbors.includes("2,2,3,3")).toEqual(true);
    expect(multiDimensionalNeighbors.includes("0,2,3,4")).toEqual(true);
    expect(multiDimensionalNeighbors.includes("1,2,3,4")).toEqual(false);
  });

  it("toGrid", () => {
    expect(toGrid(initialState)).toEqual([
      [".", "#", "."],
      [".", ".", "#"],
      ["#", "#", "#"],
    ]);
  });

  it("toState", () => {
    const state = toState(toGrid(initialState), 3);
    expect([...state]).toEqual(["1,0,0", "2,1,0", "0,2,0", "1,2,0", "2,2,0"]);
  });

  it("toMap", () => {
    const state = toState(toGrid(initialState), 3);
    expect(toSlice(state, 0)).toEqual(initialState);
  });

  it("toCycle", () => {
    expect(
      toCycle(new Set(["1,0,0", "2,1,0", "0,2,0", "1,2,0", "2,2,0"]))
    ).toEqual({
      bounds: [
        [0, 0, 0],
        [2, 2, 0],
      ],
      "0": initialState,
    });
    expect(
      toCycle(
        new Set([
          // -2
          "2,2,-2",
          // -1
          "2,0,-1",
          "1,1,-1",
          "4,1,-1",
          "4,2,-1",
          "1,3,-1",
          // 0
          "0,0,0",
          "1,0,0",
          "0,1,0",
          "1,1,0",
          "0,2,0",
          "4,3,0",
          "1,4,0",
          "2,4,0",
          "3,4,0",
          // 1
          "2,0,1",
          "1,1,1",
          "4,1,1",
          "4,2,1",
          "1,3,1",
          // 2
          "2,2,2",
        ])
      )
    ).toEqual({
      bounds: [
        [0, 0, -2],
        [4, 4, 2],
      ],
      "-2": ".....\n.....\n..#..\n.....\n.....",
      "-1": "..#..\n.#..#\n....#\n.#...\n.....",
      "0": "##...\n##...\n#....\n....#\n.###.",
      "1": "..#..\n.#..#\n....#\n.#...\n.....",
      "2": ".....\n.....\n..#..\n.....\n.....",
    });
  });

  it(`simulatePocketDimension`, () => {
    const [[result0, result1, result2], state] = simulatePocketDimension(
      initialState
    );

    expect(result0).toEqual({
      bounds: [
        [0, 1, -1],
        [2, 3, 1],
      ],
      "-1": "#..\n..#\n.#.",
      "0": "#.#\n.##\n.#.",
      "1": "#..\n..#\n.#.",
    });

    expect(result1).toEqual({
      bounds: [
        [-1, 0, -2],
        [3, 4, 2],
      ],
      "-2": ".....\n.....\n..#..\n.....\n.....",
      "-1": "..#..\n.#..#\n....#\n.#...\n.....",
      "0": "##...\n##...\n#....\n....#\n.###.",
      "1": "..#..\n.#..#\n....#\n.#...\n.....",
      "2": ".....\n.....\n..#..\n.....\n.....",
    });

    expect(result2).toEqual({
      bounds: [
        [-2, -1, -2],
        [4, 5, 2],
      ],
      "-2": ".......\n.......\n..##...\n..###..\n.......\n.......\n.......",
      "-1": "..#....\n...#...\n#......\n.....##\n.#...#.\n..#.#..\n...#...",
      "0": "...#...\n.......\n#......\n.......\n.....##\n.##.#..\n...#...",
      "1": "..#....\n...#...\n#......\n.....##\n.#...#.\n..#.#..\n...#...",
      "2": ".......\n.......\n..##...\n..###..\n.......\n.......\n.......",
    });

    expect(state.size).toEqual(112);
  });

  it(`Part 1`, () => {
    const [, state] = simulatePocketDimension(input);
    expect(state.size).toEqual(293);
  });

  it("4 dimensions", () => {
    const [cycles, state] = simulatePocketDimension(initialState, 6, 4);
    expect(cycles).toMatchSnapshot();
    expect(state.size).toEqual(848);
  });

  it("Part 2", () => {
    const [, state] = simulatePocketDimension(input, 6, 4);
    expect(state.size).toEqual(1816);
  });
});

const initialState = ".#.\n..#\n###";
const input =
  "...#...#\n#######.\n....###.\n.#..#...\n#.#.....\n.##.....\n#.####..\n#....##.";
