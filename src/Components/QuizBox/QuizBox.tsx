import * as React from "react";
// Matrial ui
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, FormHelperText, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
//Components
import Question from "../Question/Questions";
import { mockData } from "../../Tools/mockData";
//fetchApi
import { fetchApi } from "../../Tools/Api";
//types
import { StateResults, AnswerObject } from "../../Types";

const QuizBox: React.FC = () => {
  //States
  const [condition, setcondition] = React.useState(false);
  const [value, setValue] = React.useState({
    amount: "",
    difficulty: "",
    category: "",
  });
  const [questions, setQuestions] = React.useState<StateResults[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(true);
  const [questionNumber, setQuestionNumber] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [userAnswer, setUserAnswer] = React.useState<AnswerObject[]>([]);

  //Effect
  React.useEffect(() => {
    const data = fetchApi(value.amount, value.difficulty, value.category);
    data.then((res) => setQuestions(res)).finally(() => setLoading(false));
  }, [condition]);

  //Functions
  const handleChange = (event: SelectChangeEvent) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value as string,
    });
  };
  const startQuiz = () => {
    setLoading(true);
    setGameOver(false);
    setcondition((prev) => !prev);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswer([]);
  };
  const finishGame = () => {
    setGameOver(true);
  };
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answer = event.currentTarget.value;
    const test =
      questions[questionNumber].correct_answer === answer ? true : false;
    const uncorrect =
      questions[questionNumber].correct_answer !== answer ? answer : "";
    if (test) setScore((prev) => prev + 1);
    const answerObject = {
      question: questions[questionNumber].question,
      uncorrect,
      answer,
      correct_answer: questions[questionNumber].correct_answer,
    };
    setUserAnswer([...userAnswer, answerObject]);
  };
  const nextQuestion = () => {
    const nextquestion = questionNumber + 1;
    if (nextquestion === +value.amount) {
      setGameOver(true);
    } else setQuestionNumber(nextquestion);
  };

  //Props
  const Props = {
    questions,
    questionNumber,
    userAnswer,
    nextQuestion,
    checkAnswer,
  };

  return (
    <>
      <h1>Quiz</h1>
      <Box sx={{ fontWeight: "bold", fontSize: 18 }}>Score : {score}</Box>
      <Box
        sx={{
          width: "400px",
          height: "400px",
          bgcolor: "rgba(13, 13, 13, 0.21)",
          margin: "0 auto",
          textAlign: "center",
          padding: "4px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          color: "#eee",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: "16px",
        }}
      >
        {!gameOver ? (
          <Grid display="flex" justifyContent="space-between" padding="10px">
            <Button variant="contained" size="small" onClick={finishGame}>
              Finish
            </Button>
            <p>
              {questionNumber + 1} / {value.amount}
            </p>
          </Grid>
        ) : (
          <Grid
            container
            sx={{
              disply: "flex",
              width: "100%",
              height: "130px",
              padding: "10px",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <Select
                  value={value.amount}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  displayEmpty
                  name={"amount"}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {mockData.amount.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.lable}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Amount</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <Select
                  value={value.difficulty}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  displayEmpty
                  name={"difficulty"}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {mockData.difficulty.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>difficulty</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, minWidth: 100 }}>
                <Select
                  value={value.category}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "Without label" }}
                  displayEmpty
                  name={"category"}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {mockData.category.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.lable}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Category</FormHelperText>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              size="medium"
              onClick={startQuiz}
              sx={{ mt: "10px" }}
            >
              start
            </Button>
          </Grid>
        )}
        {!gameOver && !loading ? (
          <Question {...Props} />
        ) : !gameOver ? (
          <Box>
            <CircularProgress />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
export default QuizBox;
