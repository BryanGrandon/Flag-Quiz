import { useState } from 'react'
import { useClassicGameStorage } from './useClassicGameStorage'
import { useClassicRoundManager } from './useClassicRoundManager'
import { useCountriesPool } from './useCountriesPool'
import { useCountriesQuery } from './useCountriesQuery'

export const useClassicGameEngine = () => {
  const { startClassicGame, classicGame, configClassicGame } = useClassicRoundManager()
  // Change name of the classicGame
  const { data: countries } = useCountriesQuery()
  const { remainingCountries } = useCountriesPool(countries)
  const { getGameStorage } = useClassicGameStorage()

  const storage = getGameStorage(configClassicGame)

  // ===== Streak Actions ===== //

  const savedStreak = storage.load()?.streak

  const [streakManager, setStreakManager] = useState({
    current: savedStreak?.current ?? 0,
    best: savedStreak?.best ?? 0,
  })

  const increaseStreak = () => {
    setStreakManager((prev) => {
      const current = prev.current + 1
      const best = Math.max(prev.best, current)
      const streak = { current, best }
      storage.save({ streak })
      return streak
    })
  }

  const resetStreak = () => {
    setStreakManager((prev) => {
      const streak = {
        current: 0,
        best: prev.best,
      }
      storage.save({ streak })
      return streak
    })
  }

  const streakActions = {
    increase: increaseStreak,
    reset: resetStreak,
  }

  // ===== Game Actions ===== //

  const gameActionNextRound = () => {
    startClassicGame(configClassicGame)
    streakActions.increase()
  }

  const gameActionRestart = () => {
    remainingCountries.reset()
    startClassicGame(configClassicGame)
    streakActions.reset()
  }

  const gameActions = {
    nextRound: gameActionNextRound,
    restart: gameActionRestart,
  }

  // ===== Storage Actions ===== //

  const storageActions = {
    reset() {
      storage.remove(['winner', 'options', 'image'])
    },
  }

  // ===== Validators ===== //

  const validators = {
    checkAnswer(value: string) {
      return value.trim().toLowerCase() === classicGame.winner?.trim().toLowerCase()
    },
  }

  return { startClassicGame, classicGame, gameActions, storageActions, validators, streakManager }
}
