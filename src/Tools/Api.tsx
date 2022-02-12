//ype
import { StateResults } from "../Types";
//Fix answers array
import { answersArray } from "./answersArray";

export const fetchApi = async (
  amount: string,
  difficulty: string,
  category: string
): Promise<StateResults[]> => {
  const data = await (
    await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
  ).json();
  return data.results.map(
    (question: StateResults) =>
      (question = {
        ...question,
        answers: answersArray(
          question.incorrect_answers,
          question.correct_answer
        ),
      })
  );
};
