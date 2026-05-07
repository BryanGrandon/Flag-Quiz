import { useCallback, useState } from 'react'

type WritingProps = {
  winner: string
  checkAnswer: ({ value }: { value: string }) => void
  restartGame: () => void
}

export const useWriting = ({ winner, checkAnswer, restartGame }: WritingProps) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [inputWriting, setInputWriting] = useState('')
  const [isWrongAnswerInput, setIsWrongAnswerInput] = useState<boolean>(false)

  const setInputValue = (value: string) => {
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    setInputWriting(cleanValue)
  }

  const submit = () => {
    setIsDisabled(true)
    const isCorrect = inputWriting.toLowerCase().trim() === winner.toLowerCase()
    setIsWrongAnswerInput(!isCorrect)

    checkAnswer({ value: inputWriting })
    if (isCorrect) {
      setIsDisabled(false)
      setInputWriting('')
    }
  }

  const restartInput = () => {
    setIsDisabled(false)
    setInputWriting('')
    setIsWrongAnswerInput(false)
    restartGame()
  }

  const getInputStyle = useCallback(() => {
    if (!isDisabled) {
      return 'border-gray-600 focus:ring-green-400'
    }
    const normalizedWinner = winner.trim().toLowerCase()
    const normalizedInput = inputWriting.trim().toLowerCase()

    if (isDisabled) {
      return normalizedInput === normalizedWinner ? 'border-green-400' : 'border-red-400'
    }
  }, [winner, inputWriting, isDisabled])

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
