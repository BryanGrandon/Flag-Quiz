import { useCallback, useEffect, useRef, useState } from 'react'
import { createClassicGameStorage } from '../../../../services/storage/classicGameStorage'
import { createClassicRound } from '../model/createClassicRound'
import { useCountries } from './useCountries'
import { QUESTION_TYPES, type QuestionType } from '../constants/question-type'
import { CLASSIC_MODE, type ClassicMode } from '../constants/modes'
import type { GameRound } from '../types/round'
import type { Country } from '../types/country'

const useClassicGame = () => {
  const { countries, isReady } = useCountries()
  const remainingCountriesRef = useRef<Country[]>([])

  useEffect(() => {
    if (countries.length) remainingCountriesRef.current = countries
  }, [countries])

  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [gameRound, setGameRound] = useState<GameRound>({ image: { svg: '', alt: '', png: '' }, options: [] })
  const [questionType, setQuestionType] = useState<QuestionType>(QUESTION_TYPES.CAPITAL)
  const [modeSelect, setModeSelect] = useState<ClassicMode>(CLASSIC_MODE.MULTIPLE_CHOICE)

  const startClassicGame = useCallback(
    (type: QuestionType, mode: ClassicMode) => {
      if (!isReady) return
      setQuestionType(type)
      setModeSelect(mode)
      const storage = createClassicGameStorage(type, mode)
      const saved = storage.load()
      if (saved) {
        setCorrectAnswer(saved.winner)
        setGameRound({ image: saved.image, options: saved.options })
        return
      }
      const baseCountries = remainingCountriesRef.current.length > 0 ? remainingCountriesRef.current : countries
      const round = createClassicRound({ type, mode, countries, remainingCountries: baseCountries })
      setCorrectAnswer(round.winner)
      setGameRound({ image: round.image, options: round.options })
      remainingCountriesRef.current = round.newRemainingCountries
    },
    [isReady, countries],
  )

  const nextRound = () => {
    // Remove
    if (!questionType || !modeSelect) return
    if (questionType && modeSelect) startClassicGame(questionType, modeSelect)
  }

  const restartGame = () => {
    setIsGameOver(false)
    remainingCountriesRef.current = countries
    nextRound()
  }

  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const checkAnswer = (userAnswer: string) => {
    const isCorrect = userAnswer === correctAnswer
    const storage = createClassicGameStorage(questionType, modeSelect)
    storage.remove()

    if (isCorrect) {
      nextRound()
    } else {
      setIsGameOver(true)
    }
  }

  return {
    startClassicGame,
    isReady,
    gameRound,
    checkAnswer,
    isGameOver,
    restartGame,
  }
}

export default useClassicGame
