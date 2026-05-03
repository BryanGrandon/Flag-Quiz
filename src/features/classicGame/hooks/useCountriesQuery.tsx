import { useCallback, useEffect, useState } from 'react'
import { fetchData } from '../../../shared/services/api/fetchData'
import { COUNTRIES_URL } from '../constants/api'
import type { Country } from '../types/country'

export const useCountriesQuery = () => {
  const [data, setData] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      setError(null)

      const response = await fetchData<Country[]>(COUNTRIES_URL)
      setData(response)
    } catch (err) {
      setIsError(true)
      setError(err instanceof Error ? err.message : 'Unknown error')
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
    isError,
    error,
    refetch: load,
  }
}
