import { useCallback, useEffect, useRef, useState } from 'react'
import { createClassicRound } from '../model/createClassicRound'
import { useCountries } from './useCountries'
import type { GameRound } from '../types/round'
import type { Country } from '../types/country'
import type { QuestionType } from '../constants/question-type'
import type { ClassicMode } from '../constants/modes'
import { useClassicStorage } from './useGameStorage'

const useClassicGame = () => {
  const { countries, isReady } = useCountries()
  const remainingCountriesRef = useRef<Country[]>([])

  useEffect(() => {
    if (countries.length) remainingCountriesRef.current = countries
  }, [countries])

  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [gameRound, setGameRound] = useState<GameRound>({ image: { svg: '', alt: '', png: '' }, options: [] })
  const { roundGame, gameConfig, selectedMode, selectedType } = useClassicStorage()

  const startClassicGame = useCallback(
    ({ type, mode }: { type: QuestionType; mode: ClassicMode }) => {
      if (!isReady) return
      gameConfig.set({ type, mode })
      const saved = roundGame.load()
      if (saved) {
        setCorrectAnswer(saved.winner)
        setGameRound({ image: saved.image, options: saved.options })
        return
      }
      const baseCountries = remainingCountriesRef.current.length > 0 ? remainingCountriesRef.current : countries
      const round = createClassicRound({ type, mode, countries, remainingCountries: baseCountries })
      setCorrectAnswer(round.winner)
      setGameRound({ image: round.image, options: round.options })
      roundGame.save({ winner: round.winner, image: round.image, options: round.options })
      remainingCountriesRef.current = round.newRemainingCountries
    },
    [isReady, countries, roundGame, gameConfig],
  )

  const restartGame = () => {
    roundGame.remove()
    setIsGameOver(false)
    remainingCountriesRef.current = [...countries]
    startClassicGame({ type: selectedType, mode: selectedMode })
  }

  const [isGameOver, setIsGameOver] = useState<boolean>(false)

  const checkAnswer = (userAnswer: string) => {
    const isCorrect = userAnswer === correctAnswer

    if (isCorrect) {
      roundGame.remove()
      startClassicGame({ type: selectedType, mode: selectedMode })
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
