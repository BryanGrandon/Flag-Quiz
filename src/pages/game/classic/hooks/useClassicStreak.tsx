import { useState } from 'react'
import { useClassicStorage } from './useGameStorage'

export const useClassicStreak = () => {
  const { storageOfGameStreaks } = useClassicStorage()
  const { selectedMode, selectedType } = useClassicStorage()
  const [currentStreak, setCurrentStreak] = useState<number>(storageOfGameStreaks({ type: selectedType, mode: selectedMode }).current.get())
  const [bestStreak, setBestStreak] = useState<number>(storageOfGameStreaks({ type: selectedType, mode: selectedMode }).best.get())

  const increaseStreak = () => {
    setCurrentStreak((prev) => {
      const newStreak = prev + 1
      storageOfGameStreaks({ type: selectedType, mode: selectedMode }).current.set(newStreak)
      setBestStreak((best) => {
        if (newStreak > bestStreak) {
          storageOfGameStreaks({ type: selectedType, mode: selectedMode }).best.set(newStreak)
          return newStreak
        } else return best
      })

      return newStreak
    })
  }

  const resetStreak = () => {
    setCurrentStreak(0)
    storageOfGameStreaks({ type: selectedType, mode: selectedMode }).current.set(0)
  }

  const streak = {
    increase: () => increaseStreak(),
    reset: () => resetStreak(),
    current: currentStreak,
    best: bestStreak,
  }

  return {
    streak,
  }
}
