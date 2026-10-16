import { useEffect, useRef } from 'react'
// import type { Country } from '../types/country'

type Countries = {
  name: string
  capital: string
  flags: {
    png: string
    svg: string
  }
}

export const useCountriesPool = (country: Countries[]) => {
  const poolRef = useRef<Countries[]>([])

  useEffect(() => {
    if (poolRef.current.length === 0) poolRef.current = [...country]
  }, [country])

  const remainingCountries = {
    get: () => poolRef.current,
    set: (countries: Countries[]) => (poolRef.current = countries),
    reset: () => (poolRef.current = [...country]),
  }

  return { remainingCountries }
}
