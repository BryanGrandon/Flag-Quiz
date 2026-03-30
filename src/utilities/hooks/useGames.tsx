import { useState } from 'react'
import { KEY_GAMES } from '../constants/game/games'
import type { game_key } from '../interfaces/games'
import { GAME_MODES } from '../constants/game/gameModes'

export const useGames = () => {
  const [selectedGameOptions, setSelectedGameOptions] = useState<Record<game_key, string>>({
    guessCountry: GAME_MODES.MULTIPLE,
    guessCapital: GAME_MODES.MULTIPLE,
    guessPopulation: GAME_MODES.MULTIPLE,
  })

  type update_game_option = {
    key: string
    value: string
  }

  const updateGameOption = ({ key, value }: update_game_option) => {
    switch (key) {
      case KEY_GAMES.COUNTRY:
        setSelectedGameOptions((prev) => ({ ...prev, guessCountry: value }))
        break
      case KEY_GAMES.CAPITAL:
        setSelectedGameOptions((prev) => ({ ...prev, guessCapital: value }))
        break
    }
  }

  return { updateGameOption, selectedGameOptions }
}
