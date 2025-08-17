import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';
import Question, { generateStats, QuestionResult } from './Types';
import fetchQuestions from './loadQuestions';
import { PacmanLoader } from 'react-spinners';
import remoteQuestions from './questions.json';

export function App() {
  const questions = remoteQuestions.map(question => {
    const correctAnswer = question.answers.find(it => it.isCorrect)!!.text
    const otherAnswers = question.answers.filter(it => !it.isCorrect).map(it => it.text)

    return {
      question: question.text,
      correctAnswer,
      otherAnswers
    } as Question
  })

  const [results, setResults] = useState<Array<QuestionResult> | undefined>()
  
  if (questions !== undefined) {
    if (results !== undefined) {
      const stats = generateStats(questions.length, results || [])
      return (<>
        <h2>Congrats you survived!</h2>
        <h3>Questions answered: {stats.questionCount}</h3>
        <h3>Answers: {stats.correctAnswers}/{stats.answers}</h3>
      </>)
    } else {
      return (
        <div id="app-container">
          <Quiz questions={questions} onQuizFinished={setResults} />
        </div>
      )
    }
  } else {
    return (
      <PacmanLoader color='#ffffff' />
    )
  }
}
