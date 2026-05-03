import { useEffect, useRef } from 'react'
import type { Country } from '../types/country'

export const useCountriesPool = (country: Country[]) => {
  const poolRef = useRef<Country[]>([])

  useEffect(() => {
    if (poolRef.current.length === 0) poolRef.current = [...country]
  }, [country])

  const remainingCountries = {
    get: () => poolRef.current,
    set: (countries: Country[]) => (poolRef.current = countries),
    reset: () => (poolRef.current = [...country]),
  }

  return { remainingCountries }
}
