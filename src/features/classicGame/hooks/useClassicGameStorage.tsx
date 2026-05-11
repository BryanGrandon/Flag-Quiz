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

      const streak = {
        current: data.streak?.current ?? current?.streak?.current ?? 0,
        best: Math.max(data.streak?.best ?? 0, current?.streak?.best ?? 0, data.streak?.current ?? 0),
      }

      const updated: GameStorage = {
        config: {
          category,
          mode,
        },
        streak,
        ...current,
        ...data,
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
