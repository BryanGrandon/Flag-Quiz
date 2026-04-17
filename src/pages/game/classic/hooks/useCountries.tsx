import { useEffect, useState } from 'react'
import type { Country } from '../types/country'
import { fetchData } from '../../../../services/api/fetchData'
import { COUNTRIES_API_URL } from '../../../../constants/api'

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const load = async () => {
      const data = await fetchData<Country[]>(COUNTRIES_API_URL)
      setCountries(data)
      setIsReady(true)
    }
    load()
  }, [])

  return { countries, isReady }
}
