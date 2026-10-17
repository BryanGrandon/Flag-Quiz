import { useState } from 'react'
import { dynamicStorageKey } from '../../../shared/utilities/dynamicStorageKey'
import { storage } from '../../../shared/utilities/storage'
import type { GameCategories } from '../../../config/games/categories'
import type { GameModes } from '../../../config/games/modes'

const useStreak = () => {
  const initCategoryKey = dynamicStorageKey({ base: 'init_category', dynamic: '' })
  const initModeKey = dynamicStorageKey({ base: 'init_mode', dynamic: '' })

  const category: GameCategories = storage.load(initCategoryKey) ?? 'country'
  const mode: GameModes = storage.load(initModeKey) ?? 'multiple_choice'

  type SavedStreak = { current: number; best: number } | undefined

  const streakKey = dynamicStorageKey({ base: 'streak', dynamic: `${category}-${mode}` })
  const savedStreak: SavedStreak = storage.load(streakKey) ?? undefined

  const [streakManager, setStreakManager] = useState({
    current: savedStreak?.current ?? 0,
    best: savedStreak?.best ?? 0,
  })

  const increaseStreak = () => {
    setStreakManager((prev) => {
      const current = prev.current + 1
      const best = Math.max(prev.best, current)
      const streak = { current, best }
      storage.save(streakKey, streak)
      return streak
    })
  }

  const resetStreak = () => {
    setStreakManager((prev) => {
      const streak = { current: 0, best: prev.best }
      storage.save(streakKey, streak)
      return streak
    })
  }

  const streakActions = {
    increase: increaseStreak,
    reset: resetStreak,
  }

  const getStreakInfo = {
    general: { category, mode },
    streak: {
      current: () => streakManager.current,
      best: () => streakManager.best,
    },
  }

  return { streakActions, getStreakInfo }
}

export default useStreak
