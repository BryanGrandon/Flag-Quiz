import { useState } from 'react'
import { useClassicStorage } from './useGameStorage'

export const useClassicStreak = () => {
  const { storageOfGameStreaks } = useClassicStorage()
  const [currentStreak, setCurrentStreak] = useState<number>(storageOfGameStreaks.current.get())
  const [bestStreak, setBestStreak] = useState<number>(storageOfGameStreaks.best.get())

  const increaseStreak = () => {
    setCurrentStreak((prev) => {
      const newStreak = prev + 1
      storageOfGameStreaks.current.set(newStreak)
      setBestStreak((best) => {
        if (newStreak > bestStreak) {
          storageOfGameStreaks.best.set(newStreak)
          return newStreak
        } else return best
      })

      return newStreak
    })
  }

  const resetStreak = () => {
    setCurrentStreak(0)
    storageOfGameStreaks.current.set(0)
  }

  return {
    currentStreak,
    bestStreak,
    increaseStreak,
    resetStreak,
  }
}
