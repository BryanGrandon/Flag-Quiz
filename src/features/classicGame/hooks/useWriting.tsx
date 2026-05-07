import { useCallback, useState } from 'react'

type WritingProps = {
  winner: string
  checkAnswer: ({ value }: { value: string }) => void
  restartGame: () => void
}

export const useWriting = ({ winner, checkAnswer, restartGame }: WritingProps) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [inputWriting, setInputWriting] = useState('')
  const [IsWrongAnswerInput, setIsWrongAnswerInput] = useState<boolean>(false)

  const setInputValue = (value: string) => {
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '')
    setInputWriting(cleanValue)
  }

  const submit = () => {
    if (!inputWriting.trim()) return
    setIsDisabled(true)
    const isCorrect = inputWriting === winner
    setIsWrongAnswerInput(!isCorrect)

    if (inputWriting === winner) {
      setIsDisabled(false)
      setInputWriting('')
      checkAnswer({ value: inputWriting.trim().toLowerCase() })
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
    IsWrongAnswerInput,
    isDisabled,
    inputWriting,
    setInputValue,
    submit,
    restartInput,
    getInputStyle,
  }
}
