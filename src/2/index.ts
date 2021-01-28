export class Password {
  static regex = /(\d+)\-(\d+)\s([a-z])\:\s([a-z]+)/i;

  constructor(
    public letter: string,
    public min: number,
    public max: number,
    public password: string,
    public input: string
  ) {}

  static from = (input: string): Password => {
    const [match, min, max, letter, password] = Password.regex.exec(input);

    return new Password(letter, Number(min), Number(max), password, input);
  };

  get valid() {
    if (!this.letter) {
      throw new Error(`Invalid policy: ${this.input}`);
    }

    const count = this.password.split("").reduce((count, letter) => {
      if (letter !== this.letter) return count;
      return count + 1;
    }, 0);

    return count >= this.min && count <= this.max;
  }
}
