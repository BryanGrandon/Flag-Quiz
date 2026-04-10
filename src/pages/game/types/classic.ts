import type { CLASSIC_MODES, CLASSIC_TYPES } from '../constants/classic'

export type ClassicType = (typeof CLASSIC_TYPES)[keyof typeof CLASSIC_TYPES]
export type ClassicModes = (typeof CLASSIC_MODES)[keyof typeof CLASSIC_MODES]

export interface FlagImage {
  png: string
  svg: string
  alt: string
}

export interface GameRound {
  image: FlagImage
  options: string[]
}
