import { useState } from 'react'
import { GAME_MODES, KEY_GAMES } from '../constants/game/games'
import type { game_key } from '../interfaces/games'

export const useGames = () => {
  const [selectedGameOptions, setSelectedGameOptions] = useState<Record<game_key, string>>({
    guessCountry: GAME_MODES.MULTIPLE_CHOICE,
    guessCapital: GAME_MODES.MULTIPLE_CHOICE,
    guessPopulation: GAME_MODES.MULTIPLE_CHOICE,
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
