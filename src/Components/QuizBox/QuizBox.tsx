import * as React from "react";
// Matrial ui
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, FormHelperText, Grid } from "@mui/material";
//Components
import Question from "../Question/Questions";
//fetchApi
import { fetchApi } from "../../Tools/Api";
//types
import { Response } from "../../Types";

const QuizBox: React.FC = () => {
  const [condition, setcondition] = React.useState(false);
  const [value, setValue] = React.useState({
    amount: "",
    difficulty: "",
    category: "",
  });
  console.log(value);
  const [data, setData] = React.useState<Response[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [gameOver, setGameOver] = React.useState(true);
  const [questionNumber, setQuestionNumber] = React.useState(1);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const data = fetchApi(value.amount, value.difficulty, value.category);
    // setData(data)
  }, [condition]);

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
  };
  const finishGame = () => {
    setGameOver(true);
  };

  return (
    <>
      <h1>Quiz</h1>
      <Box>Score : {score}</Box>
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
              {questionNumber} / {value.amount}
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
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={15}>Fifteen</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
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
                  <MenuItem value={"easy"}>Easy</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                  <MenuItem value={"hard"}>Hard</MenuItem>
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
                  <MenuItem value={11}>Film</MenuItem>
                  <MenuItem value={12}>Music</MenuItem>
                  <MenuItem value={10}>Books</MenuItem>
                  <MenuItem value={15}>Games</MenuItem>
                  <MenuItem value={18}>Computer</MenuItem>
                  <MenuItem value={21}>Sport</MenuItem>
                  <MenuItem value={23}>History</MenuItem>
                  <MenuItem value={27}>Animals</MenuItem>
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
        {!gameOver ? <Question /> : ""}
      </Box>
    </>
  );
};
export default QuizBox;
