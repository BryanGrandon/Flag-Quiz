import type { Country } from '../../pages/game/classic/types/country'
import { COUNTRIES_API_URL } from '../../utilities/constants/config/api'
import { fetchData } from './fetchData'

const fetchCountries = async (): Promise<Country[]> => {
  try {
    return await fetchData<Country[]>(COUNTRIES_API_URL)
  } catch (error) {
    console.error(error)
    return []
  }
}

export default fetchCountries
