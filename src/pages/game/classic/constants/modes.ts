export const CLASSIC_MODE = {
  MULTIPLE_CHOICE: 'multiple_choice',
  WRITING: 'writing',
} as const

export type ClassicMode = (typeof CLASSIC_MODE)[keyof typeof CLASSIC_MODE]
