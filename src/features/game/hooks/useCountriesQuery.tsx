import { useCallback, useEffect, useState } from 'react'
import { fetchData } from '../../../shared/services/api/fetchData'
import { COUNTRIES_URL, type CountryApi } from '../../../services/api/countries'
import type { Country } from '../types/country'

export const useCountriesQuery = () => {
  const [data, setData] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const load = useCallback(async () => {
    let countriesApi: Country[] = []
    try {
      setIsLoading(true)
      const response = await fetchData<CountryApi[]>(COUNTRIES_URL)
      countriesApi = response?.map((el) => ({ name: el.name, capital: el.capital, flag: el.flags.svg }))
      setData(countriesApi)
    } catch {
      console.error('Country Query Error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return {
    data,
    isLoading,
    refetch: load,
  }
}
