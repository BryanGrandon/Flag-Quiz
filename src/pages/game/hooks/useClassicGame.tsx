import { useCallback, useEffect, useRef, useState } from 'react'
import { generateAnswerOptions } from '../logic/classic/generateAnswerOptions'
import fetchCountries from '../../../services/api/fetchCountries'
import { pickWinner } from '../logic/classic/pickWinner'
import { CLASSIC_MODES } from '../constants/classic'

import type { ClassicModes, ClassicType, GameRound } from '../types/classic'
import type { Country } from '../types/country'

const useClassicGame = () => {
  const allCountriesRef = useRef<Country[]>([])
  const remainingCountriesRef = useRef<Country[]>([])
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

  // ===== Start Classic Game Logic ===== //

  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [gameRound, setGameRound] = useState<GameRound>({
    image: { svg: '', alt: '', png: '' },
    options: [],
  })

  const startClassicGame = useCallback(
    (type: ClassicType, mode: ClassicModes) => {
      if (!isReady) return
      const baseCountries = remainingCountriesRef.current.length > 0 ? remainingCountriesRef.current : allCountriesRef.current
      const { winner, image, filterCountries } = pickWinner({ type, remainingCountries: baseCountries })

      setCorrectAnswer(winner)

      if (mode === CLASSIC_MODES.MULTIPLE_CHOICE) {
        const newOptions = generateAnswerOptions({ winner, type, allCountries: allCountriesRef.current })
        setGameRound({ image: image, options: newOptions })
      } else setGameRound({ image: image, options: [] })

      remainingCountriesRef.current = filterCountries
    },
    [isReady],
  )

  // ===== Reset ===== //

  const resetGame = useCallback(() => {
    remainingCountriesRef.current = allCountriesRef.current
    setGameRound({ image: { svg: '', alt: '', png: '' }, options: [] })
    setCorrectAnswer('')
  }, [])

  // ===== Checking ===== //

  const userAnswer = ''
  console.log(correctAnswer == userAnswer)

  // ===== Return ===== //

  return {
    startClassicGame,
    resetGame,
    isReady,
    gameRound,
  }
}

export default useClassicGame
