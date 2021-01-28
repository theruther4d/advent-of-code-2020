export class Password {
  static regex = /(\d+)\-(\d+)\s([a-z])\:\s([a-z]+)/i;

  constructor(
    public letter: string,
    public posA: number,
    public posB: number,
    public password: string,
    public input: string
  ) {}

  static from = (input: string): Password => {
    const [match, min, max, letter, password] = Password.regex.exec(input);

    return new Password(
      letter,
      Number(min) - 1,
      Number(max) - 1,
      password,
      input
    );
  };

  get valid() {
    if (!this.letter) {
      throw new Error(`Invalid policy: ${this.input}`);
    }

    const matches = [this.password[this.posA], this.password[this.posB]].filter(
      (it) => it === this.letter
    );

    return matches.length === 1;
  }
}
