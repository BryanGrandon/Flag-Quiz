import { CLASSIC_TYPES } from '../constants/classic'
import type { ClassicType } from '../types/classic'
import type { Country } from '../types/country'

export const getAnswerValue = (item: Country, type: ClassicType) => {
  if (!item) return ''

  switch (type) {
    case CLASSIC_TYPES.COUNTRY:
      return item.name.common ?? ''

    case CLASSIC_TYPES.CAPITAL:
      return item.capital?.[0] ?? ''

    default:
      throw new Error(`Invalid ClassicType: ${type}`)
  }
}
