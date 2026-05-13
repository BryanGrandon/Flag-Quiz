import type { GameCategory } from '../../../shared/constants/game-category'
import type { GameModes } from '../../../shared/constants/game-modes'
import { dynamicStorageKey } from '../../../shared/utilities/dynamicStorageKey'
import { storage } from '../../../shared/utilities/storage'

type GameStorage = {
  winner?: string
  image?: {
    svg: string
    alt: string
    png: string
  }
  options?: string[]
  streak?: {
    current: number
    best: number
  }
  config?: {
    category: GameCategory
    mode: GameModes
  }
}

export const useClassicGameStorage = () => {
  const BASE_KEY = 'classicGame'

  const getGameStorage = ({ category, mode }: { category: GameCategory; mode: GameModes }) => {
    const storageKey = dynamicStorageKey({ base: BASE_KEY, dynamic: [category, mode] })

    const load = (): GameStorage | null => {
      return storage.load<GameStorage>(storageKey) ?? null
    }

    const save = (data: Partial<GameStorage>) => {
      const current = load()

      const currentStreak = current?.streak

      const streakCurrent = data.streak?.current ?? currentStreak?.current ?? 0
      const streakBest = Math.max(data.streak?.best ?? 0, currentStreak?.best ?? 0, streakCurrent)

      const updated: GameStorage = {
        ...current,
        ...data,
        config: {
          category,
          mode,
        },
        streak: {
          current: streakCurrent,
          best: streakBest,
        },
      }

      storage.save(storageKey, updated)
    }

    const remove = (fields: string[]) => {
      const current = load()
      if (!current) return

      const updated: Record<string, unknown> = { ...current }

      fields.forEach((field) => {
        const keys = field.split('.')
        let obj: Record<string, unknown> = updated

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i]
          if (typeof obj[key] !== 'object' || obj[key] === null) return
          obj = obj[key] as Record<string, unknown>
        }
        delete obj[keys[keys.length - 1]]
      })

      storage.save(storageKey, updated as GameStorage)
    }

    const clear = () => {
      storage.remove(storageKey)
    }

    return {
      load,
      save,
      remove,
      clear,
    }
  }

  return { getGameStorage }
}
