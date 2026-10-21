import { useCallback, useRef, useState } from 'react'
import { useCountriesQuery } from './useCountriesQuery'
import { useCountriesPool } from './useCountriesPool'
import useStreak from './useStreak'
import { checkAnswer, getAnswerValue, getInitialGameSetting } from '../utils/game.utils'
import type { Country } from '../types/country'

export const useGameEngine = () => {
  const { category, mode } = getInitialGameSetting()

  const { data: countries } = useCountriesQuery()
  const { remainingCountries } = useCountriesPool(countries)
  const { streakManager, getStreaks } = useStreak({ category, mode })

  const [winner, setWinner] = useState<string | null>(null)
  const [displayFlag, setDisplayFlag] = useState<string | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const isAnswerLocked = useRef(false)

  // For Styles
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [colorCard, setColorCard] = useState<string>('')

  const createRound = useCallback(() => {
    const countriesPool = remainingCountries.get()
    const randomIndex = Math.floor(Math.random() * countriesPool.length)
    const randomItem = countriesPool[randomIndex]
    if (!randomItem) return
    const value = getAnswerValue(randomItem, category)
    const newPool = countriesPool.filter((item: Country) => getAnswerValue(item, category) !== value)
    remainingCountries.set(newPool)
    setWinner(value)
    setDisplayFlag(randomItem.flag)

    const optionsSet = new Set<string>([value])

    while (optionsSet.size < 4) {
      const randomIndex = Math.floor(Math.random() * countries.length)
      const item = countries[randomIndex]
      if (!item) continue
      const optionValue = getAnswerValue(item, category)
      if (optionValue && !optionsSet.has(optionValue)) optionsSet.add(optionValue)
      if (optionsSet.size === countries.length) break
    }
    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5)
    setOptions(options)
    setColorCard('border-transparent')
  }, [remainingCountries, category, countries])

  // Actions

  const gameNextRound = () => {
    createRound()
    streakManager.increase()
  }

  const gameRestart = () => {
    remainingCountries.reset()
    streakManager.reset()
    createRound()
  }

  const gameActions = {
    nextRound: gameNextRound,
    restart: gameRestart,
  }

  // ----- Try Again ----- //

  // ----- Multiple Choice ----- //

  const resetStyles = () => {
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const handleOptionSelect = (option: string) => {
    if (isAnswerLocked.current) return
    isAnswerLocked.current = true

    const isCorrect = checkAnswer(option, winner ?? '')
    setSelectedAnswer(option)
    setColorCard(() => {
      if (isCorrect) return 'border-green-500'
      else return 'border-red-500'
    })

    setShowResult(true)

    setTimeout(() => {
      if (isCorrect) {
        gameActions.nextRound()
        resetStyles()
      } else {
        gameActions.restart()
        resetStyles()
      }
      isAnswerLocked.current = false
    }, 800)
  }

  const getButtonStyle = (option: string) => {
    if (!showResult) return 'bg-gray-700 hover:bg-gray-600'
    if (checkAnswer(option, winner ?? '')) return 'bg-green-600 border-green-400 scale-102'
    if (option === selectedAnswer) return 'bg-red-600 border-red-400'
    return 'bg-gray-700 opacity-40'
  }

  const multipleChoice = {
    options,
    handlerOptions: handleOptionSelect,
    styleButtons: getButtonStyle,
  }

  // ----- Return ----- //

  return { displayFlag, createRound, multipleChoice, getStreaks, colorCard }
}
