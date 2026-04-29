import { useState } from 'react'
import { useCountries } from './useCountries'
import { useClassicStorage } from './useGameStorage'
import useClassicRound from './useClassicRound'
import { useClassicStreak } from './useClassicStreak'

const useClassicGame = () => {
  const { correctAnswer, gameRound, startClassicGame } = useClassicRound()
  const { selectedMode, selectedType } = useClassicStorage()
  const { isReady, remainingCountries } = useCountries()
  const { roundGame } = useClassicStorage()
  const { streak } = useClassicStreak()

  const nextRound = () => startClassicGame({ type: selectedType, mode: selectedMode })

  const handleCorrectAnswer = () => {
    streak.increase()
    nextRound()
  }

  const handleWrongAnswer = () => {
    setIsGameOver(true)
  }

  const restartGame = () => {
    remainingCountries.reset()
    streak.reset()
    setIsGameOver(false)
    nextRound()
  }

  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const checkAnswer = (userAnswer: string) => {
    const isCorrect = userAnswer === correctAnswer
    roundGame({ type: selectedType, mode: selectedMode }).remove()
    if (isCorrect) handleCorrectAnswer()
    else handleWrongAnswer()
  }

  return {
    startClassicGame,
    isReady,
    gameRound,
    checkAnswer,
    isGameOver,
    restartGame,
    streak,
    correctAnswer,
  }
}

export default useClassicGame
