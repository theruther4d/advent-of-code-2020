const TREE = "#";

export function countTrees(map: string[], [slopeX, slopeY]: [number, number]) {
  const rowCount = map[0].length;
  let x = 0;
  let trees = 0;

  for (let row = 0; row < map.length; row += slopeY) {
    if (map[row][x] === TREE) trees++;
    x = (x + slopeX) % rowCount;
  }

  return trees;
}
