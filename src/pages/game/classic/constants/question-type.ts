export const QUESTION_TYPES = {
  COUNTRY: 'country',
  CAPITAL: 'capital',
} as const

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES]
