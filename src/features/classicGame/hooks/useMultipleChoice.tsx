import { useCallback, useState } from 'react'

const RESULT_DELAY = 700

type MultipleChoiceProps = {
  winner: string
  checkAnswer: ({ value }: { value: string }) => void
  restartGame: () => void
}

export const useMultipleChoice = ({ winner, checkAnswer, restartGame }: MultipleChoiceProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isWrongAnswer, setIsWrongAnswer] = useState(false)

  console.log(winner)

  const resetState = useCallback(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsWrongAnswer(false)
  }, [])

  const handleOptionSelect = useCallback(
    (option: string) => {
      if (showResult) return

      const isCorrect = option === winner

      setSelectedAnswer(option)
      setShowResult(true)
      setIsWrongAnswer(!isCorrect)

      setTimeout(() => {
        if (!isCorrect) return

        checkAnswer({ value: option })
        resetState()
      }, RESULT_DELAY)
    },
    [checkAnswer, resetState, showResult, winner],
  )

  const handleTryAgain = useCallback(() => {
    resetState()
    restartGame()
  }, [resetState, restartGame])

  const getButtonStyle = useCallback(
    (option: string) => {
      if (!showResult) return 'bg-gray-700 hover:bg-gray-600'
      if (option === winner) return 'bg-green-600 border-green-400 scale-105'
      if (option === selectedAnswer) return 'bg-red-600 border-red-400'
      return 'bg-gray-700 opacity-40'
    },
    [winner, selectedAnswer, showResult],
  )

  return {
    selectedAnswer,
    showResult,
    isWrongAnswer,
    handleOptionSelect,
    handleTryAgain,
    getButtonStyle,
  }
}
