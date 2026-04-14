import { getAnswerValue } from './getAnswerValue'
import type { Country } from '../types/country'
import type { QuestionType } from '../constants/question-type'
import { CLASSIC_GAME_CONFIG } from '../constants/config'

type GenerateAnswerOptions = {
  winner: string
  type: QuestionType
  allCountries: Country[]
}

export const generateAnswerOptions = ({ allCountries, winner, type }: GenerateAnswerOptions) => {
  const optionsSet = new Set<string>()
  optionsSet.add(winner)
  while (optionsSet.size < CLASSIC_GAME_CONFIG.ANSWER_OPTIONS_COUNT) {
    const randomItem = allCountries[Math.floor(Math.random() * allCountries.length)]
    const value = getAnswerValue(randomItem, type)
    if (!optionsSet.has(value) && value !== undefined) optionsSet.add(value)
  }
  return Array.from(optionsSet).sort(() => Math.random() - 0.5) // Shuffle options
}
