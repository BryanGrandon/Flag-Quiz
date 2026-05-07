import { useCallback, useState } from 'react'
import { useCountriesPool } from './useCountriesPool'
import { useCountriesQuery } from './useCountriesQuery'

import { createClassicRound } from '../model/createClassicRound'
import { GAME_MODES, type GameModes } from '../../../shared/constants/game-modes'
import { GAME_CATEGORIES, type GameCategory } from '../../../shared/constants/game-category'
import { useClassicGameStorage } from './useClassicGameStorage'
import type { ClassicGameProps } from '../types/ClassicGameProps'

export const useClassicRoundManager = () => {
  const { data: countries, isLoading } = useCountriesQuery()
  const { remainingCountries } = useCountriesPool(countries)
  const gameStorage = useClassicGameStorage()

  const [configClassicGame, setConfigClassicGame] = useState({
    category: GAME_CATEGORIES.COUNTRY as GameCategory,
    mode: GAME_MODES.MULTIPLE_CHOICE as GameModes,
  })
  const [classicGame, setClassicGame] = useState<ClassicGameProps>(gameStorage.getGameStorage(configClassicGame).load() ?? {})
  const storageWinner = gameStorage.getGameStorage(configClassicGame).load()?.winner

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
        winner: round.winner,
        image: round.image,
        options: round.options,
      })

      setClassicGame((prev) => ({
        ...prev,
        winner: round.winner,
        image: round.image,
        options: round.options,
      }))
    },
    [remainingCountries, countries, isLoading, gameStorage, storageWinner],
  )

  return { startClassicGame, classicGame, configClassicGame }
}
