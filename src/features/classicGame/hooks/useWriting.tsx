import { useCallback, useState } from 'react'
import type { GeneralActions } from '../types/general-actions'

export const useWriting = ({ validators, gameActions, storageActions }: GeneralActions) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [inputWriting, setInputWriting] = useState('')
  const [isWrongAnswerInput, setIsWrongAnswerInput] = useState<boolean>(false)

  const setInputValue = (value: string) => {
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    setInputWriting(cleanValue)
  }

  const submit = () => {
    setIsDisabled(true)
    const isCorrect = validators.checkAnswer(inputWriting)
    setIsWrongAnswerInput(!isCorrect)

    storageActions.reset()
    if (isCorrect) {
      setIsDisabled(false)
      setInputWriting('')
      gameActions.nextRound()
    }
  }

  const restartInput = () => {
    setIsDisabled(false)
    setInputWriting('')
    setIsWrongAnswerInput(false)
    gameActions.restart()
  }

  const getInputStyle = useCallback(() => {
    if (!isDisabled) {
      return 'border-gray-600 focus:ring-green-400'
    }

    if (isDisabled) {
      return validators.checkAnswer(inputWriting) ? 'border-green-400' : 'border-red-400'
    }
  }, [inputWriting, isDisabled, validators])

  return {
    isWrongAnswerInput,
    isDisabled,
    inputWriting,
    setInputValue,
    submit,
    restartInput,
    getInputStyle,
  }
}
