export const GAME_MODES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  WRITING: 'writing',
} as const

export type GameModes = (typeof GAME_MODES)[keyof typeof GAME_MODES]
