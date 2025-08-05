import React, { FC, useMemo, useState } from 'react';
import styles from './Quiz.module.css';
import Question, { generateStats, QuestionResult } from '../../Types';
import QuestionContainer from '../QuestionContainer/QuestionContainer';

interface QuizProps {
  readonly questions: ReadonlyArray<Question>
  onQuizFinished: (result: Array<QuestionResult>) => void
}

const Quiz: FC<QuizProps> = ({questions, onQuizFinished}) => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [results, setResults] = useState<Array<QuestionResult>>([])

  const stats = useMemo(() => generateStats(questions.length, results), [results])

  const nextQuestion = (result: QuestionResult) => {
    console.log("New Result", result)
    const newResults = [...results, result];
    setResults(newResults)
    const nextIndex = questionIndex + 1
    if (nextIndex >= questions.length) {
      console.log("Quiz finished", newResults)
      onQuizFinished(newResults)
    } else {
      setQuestionIndex(nextIndex)
    }
  }

  return (
    <div className={styles.Quiz}>
      <QuestionContainer
        question={questions[questionIndex]}
        onNextQuestion={nextQuestion}
      />
    </div>
  );
};

export default Quiz;
