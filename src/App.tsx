import { useMemo, useState } from 'react';
import './App.css';
import Quiz from './components/Quiz/Quiz';
import Question, { generateStats, QuestionResult } from './Types';

export function App() {
  const questions: Array<Question> = [
    {
      question: "What is 4?",
      correctAnswer: "4",
      otherAnswers: ["1", "2", "3"]
    }
  ]

  const [results, setResults] = useState<Array<QuestionResult> | undefined>()

  if (results !== undefined) {
    const stats = generateStats(questions.length, results || [])
    return (<>
      <h2>Congrats you survived!</h2>
      <h3>Questions answered: {stats.questionCount}</h3>
      <h3>Answers: {stats.correctAnswers}/{stats.answers}</h3>
    </>)
  } else {
    return <Quiz questions={questions} onQuizFinished={setResults} />
  }
}
