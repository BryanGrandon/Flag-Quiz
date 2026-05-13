import { useCallback, useState } from 'react'
import type { GeneralActions } from '../types/general-actions'

const RESULT_DELAY = 800

export const useMultipleChoice = ({ validators, gameActions, storageActions }: GeneralActions) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isWrongAnswer, setIsWrongAnswer] = useState(false)

  const resetState = useCallback(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setIsWrongAnswer(false)
  }, [])
  const handleTryAgain = useCallback(() => {
    resetState()
    gameActions.restart()
  }, [resetState, gameActions])

  const handleOptionSelect = useCallback(
    (option: string) => {
      if (showResult) return

      const isCorrect = validators.checkAnswer(option)

      setSelectedAnswer(option)
      setShowResult(true)
      setIsWrongAnswer(!isCorrect)

      storageActions.reset()

      setTimeout(() => {
        if (isCorrect) {
          resetState()
          gameActions.nextRound()
        } else {
          handleTryAgain()
        }
      }, RESULT_DELAY)
    },
    [resetState, showResult, validators, gameActions, storageActions, handleTryAgain],
  )

  const getButtonStyle = useCallback(
    (option: string) => {
      if (!showResult) return 'bg-gray-700 hover:bg-gray-600'
      if (validators.checkAnswer(option)) return 'bg-green-600 border-green-400 scale-102'
      if (option === selectedAnswer) return 'bg-red-600 border-red-400'
      return 'bg-gray-700 opacity-40'
    },
    [selectedAnswer, showResult, validators],
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
