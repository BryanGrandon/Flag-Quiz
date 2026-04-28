import { useState } from 'react'
import { storage } from '../../../../utilities/storage'
import { CLASSIC_GAME_CONFIG } from '../constants/config'
import { QUESTION_TYPES, type QuestionType } from '../constants/question-type'
import { CLASSIC_MODE, type ClassicMode } from '../constants/modes'
import type { SavedClassicRound } from '../types/storage'

export const useClassicStorage = () => {
  const KEY_SELECTED_TYPE = 'gameType'
  const KEY_SELECTED_MODE = 'gameMode'

  const [selectedType, setSelectedType] = useState<QuestionType>(storage.load<QuestionType>(KEY_SELECTED_TYPE) ?? QUESTION_TYPES.COUNTRY)
  const [selectedMode, setSelectedMode] = useState<ClassicMode>(storage.load<ClassicMode>(KEY_SELECTED_MODE) ?? CLASSIC_MODE.MULTIPLE_CHOICE)

  const roundGame = ({ type, mode }: { type: QuestionType; mode: ClassicMode }) => {
    const baseKey = CLASSIC_GAME_CONFIG.STORAGE_KEYS.SAVED_CLASSIC_ROUND
    const storageKey = `${baseKey}:${type}:${mode}`

    setSelectedType(type)
    setSelectedMode(mode)
    storage.save(KEY_SELECTED_TYPE, type)
    storage.save(KEY_SELECTED_MODE, mode)

    return {
      load: (): SavedClassicRound | null => storage.load<SavedClassicRound>(storageKey),
      save: (data: SavedClassicRound): void => storage.save(storageKey, data),
      remove: (): void => storage.remove(storageKey),
    }
  }

  const BASE_CURRENT_STREAK = 'currentStreak'
  const BASE_BEST_STREAK = 'bestStreak'

  const storageOfGameStreaks = ({ type, mode }: { type: QuestionType; mode: ClassicMode }) => {
    const keyCurrent = `${BASE_CURRENT_STREAK}:${type}:${mode}`
    const keyBest = `${BASE_BEST_STREAK}:${type}:${mode}`

    return {
      current: {
        get: () => storage.load<number>(keyCurrent) ?? 0,
        set: (value: number) => storage.save(keyCurrent, value),
      },
      best: {
        get: () => storage.load<number>(keyBest) ?? 0,
        set: (value: number) => storage.save(keyBest, value),
      },
    }
  }

  return { roundGame, selectedType, selectedMode, storageOfGameStreaks }
}
