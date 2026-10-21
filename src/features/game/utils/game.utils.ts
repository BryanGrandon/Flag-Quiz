import { GAME_CATEGORIES, type GameCategories } from '../../../config/games/categories'
import type { GameModes } from '../../../config/games/modes'
import { dynamicStorageKey } from '../../../shared/utilities/dynamicStorageKey'
import { storage } from '../../../shared/utilities/storage'
import type { Country } from '../types/country'

const getAnswerValue = (item: Country, categories: GameCategories) => {
  if (!item) return ''
  switch (categories) {
    case GAME_CATEGORIES.CAPITAL:
      return item?.capital ?? ''

    case GAME_CATEGORIES.COUNTRY:
      return item?.name ?? ''

    default:
      return ''
  }
}

const checkAnswer = (value: string, winner: string) => {
  return value.trim().toLowerCase() === winner?.trim().toLowerCase()
}

const getInitialGameSetting = () => {
  const initCategoryKey = dynamicStorageKey({ base: 'init_category', dynamic: '' })
  const initModeKey = dynamicStorageKey({ base: 'init_mode', dynamic: '' })

  const category: GameCategories = storage.load(initCategoryKey) ?? 'country'
  const mode: GameModes = storage.load(initModeKey) ?? 'multiple_choice'

  return { category, mode }
}

export { getAnswerValue, checkAnswer, getInitialGameSetting }
