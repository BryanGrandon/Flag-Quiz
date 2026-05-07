import type { GameCategory } from '../../../shared/constants/game-category'
import type { GameModes } from '../../../shared/constants/game-modes'

export type ClassicGameProps = {
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
