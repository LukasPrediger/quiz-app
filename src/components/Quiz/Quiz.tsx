import React, { FC, useMemo, useState } from 'react';
import styles from './Quiz.module.css';
import Question, { generateStats, QuestionResult } from '../../Types';
import QuestionContainer from '../QuestionContainer/QuestionContainer';
import cyrb53String from '../../hash';

interface QuizProps {
  readonly questions: ReadonlyArray<Question>
  onQuizFinished: (result: Array<QuestionResult>) => void
}

const STORAGE_ITEM_ID = "QUIZ_RESULTS";

function loadResults(): Array<QuestionResult> {
  const storageItem = localStorage.getItem(STORAGE_ITEM_ID)
  if (storageItem === null) {
    return []
  }
  return JSON.parse(storageItem)
}

function saveResults(result: Array<QuestionResult>) {
  localStorage.setItem(STORAGE_ITEM_ID, JSON.stringify(result))
}

const Quiz: FC<QuizProps> = ({questions, onQuizFinished}) => {
  const [results, setResults] = useState<Array<QuestionResult>>(loadResults())
  const [questionIndex, setQuestionIndex] = useState(results.length)

  const stats = useMemo(() => generateStats(questions.length, results), [results])

  const nextQuestion = (result: QuestionResult) => {
    console.log("New Result", result)
    const newResults = [...results, result];
    setResults(newResults)
    saveResults(newResults)
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
      <h2>{stats.answers+1} / {stats.questionCount}</h2>
      <QuestionContainer
        key={cyrb53String(questions[questionIndex].question)}
        question={questions[questionIndex]}
        onNextQuestion={nextQuestion}
        onReset={() => {setResults([])}}
      />
    </div>
  );
};

export default Quiz;
