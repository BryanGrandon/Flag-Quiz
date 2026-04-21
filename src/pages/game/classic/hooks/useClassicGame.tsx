import { useCallback, useEffect, useRef, useState } from 'react'
import { createClassicGameStorage } from '../../../../services/storage/classicGameStorage'
import { createClassicRound } from '../model/createClassicRound'
import { useCountries } from './useCountries'
import type { GameRound } from '../types/round'
import type { Country } from '../types/country'
import { CLASSIC_GAME_CONFIG } from '../constants/config'
import useGameConfig from './useGameConfig'
import type { QuestionType } from '../constants/question-type'
import type { ClassicMode } from '../constants/modes'

const useClassicGame = () => {
  const { countries, isReady } = useCountries()
  const remainingCountriesRef = useRef<Country[]>([])

  useEffect(() => {
    if (countries.length) remainingCountriesRef.current = countries
  }, [countries])

  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [gameRound, setGameRound] = useState<GameRound>({ image: { svg: '', alt: '', png: '' }, options: [] })
  const { setGameConfig, gameMode, gameQuestionType } = useGameConfig()

  const startClassicGame = useCallback(
    ({ type, mode }: { type: QuestionType; mode: ClassicMode }) => {
      if (!isReady) return
      setGameConfig({ type, mode })
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
    [isReady, countries, setGameConfig],
  )

  const restartGame = () => {
    setIsGameOver(false)
    remainingCountriesRef.current = [...countries]
    startClassicGame({ type: gameQuestionType, mode: gameMode })
  }

  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const checkAnswer = (userAnswer: string) => {
    const isCorrect = userAnswer === correctAnswer
    const storage = createClassicGameStorage(gameQuestionType, gameMode)
    storage.remove()

    if (isCorrect) startClassicGame({ type: gameQuestionType, mode: gameMode })
    else {
      const correctAnswers: number = countries.length - remainingCountriesRef.current.length
      const points = correctAnswers * CLASSIC_GAME_CONFIG.POINTS_PER_CORRECT
      console.log(points)
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
