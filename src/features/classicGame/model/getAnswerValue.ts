import { GAME_CATEGORIES, type GameCategory } from '../../../shared/constants/game-category'
// import type { Country } from '../types/country'

type Countries = {
  name: string
  capital: string
  flags: {
    png: string
    svg: string
  }
}

export const getAnswerValue = (item: Countries, type: GameCategory) => {
  if (!item) return ''

  switch (type) {
    case GAME_CATEGORIES.COUNTRY:
      return item.name ?? ''

    case GAME_CATEGORIES.CAPITAL:
      return item.capital ?? ''

    default:
      throw new Error(`Invalid ClassicType: ${type}`)
  }
}
