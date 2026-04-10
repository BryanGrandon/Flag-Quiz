import type { ClassicType } from '../../types/classic'
import type { Country } from '../../types/country'
import { getAnswerValue } from './getAnswerValue'

type PickWinner = {
  type: ClassicType
  remainingCountries: Country[]
}

export const pickWinner = ({ type, remainingCountries }: PickWinner) => {
  const randomItem = remainingCountries[Math.floor(Math.random() * remainingCountries.length)]
  const winner = getAnswerValue(randomItem, type)
  const image = {
    png: randomItem?.flags?.png,
    svg: randomItem?.flags?.svg,
    alt: randomItem?.flags?.alt,
  }
  const filterCountries = remainingCountries.filter((item: Country) => getAnswerValue(item, type) !== winner)

  return { winner, filterCountries, image }
}
