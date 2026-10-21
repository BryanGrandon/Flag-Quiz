import { useState } from 'react'
import { dynamicStorageKey } from '../../../shared/utilities/dynamicStorageKey'
import { storage } from '../../../shared/utilities/storage'
import type { GameCategories } from '../../../config/games/categories'
import type { GameModes } from '../../../config/games/modes'

type InitSetting = {
  category: GameCategories
  mode: GameModes
}

const useStreak = ({ category, mode }: InitSetting) => {
  const currentStreakKey = dynamicStorageKey({ base: 'streak', dynamic: `current_${category}-${mode}` })
  const bestStreakKey = dynamicStorageKey({ base: 'streak', dynamic: `best_${category}-${mode}` })

  const savedBestStreak: number = storage.load(bestStreakKey) ?? 0
  const savedCurrentStreak: number = storage.load(currentStreakKey) ?? 0

  const [bestStreak, setBestStreak] = useState<number>(savedBestStreak)
  const [currentStreak, setCurrentStreak] = useState<number>(savedCurrentStreak)

  const increaseStreak = () => {
    setCurrentStreak((prev) => {
      const current = prev + 1
      storage.save(currentStreakKey, current)
      setBestStreak((prevBest) => {
        const best = Math.max(prevBest, current)
        storage.save(bestStreakKey, best)
        return best
      })
      return current
    })
  }

  const resetStreak = () => {
    const streak = 0
    storage.save(currentStreakKey, streak)
    setCurrentStreak(streak)
  }

  const streakManager = {
    increase: increaseStreak,
    reset: resetStreak,
  }

  const getStreaks = {
    current: currentStreak,
    best: bestStreak,
  }

  return { streakManager, getStreaks }
}

export default useStreak
