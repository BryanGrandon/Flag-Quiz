import { GAME_CATEGORIES, type GameCategories } from '../../../config/games/categories'
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

export { getAnswerValue, checkAnswer }
