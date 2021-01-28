export function playMemoryGame(starting: number[], limit: number) {
  let turn = starting.length;
  let memory = new Map<number, number>();
  let lastSpoken = starting.slice(-1)[0];

  starting.slice(0, -1).forEach(function populateStartingMemory(spoken, turn) {
    memory.set(spoken, turn + 1);
  });

  while (turn < limit) {
    const firstTimeSpoken = !memory.has(lastSpoken);

    if (firstTimeSpoken) {
      memory.set(lastSpoken, turn);
      lastSpoken = 0;
    } else {
      const lastTimeSpoken = memory.get(lastSpoken);
      memory.set(lastSpoken, turn);
      lastSpoken = turn - lastTimeSpoken;
    }

    turn++;
  }

  return lastSpoken;
}
