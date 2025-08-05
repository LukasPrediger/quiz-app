import React, { FC, useState } from 'react';
import styles from './AnswerButton.module.css';

interface AnswerButtonProps {
  answer: string
  isCorrectAnswer: boolean
  anyButtonPressed: boolean
  onButtonPressed: () => void
}

const AnswerButton: FC<AnswerButtonProps> = ({ answer, anyButtonPressed, isCorrectAnswer, onButtonPressed }) => {
  const [pressed, setPressed] = useState<boolean>(false)

  let className = ""
  if (anyButtonPressed && isCorrectAnswer) {
    className = styles.correct 
  }
  else if (pressed) {
    className = styles.wrong
  }

  return (
    <button disabled = {anyButtonPressed} className={className} onClick={() => {
      setPressed(true)
      onButtonPressed()
    }} >{answer}</button>
  );
};

export default AnswerButton;
