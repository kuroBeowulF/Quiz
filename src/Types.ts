export interface Results {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
export interface Response {
  response_code: number;
  results: Results[];
}
export type StateResults = Results & { answers: string[] };

export interface AnswerObject {
  question: string;
  uncorrect: string | null;
  answer: string;
  correct_answer: string;
}
interface Amount {
  lable: string;
  value: number;
}
export interface MockData {
  amount: Amount[];
  difficulty: string[];
  category: Amount[];
}
