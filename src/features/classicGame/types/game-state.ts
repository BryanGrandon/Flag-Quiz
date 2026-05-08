import type { GameCategory } from '../../../shared/constants/game-category'
import type { GameModes } from '../../../shared/constants/game-modes'

export type GameImage = {
  svg: string
  alt: string
  png: string
}

export type GameStreak = {
  current: number
  best: number
}

export type GameConfig = {
  category: GameCategory
  mode: GameModes
}

export type GameState = {
  winner?: string
  image?: GameImage
  options?: string[]
  streak?: GameStreak
  config?: GameConfig
}
