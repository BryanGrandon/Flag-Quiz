import { useCallback, useEffect, useRef, useState } from 'react'
import { generateAnswerOptions } from '../model/generateAnswerOptions'
import fetchCountries from '../../../../services/api/fetchCountries'
import { pickWinner } from '../model/pickWinner'
import { CLASSIC_MODES } from '../constants/classic'

import type { ClassicModes, ClassicType, GameRound, SavedGame } from '../types/classic'
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

  // ===== Load Saved Game ===== // ---------------------------- Move --------------------------- //

  const KEY_SAVED_CLASSIC_GAME = 'savedClassicGame'

  const loadSavedClassicGame = ({ key, object }: { key: string; object: object }) => {
    const saved = JSON.stringify(object)
    localStorage.setItem(key, saved)
  }

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
      const saved = localStorage.getItem('savedGame')

      if (saved) {
        const { winner, image, options } = JSON.parse(saved)
        setCorrectAnswer(winner)
        setGameRound({ image: image, options })
        return
      }

      const { winner, image, filterCountries } = pickWinner({ type, remainingCountries: baseCountries })
      const options = mode === CLASSIC_MODES.MULTIPLE_CHOICE ? generateAnswerOptions({ winner, type, allCountries: allCountriesRef.current }) : []

      setCorrectAnswer(winner)
      setGameRound({ image, options })

      const savedGame: SavedGame = { winner, image, options }
      loadSavedClassicGame({ key: KEY_SAVED_CLASSIC_GAME, object: savedGame })
      localStorage.setItem('savedGame', JSON.stringify(savedGame))

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
