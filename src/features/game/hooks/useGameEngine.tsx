import { useCallback, useState } from 'react'
import { useCountriesQuery } from './useCountriesQuery'
import { useCountriesPool } from './useCountriesPool'
import useStreak from './useStreak'
import { dynamicStorageKey } from '../../../shared/utilities/dynamicStorageKey'
import { storage } from '../../../shared/utilities/storage'
import { checkAnswer, getAnswerValue } from '../utils/game.utils'
import type { GameCategories } from '../../../config/games/categories'

export const useGameEngine = () => {
  const { data: countries } = useCountriesQuery()
  const { remainingCountries } = useCountriesPool(countries)
  const { streakActions, getStreakInfo } = useStreak()

  const categories = storage.load(dynamicStorageKey({ base: 'init_category', dynamic: '' })) as GameCategories

  const [winner, setWinner] = useState<string | null>(null)
  const [displayFlag, setDisplayFlag] = useState<string | null>(null)

  const createRound = useCallback(() => {
    const countriesPool = remainingCountries.get()
    const randomIndex = Math.floor(Math.random() * countriesPool.length)
    const randomItem = countriesPool[randomIndex]
    if (!randomItem) return
    const value = getAnswerValue(randomItem, categories)
    setWinner(value)
    setDisplayFlag(randomItem.flag)
  }, [remainingCountries, categories])

  // Actions

  const gameNextRound = () => {
    createRound()
    streakActions.increase()
  }

  const gameRestart = () => {
    remainingCountries.reset()
    streakActions.reset()
    createRound()
  }

  const gameActions = {
    nextRound: gameNextRound,
    restart: gameRestart,
  }

  // ----- Multiple Choice ----- //
  const NUMBER_OPTIONS = 4

  const createOptions = () => {
    if (winner === null || !countries?.length) return []

    const optionsSet = new Set<string>([winner])

    while (optionsSet.size < NUMBER_OPTIONS) {
      const randomIndex = Math.floor(Math.random() * countries.length)
      const item = countries[randomIndex]
      if (!item) continue
      const value = getAnswerValue(item, categories)
      if (value && !optionsSet.has(value)) optionsSet.add(value)
      if (optionsSet.size === countries.length) break
    }
    return Array.from(optionsSet).sort(() => Math.random() - 0.5)
  }

  const handleOptionSelect = (option: string) => {
    const isCorrect = checkAnswer(option, winner ?? '')

    setTimeout(() => {
      if (isCorrect) {
        gameActions.nextRound()
        console.log('Winner')
      } else {
        console.log('Loser')
        gameActions.restart()
      }
    }, 800)
  }

  const multipleChoice = {
    options: createOptions,
    handlerOptions: handleOptionSelect,
  }

  // ----- Return ----- //

  return { displayFlag, createRound, gameActions, winner, countries, multipleChoice, getStreakInfo }
}
