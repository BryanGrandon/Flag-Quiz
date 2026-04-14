import { CLASSIC_CONFIG } from '../constants/classic'
import { getAnswerValue } from './getAnswerValue'
import type { ClassicType } from '../types/classic'
import type { Country } from '../types/country'

type GenerateAnswerOptions = {
  winner: string
  type: ClassicType
  allCountries: Country[]
}

export const generateAnswerOptions = ({ allCountries, winner, type }: GenerateAnswerOptions) => {
  const optionsSet = new Set<string>()
  optionsSet.add(winner)
  while (optionsSet.size < CLASSIC_CONFIG.ANSWER_OPTIONS_COUNT) {
    const randomItem = allCountries[Math.floor(Math.random() * allCountries.length)]
    const value = getAnswerValue(randomItem, type)
    if (!optionsSet.has(value) && value !== undefined) optionsSet.add(value)
  }
  return Array.from(optionsSet).sort(() => Math.random() - 0.5) // Shuffle options
}
