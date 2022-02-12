// a function which will merge correct answer and uncorrects , randomly

export const answersArray = (array: string[], answer: string) => {
  let pastAnswers = [...array, answer];
  let answers = [];
  for (let i = 3; i >= 0; i--) {
    let randome = Math.floor(Math.random() * (i + 1));
    answers.push(pastAnswers[randome]);
    pastAnswers.splice(randome, 1);
  }
  return answers;
};
