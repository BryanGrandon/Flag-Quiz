import { useEffect, useRef, useState } from 'react'
import type { Country } from '../types/country'
import { fetchData } from '../../../../services/api/fetchData'
import { COUNTRIES_API_URL } from '../../../../constants/api'

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const remainingCountriesRef = useRef<Country[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const load = async () => {
      const data = await fetchData<Country[]>(COUNTRIES_API_URL)
      setCountries(data)
      setIsReady(true)
      remainingCountriesRef.current = data
    }
    load()
  }, [])

  const remainingCountries = {
    get: () => remainingCountriesRef.current,
    set: (countries: Country[]) => (remainingCountriesRef.current = countries),
    reset: () => (remainingCountriesRef.current = countries),
  }

  return { countries, isReady, remainingCountries }
}
