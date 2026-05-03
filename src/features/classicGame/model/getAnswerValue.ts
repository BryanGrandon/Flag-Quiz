import { GAME_CATEGORIES, type GameCategory } from '../../../shared/constants/game-category'
import type { Country } from '../types/country'

export const getAnswerValue = (item: Country, type: GameCategory) => {
  if (!item) return ''

  switch (type) {
    case GAME_CATEGORIES.COUNTRY:
      return item.name.common ?? ''

    case GAME_CATEGORIES.CAPITAL:
      return item.capital?.[0] ?? ''

    default:
      throw new Error(`Invalid ClassicType: ${type}`)
  }
}
