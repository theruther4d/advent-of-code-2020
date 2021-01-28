export function sumUniqueAnswers(allAnswers: string) {
  const answers = allAnswers.split(/\n\n/);

  return answers.reduce((sum, answer) => {
    const uniqueAnswers = new Set(
      answer.split(SEPARATORS).filter(isAlphabetic)
    );
    return sum + uniqueAnswers.size;
  }, 0);
}

export function sumUnanimousAnswers(allAnswers: string) {
  const answers = allAnswers.split(/\n\n/);

  return answers.reduce((sum, answer) => {
    const uniqueAnswers = new Set(
      answer.split(SEPARATORS).filter(isAlphabetic)
    );
    const responses = answer.trim().split(/\n/);

    const unanimousAnswers = [...uniqueAnswers].filter((letter) => {
      return responses.every((response) => response.includes(letter));
    });

    return sum + unanimousAnswers.length;
  }, 0);
}

const isAlphabetic = (it: string) => /[a-z]/i.test(it);
const SEPARATORS = /\s|\n|\B/;
