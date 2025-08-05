import React, { FC, useMemo, useState } from 'react';
import styles from './QuestionContainer.module.css';
import Question, { questionId, QuestionResult } from "../../Types";
import AnswerButton from '../AnswerButton/AnswerButton';
import shuffle from '../../shuffle';
import cyrb53String from '../../hash';

interface QuestionContainerProps {
  question: Question,
  onNextQuestion: (result: QuestionResult) => void
}

type AnswerTupel = [string, boolean]

const QuestionContainer: FC<QuestionContainerProps> = ({question, onNextQuestion}) => {
  const [anyButtonPressed, setAnyButtonPressed] = useState<boolean>(false)
  const [questionResult, setQuestionResult] = useState<QuestionResult|undefined>()

  const setResult = (seletedAnswer: string) => setQuestionResult(
    new QuestionResult(
      questionId(question),
      question.question,
      seletedAnswer,
      question.correctAnswer
    ))

  const answers = useMemo(() => shuffle(
    question.otherAnswers.reduce((acc, curr) => [...acc, [curr, false] as AnswerTupel], [[question.correctAnswer, true]] as AnswerTupel[])
  ), [question]);

  return (
    <div className={styles.QuestionContainer}>
      <h2>{question.question}</h2>
      <div className={styles.AnswerContainer}>
        {
        answers.map(([answer, isCorrect]) => 
          <AnswerButton
            key={cyrb53String(`${question.question}-${answer}`)} 
            answer={answer} 
            isCorrectAnswer={isCorrect} 
            anyButtonPressed = {anyButtonPressed}
            onButtonPressed={() => {
              setResult(answer)
              setAnyButtonPressed(true);
            }}
          />
        )
        }
        <button disabled = { !questionResult } onClick={() => {
          onNextQuestion(questionResult!!)
        }}>Next</button>
      </div>
    </div>
  );
};

export default QuestionContainer;
