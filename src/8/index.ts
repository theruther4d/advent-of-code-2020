export function run(instructions: ParsedInstruction[]) {
  let accumulator = 0;
  let currentInstruction = 0;
  const previouslyRunInstructions = new Array<number>();

  while (
    currentInstruction < instructions.length &&
    !previouslyRunInstructions.includes(currentInstruction)
  ) {
    const [instruction, qty] = instructions[currentInstruction];
    previouslyRunInstructions.push(currentInstruction);

    switch (instruction) {
      case Instruction.Acummuluate:
        accumulator += qty;
        currentInstruction++;
        break;

      case Instruction.Jump:
        currentInstruction += qty;
        break;

      case Instruction.NoOperation:
        currentInstruction++;
        break;

      default:
        throw new Error(`Unknown instruction type "${instruction}"`);
    }
  }

  const wouldInfinitelyLoop = previouslyRunInstructions.includes(
    currentInstruction
  );

  return [accumulator, wouldInfinitelyLoop];
}

export function fixInfiniteLoop(instructions: ParsedInstruction[]) {
  const culprits = instructions.reduce(
    (possibilities, [instruction], index) => {
      if ([Instruction.Jump, Instruction.NoOperation].includes(instruction)) {
        return [...possibilities, index];
      }

      return possibilities;
    },
    []
  );
  let [, didInfinitelyLoop] = run(instructions);
  let modifiedInstructions: ParsedInstruction[];

  while (culprits.length && didInfinitelyLoop) {
    modifiedInstructions = [...instructions];
    const index = culprits.shift();
    const [instruction, qty] = instructions[index];

    modifiedInstructions[index] = [
      instruction === Instruction.Jump
        ? Instruction.NoOperation
        : Instruction.Jump,
      qty,
    ];
    [, didInfinitelyLoop] = run(modifiedInstructions);
  }

  return modifiedInstructions;
}

function parseInstruction(input: string): ParsedInstruction {
  const [match, instruction, signedNumber] =
    /([a-z]{3})\s(\-?\+?[0-9]+)/g.exec(input) ?? [];
  return [instruction as Instruction, parseInt(signedNumber)];
}

export function parseInstructions(program: string) {
  return program
    .split("\n")
    .filter((it) => it.trim().length)
    .map(parseInstruction);
}

enum Instruction {
  Acummuluate = "acc",
  Jump = "jmp",
  NoOperation = "nop",
}

type ParsedInstruction = [Instruction, number];
