import { Response } from "../Types";
export const fetchApi = async (
  amount: string,
  difficulty: string,
  category: string
):Promise<Response[]> => {
  const data = await (
    await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
  ).json();
  return data.results;
};
