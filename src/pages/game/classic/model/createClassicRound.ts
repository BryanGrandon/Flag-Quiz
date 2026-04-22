import { CLASSIC_GAME_CONFIG } from '../constants/config'
import { CLASSIC_MODE, type ClassicMode } from '../constants/modes'
import type { QuestionType } from '../constants/question-type'
import type { Country } from '../types/country'
import { getAnswerValue } from './getAnswerValue'

type CreateClassicRound = {
  type: QuestionType
  mode: ClassicMode
  countries: Country[]
  remainingCountries: Country[]
}

export const createClassicRound = ({ type, mode, countries, remainingCountries }: CreateClassicRound) => {
  const randomItem = remainingCountries[Math.floor(Math.random() * remainingCountries.length)]
  const winner = getAnswerValue(randomItem, type)
  const image = {
    png: randomItem?.flags?.png,
    svg: randomItem?.flags?.svg,
    alt: randomItem?.flags?.alt,
  }
  const newRemainingCountries = remainingCountries.filter((item: Country) => getAnswerValue(item, type) !== winner)

  const optionsSet = new Set<string>([winner])
  while (optionsSet.size < CLASSIC_GAME_CONFIG.ANSWER_OPTIONS_COUNT) {
    const randomItem = countries[Math.floor(Math.random() * countries.length)]
    const value = getAnswerValue(randomItem, type)
    if (!optionsSet.has(value) && value !== undefined && value !== '') optionsSet.add(value)
  }
  const options = mode === CLASSIC_MODE.MULTIPLE_CHOICE ? Array.from(optionsSet).sort(() => Math.random() - 0.5) : []

  return { winner, image, options, newRemainingCountries }
}
