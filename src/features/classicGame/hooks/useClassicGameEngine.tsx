import { useState } from 'react'
import { useClassicGameStorage } from './useClassicGameStorage'
import { useClassicRoundManager } from './useClassicRoundManager'
import { useCountriesPool } from './useCountriesPool'
import { useCountriesQuery } from './useCountriesQuery'

export const useClassicGameEngine = () => {
  const { startClassicGame, classicGame, configClassicGame } = useClassicRoundManager()
  const { isLoading, data: countries } = useCountriesQuery()
  const { remainingCountries } = useCountriesPool(countries)
  const { getGameStorage } = useClassicGameStorage()

  // Streak

  const [streakManager, setStreakManager] = useState({
    current: classicGame.streak?.current ?? 0,
    best: classicGame.streak?.best ?? 0,
  })

  const increaseStreak = () => {
    setStreakManager((prev) => {
      const current = prev.current + 1
      const best = Math.max(prev.best, current)
      getGameStorage(configClassicGame).save({ streak: { current: current, best: best } })
      return { current, best }
    })
  }

  const resetStreak = () => {
    setStreakManager((prev) => {
      getGameStorage(configClassicGame).save({ streak: { current: 0, best: prev.best } })
      return { ...prev, current: 0 }
    })
  }

  // check answer, restart game
  const nextRound = () => startClassicGame(configClassicGame)

  const handlerCorrectAnswer = () => {
    nextRound()
    increaseStreak()
  }

  const restartGame = () => {
    remainingCountries.reset()
    nextRound()
    resetStreak()
  }
  const checkAnswer = ({ value }: { value: string }) => {
    const isCorrect = value.toLowerCase() === classicGame.winner?.toLowerCase()
    getGameStorage(configClassicGame).remove(['winner', 'options', 'image'])
    if (isCorrect) handlerCorrectAnswer()
  }

  return { startClassicGame, classicGame, isLoading, checkAnswer, restartGame, streakManager }
}
