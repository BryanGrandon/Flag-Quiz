import { useCallback, useState } from 'react'
import { useCountriesPool } from './useCountriesPool'
import { useCountriesQuery } from './useCountriesQuery'

import { createClassicRound } from '../model/createClassicRound'
import { type GameModes } from '../../../shared/constants/game-modes'
import { type GameCategory } from '../../../shared/constants/game-category'
import { useClassicGameStorage } from './useClassicGameStorage'
import type { GameState } from '../types/game-state'

export const useClassicRoundManager = () => {
  const { data: countries, isLoading } = useCountriesQuery()
  const { remainingCountries } = useCountriesPool(countries)
  const gameStorage = useClassicGameStorage()

  type ConfigClassicGameProps = {
    category: GameCategory
    mode: GameModes
  }

  const defaultValue = {
    category: '',
    mode: '',
  }

  const [configClassicGame, setConfigClassicGame] = useState<ConfigClassicGameProps>(defaultValue as ConfigClassicGameProps)
  const [classicGame, setClassicGame] = useState<GameState>(configClassicGame ? (gameStorage.getGameStorage(configClassicGame).load() ?? {}) : {})
  const storageWinner = configClassicGame ? gameStorage.getGameStorage(configClassicGame).load()?.winner : ''

  const startClassicGame = useCallback(
    ({ category, mode }: { category: GameCategory; mode: GameModes }) => {
      if (isLoading) return
      if (storageWinner) return

      setConfigClassicGame({ category, mode })
      const storage = gameStorage.getGameStorage({ category, mode })
      const saved = storage.load()

      if (saved?.winner && saved?.image && saved?.options) {
        setClassicGame((prev) => ({
          ...prev,
          streak: saved.streak,
          winner: saved.winner,
          image: saved.image,
          options: saved.options,
        }))
        return
      }

      const baseCountries = remainingCountries.get().length > 0 ? remainingCountries.get() : countries

      const round = createClassicRound({
        category,
        mode,
        countries,
        remainingCountries: baseCountries,
      })

      remainingCountries.set(round.newRemainingCountries)

      storage.save({
        streak: saved?.streak,
        winner: round.winner,
        image: round.image,
        options: round.options,
      })

      setClassicGame((prev) => ({
        ...prev,
        streak: saved?.streak,
        winner: round.winner,
        image: round.image,
        options: round.options,
      }))
    },
    [remainingCountries, countries, isLoading, gameStorage, storageWinner],
  )

  return { startClassicGame, classicGame, configClassicGame }
}
