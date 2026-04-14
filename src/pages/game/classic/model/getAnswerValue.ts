import { QUESTION_TYPES, type QuestionType } from '../constants/question-type'
import type { Country } from '../types/country'

export const getAnswerValue = (item: Country, type: QuestionType) => {
  if (!item) return ''

  switch (type) {
    case QUESTION_TYPES.COUNTRY:
      return item.name.common ?? ''

    case QUESTION_TYPES.CAPITAL:
      return item.capital?.[0] ?? ''

    default:
      throw new Error(`Invalid ClassicType: ${type}`)
  }
}
