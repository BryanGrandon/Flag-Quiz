import { useCallback, useEffect, useRef, useState } from 'react'
import { generateAnswerOptions } from '../logic/classic/generateAnswerOptions'
import fetchCountries from '../../../services/api/fetchCountries'
import { pickWinner } from '../logic/classic/pickWinner'
import { CLASSIC_MODES } from '../constants/classic'

import type { ClassicModes, ClassicType, FlagImage } from '../types/classic'
import type { Country } from '../types/country'

const useClassicGame = () => {
  const allCountriesRef = useRef<Country[]>([])
  const remainingCountriesRef = useRef<Country[]>([])

  const [image, setImage] = useState<FlagImage | undefined>()
  const [options, setOptions] = useState<string[]>([])
  const [correctAnswer, setCorrectAnswer] = useState<string>('')

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const load = async () => {
      const data = await fetchCountries()
      allCountriesRef.current = data
      remainingCountriesRef.current = data
      setIsReady(true)
    }
    load()
  }, [])

  const startClassicGame = useCallback(
    (type: ClassicType, mode: ClassicModes) => {
      if (!isReady) return
      const baseCountries = remainingCountriesRef.current.length > 0 ? remainingCountriesRef.current : allCountriesRef.current
      const { winner, image, filterCountries } = pickWinner({
        type,
        remainingCountries: baseCountries,
      })

      setImage(image)
      setCorrectAnswer(winner)

      if (mode === CLASSIC_MODES.MULTIPLE_CHOICE) {
        const newOptions = generateAnswerOptions({
          winner,
          type,
          allCountries: allCountriesRef.current,
        })

        setOptions(newOptions)
      } else {
        setOptions([])
      }
      remainingCountriesRef.current = filterCountries
    },
    [isReady],
  )

  const resetGame = useCallback(() => {
    remainingCountriesRef.current = allCountriesRef.current
    setImage({ svg: '', alt: '', png: '' })
    setOptions([])
    setCorrectAnswer('')
  }, [])

  return {
    startClassicGame,
    resetGame,
    image,
    options,
    correctAnswer,
    isReady,
  }
}

export default useClassicGame
