import { useMemo, useState } from 'react'
import { storage } from '../../../../utilities/storage'
import { CLASSIC_GAME_CONFIG } from '../constants/config'
import { QUESTION_TYPES, type QuestionType } from '../constants/question-type'
import { CLASSIC_MODE, type ClassicMode } from '../constants/modes'
import type { SavedClassicRound } from '../types/storage'

export const useClassicStorage = () => {
  const [selectedType, setSelectedType] = useState<QuestionType>(QUESTION_TYPES.CAPITAL)
  const [selectedMode, setSelectedMode] = useState<ClassicMode>(CLASSIC_MODE.MULTIPLE_CHOICE)

  const roundGame = useMemo(() => {
    const baseKey = CLASSIC_GAME_CONFIG.STORAGE_KEYS.SAVED_CLASSIC_ROUND
    const storageKey = `${baseKey}:${selectedType}:${selectedMode}`
    return {
      load: (): SavedClassicRound | null => storage.load<SavedClassicRound>(storageKey),
      save: (data: SavedClassicRound): void => storage.save(storageKey, data),
      remove: (): void => storage.remove(storageKey),
    }
  }, [selectedMode, selectedType])

  const gameConfig = useMemo(() => {
    return {
      set: ({ type, mode }: { type: QuestionType; mode: ClassicMode }) => {
        setSelectedType(type)
        setSelectedMode(mode)
        storage.save('gameType', type)
        storage.save('gameMode', mode)
      },
    }
  }, [])

  const BASE_CURRENT_STREAK = 'currentStreak'
  const KEY_CURRENT_STREAK = `${BASE_CURRENT_STREAK}:${selectedType}:${selectedMode}`
  const BASE_BEST_STREAK = 'bestStreak'
  const KEY_BEST_STREAK = `${BASE_BEST_STREAK}:${selectedType}:${selectedMode}`

  const storageOfGameStreaks = {
    current: {
      get: () => storage.load<number>(KEY_CURRENT_STREAK) ?? 0,
      set: (value: number) => storage.save(KEY_CURRENT_STREAK, value),
    },
    best: {
      get: () => storage.load<number>(KEY_BEST_STREAK) ?? 0,
      set: (value: number) => storage.save(KEY_BEST_STREAK, value),
    },
  }

  return { roundGame, gameConfig, selectedType, selectedMode, storageOfGameStreaks }
}
