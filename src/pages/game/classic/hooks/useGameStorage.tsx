import { useMemo, useState } from 'react'
import { storage } from '../../../../utilities/storage'
import { CLASSIC_GAME_CONFIG } from '../constants/config'
import { QUESTION_TYPES, type QuestionType } from '../constants/question-type'
import { CLASSIC_MODE, type ClassicMode } from '../constants/modes'
import type { SavedClassicRound } from '../types/storage'

type Props = {
  base: 'ROUND' | 'SCORE'
}

export const useClassicStorage = ({ base }: Props) => {
  const [selectedType, setSelectedType] = useState<QuestionType>(QUESTION_TYPES.CAPITAL)
  const [selectedMode, setSelectedMode] = useState<ClassicMode>(CLASSIC_MODE.MULTIPLE_CHOICE)
  const baseKey = base == 'ROUND' ? CLASSIC_GAME_CONFIG.STORAGE_KEYS.SAVED_CLASSIC_ROUND : CLASSIC_GAME_CONFIG.STORAGE_KEYS.BEST_SCORE

  const storageKey = `${baseKey}:${selectedType}:${selectedMode}`

  const roundGame = useMemo(() => {
    return {
      load: (): SavedClassicRound | null => storage.load<SavedClassicRound>(storageKey),
      save: (data: SavedClassicRound): void => storage.save(storageKey, data),
      remove: (): void => storage.remove(storageKey),
    }
  }, [storageKey])

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

  return { roundGame, gameConfig, selectedType, selectedMode }
}
