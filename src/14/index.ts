export function toBitString(input: number): string {
  const sign = input < 0 ? "-" : "";
  const result = Math.abs(input).toString(2);
  return `${sign}${result.padStart(BITS, "0")}`;
}

export function fromBitString(input: string): number {
  let trimmed = input;

  while (trimmed.startsWith("0") && trimmed.length > 1) {
    trimmed = trimmed.slice(1);
  }

  return parseInt(trimmed, 2);
}

export function parse(program: string): Instruction[] {
  return program
    .split(/mask\s\=\s/g)
    .filter((it) => it.trim().length)
    .map((instruction) => {
      const [mask, ...rawWrites] = instruction.trim().split(/\n/);
      const writes = rawWrites.map((it) => {
        const [, address, value] = /mem\[([0-9]+)\]\s\=\s([0-9]+)/.exec(it);
        return [Number(address), Number(value)] as Write;
      });

      return [mask, writes] as Instruction;
    });
}

export function apply(mask: Mask, value: Value) {
  let masked = toBitString(value).split("");

  mask.split("").forEach((bit, address) => {
    if (bit === UNCHANGED) return;
    masked[address] = bit;
  });

  return fromBitString(masked.join(""));
}

export function applyV2(mask: Mask, value: Value) {
  let masked = toBitString(value).split("");

  mask.split("").forEach((bit, address) => {
    switch (bit) {
      case FLOATING:
        masked[address] = FLOATING;
        break;
      case OVERWRITTEN:
        masked[address] = OVERWRITTEN;
        break;
    }
  });

  let permutations = [masked];

  let nextPermutationIndex = permutations.findIndex((it) =>
    it.includes(FLOATING)
  );

  while (nextPermutationIndex !== -1) {
    const nextPermutation = permutations[nextPermutationIndex];
    const permuted = ["0", "1"].map((option) => {
      return nextPermutation
        .join("")
        .replace(new RegExp(FLOATING), option)
        .split("");
    });
    permutations.splice(nextPermutationIndex, 1, ...permuted);
    nextPermutationIndex = permutations.findIndex((it) =>
      it.includes(FLOATING)
    );
  }

  return permutations.map((it) => fromBitString(it.join("")));
}

export function execute(instructions: Instruction[]) {
  const memory = [];

  instructions.forEach(([mask, writes]) => {
    writes.forEach(([address, value]) => {
      memory[address] = apply(mask, value);
    });
  });

  return memory;
}

export function executeV2(instructions: Instruction[]) {
  const memory = new Map<Value, Address[]>();
  const reverseMemory = new Map<Address, Value>();

  instructions.forEach(([mask, writes]) => {
    writes.forEach(([address, value]) => {
      const addresses = applyV2(mask, address);
      if (!memory.has(value)) {
        memory.set(value, []);
      }

      addresses.forEach((bitAddress) => {
        const occupiedMemory = reverseMemory.get(bitAddress);
        if (occupiedMemory) {
          memory
            .get(occupiedMemory)
            .splice(memory.get(occupiedMemory).indexOf(bitAddress), 1);
        }
        memory.get(value).push(bitAddress);
        reverseMemory.set(bitAddress, value);
      });
    });
  });

  return memory;
}

export function sumNonZeroValuesInMemory(program: string) {
  const instructions = parse(program);
  const memory = execute(instructions);

  return memory.reduce((sum, it) => sum + it, 0);
}

export function sumNonZeroValuesInMemoryV2(program: string) {
  const instructions = parse(program);
  const memory = executeV2(instructions);

  return [...memory.keys()].reduce((total, key) => {
    return total + memory.get(key).length * key;
  }, 0);
}

type Mask = string;
type Address = number;
type Value = number;
type Write = [Address, Value];
type Instruction = [Mask, Write[]];

const UNCHANGED = "X";
const OVERWRITTEN = "1";
const FLOATING = "X";
const BITS = 36;
