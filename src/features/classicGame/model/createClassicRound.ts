import type { GameCategory } from '../../../shared/constants/game-category'
import { GAME_MODES, type GameModes } from '../../../shared/constants/game-modes'
import type { Country } from '../types/country'
import { getAnswerValue } from './getAnswerValue'

type CreateClassicRound = {
  category: GameCategory
  mode: GameModes
  countries: Country[]
  remainingCountries: Country[]
}

export const createClassicRound = ({ category, mode, countries, remainingCountries }: CreateClassicRound) => {
  const randomItem = remainingCountries[Math.floor(Math.random() * remainingCountries.length)]
  const winner = getAnswerValue(randomItem, category)
  const image = {
    png: randomItem?.flags?.png,
    svg: randomItem?.flags?.svg,
    alt: randomItem?.flags?.alt,
  }
  const newRemainingCountries = remainingCountries.filter((item: Country) => getAnswerValue(item, category) !== winner)

  const optionsSet = new Set<string>([winner])
  while (optionsSet.size < 4) {
    const randomItem = countries[Math.floor(Math.random() * countries.length)]
    const value = getAnswerValue(randomItem, category)
    if (!optionsSet.has(value) && value !== undefined && value !== '') optionsSet.add(value)
  }
  const options = mode === GAME_MODES.MULTIPLE_CHOICE ? Array.from(optionsSet).sort(() => Math.random() - 0.5) : []

  return { winner, image, options, newRemainingCountries }
}
