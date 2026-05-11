import { type GameCategory } from '../../../shared/constants/game-category'
import { GAME_CONFIG } from '../../../shared/data/classicGameData'

export const getStyle = (category: GameCategory) => {
  for (let i = 0; i < GAME_CONFIG.length; i++) {
    const categoryCard = GAME_CONFIG[i].category
    const color = GAME_CONFIG[i].color.button
    if (category == categoryCard) return color
  }
  return ''
}
