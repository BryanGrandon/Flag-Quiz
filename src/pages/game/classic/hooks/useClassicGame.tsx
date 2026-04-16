import { useCallback, useEffect, useRef, useState } from 'react'
import fetchCountries from '../../../../services/api/fetchCountries'
import { generateAnswerOptions } from '../model/generateAnswerOptions'
import { pickWinner } from '../model/pickWinner'
import { CLASSIC_MODE, type ClassicMode } from '../constants/modes'
import type { QuestionType } from '../constants/question-type'
import type { ClassicSavedGame } from '../types/storage'
import type { GameRound } from '../types/round'
import type { Country } from '../types/country'
import { storage } from '../../../../utilities/storage'
import { CLASSIC_GAME_CONFIG } from '../constants/config'

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

  const [correctAnswer, setCorrectAnswer] = useState<string>('')
  const [gameRound, setGameRound] = useState<GameRound>({
    image: { svg: '', alt: '', png: '' },
    options: [],
  })

  const startClassicGame = useCallback(
    (type: QuestionType, mode: ClassicMode) => {
      if (!isReady) return
      const baseCountries = remainingCountriesRef.current.length > 0 ? remainingCountriesRef.current : allCountriesRef.current
      const saved = storage.load<ClassicSavedGame>(CLASSIC_GAME_CONFIG.STORAGE_KEYS.SAVED_GAME)

      if (saved) {
        const { winner, image, options } = saved
        setCorrectAnswer(winner)
        setGameRound({ image: image, options })
        return
      }

      const { winner, image, filterCountries } = pickWinner({ type, remainingCountries: baseCountries })
      const options = mode === CLASSIC_MODE.MULTIPLE_CHOICE ? generateAnswerOptions({ winner, type, allCountries: allCountriesRef.current }) : []

      setCorrectAnswer(winner)
      setGameRound({ image, options })

      const savedGame: ClassicSavedGame = { winner, image, options }
      storage.save(CLASSIC_GAME_CONFIG.STORAGE_KEYS.SAVED_GAME, savedGame)

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
