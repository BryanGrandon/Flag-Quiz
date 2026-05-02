export const GAME_CATEGORIES = {
  COUNTRY: 'country',
  CAPITAL: 'capital',
} as const

export type GameCategory = (typeof GAME_CATEGORIES)[keyof typeof GAME_CATEGORIES]
