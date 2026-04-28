import { useCallback, useState } from 'react'
import { useCountries } from './useCountries'
import { useClassicStorage } from './useGameStorage'
import { createClassicRound } from '../model/createClassicRound'
import type { GameRound } from '../types/round'
import type { QuestionType } from '../constants/question-type'
import type { ClassicMode } from '../constants/modes'

const useClassicRound = () => {
  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [gameRound, setGameRound] = useState<GameRound>({ image: { svg: '', alt: '', png: '' }, options: [] })
  const { isReady, remainingCountries, countries } = useCountries()
  const { roundGame } = useClassicStorage()

  const startClassicGame = useCallback(
    ({ type, mode }: { type: QuestionType; mode: ClassicMode }) => {
      if (!isReady) return
      const saved = roundGame({ type, mode }).load()
      if (saved) {
        setCorrectAnswer(saved.winner)
        setGameRound({ image: saved.image, options: saved.options })
        return
      }
      const baseCountries = remainingCountries.get().length > 0 ? remainingCountries.get() : countries
      const round = createClassicRound({ type, mode, countries, remainingCountries: baseCountries })
      setCorrectAnswer(round.winner)
      setGameRound({ image: round.image, options: round.options })
      roundGame({ type, mode }).save({ winner: round.winner, image: round.image, options: round.options })
      remainingCountries.set(round.newRemainingCountries)
    },
    [isReady, countries, roundGame, remainingCountries],
  )

  return {
    correctAnswer,
    gameRound,
    startClassicGame,
  }
}

export default useClassicRound
