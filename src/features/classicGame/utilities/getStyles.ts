import { GAMES } from '../../../config/games/categories'
import { type GameCategory } from '../../../shared/constants/game-category'

export const getStyle = (category: GameCategory) => {
  for (let i = 0; i < GAMES.length; i++) {
    const categoryCard = GAMES[i].category
    const color = GAMES[i].color.default
    if (category == categoryCard) return color
  }
  return ''
}
