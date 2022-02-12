import React from "react";
//Components
import { Box, Button } from "@mui/material";
//types
import { StateResults, AnswerObject } from "../../Types";

type Props = {
  questions: StateResults[];
  questionNumber: number;
  userAnswer: AnswerObject[];
  nextQuestion: () => void;
  checkAnswer: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Question: React.FC<Props> = ({
  questions,
  questionNumber,
  userAnswer,
  nextQuestion,
  checkAnswer,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "320px",
        padding: "10px 4px 4px 4px",
        position: "relative",
      }}
    >
      <h4
        dangerouslySetInnerHTML={{ __html: questions[questionNumber].question }}
      />
      {questions[questionNumber].answers.map((answer, index) => (
        <Button
          sx={[
            {
              display: "block",
              margin: "0 auto",
              color: "#eee",
              fontWeight: "none",
            },

            () =>
              answer === userAnswer[questionNumber]?.uncorrect
                ? { "&:disabled": { color: "red" } }
                : answer === userAnswer[questionNumber]?.correct_answer
                ? { "&:disabled": { color: "green" } }
                : { "&:disabled": { color: "#eee" } },
          ]}
          key={answer}
          onClick={checkAnswer}
          value={answer}
          disabled={userAnswer.length !== questionNumber ? true : false}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </Button>
      ))}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          bottom: 4,
          right: 4,
        }}
      >
        {userAnswer.length !== questionNumber ? (
          <Button variant="contained" size="small" onClick={nextQuestion}>
            Next Question
          </Button>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
export default Question;
