import { useState } from 'react'
import { KEY_GAMES } from '../constants/game/games'

export const useGames = () => {
  const [selectedGameOptions, setSelectedGameOptions] = useState({
    guessCountry: 'multiple',
    guessCapital: 'multiple',
  })

  type update_game_option = {
    key: string
    value: string
  }

  const updateGameOption = ({ key, value }: update_game_option) => {
    if (key == KEY_GAMES.COUNTRY) {
      setSelectedGameOptions((prev) => ({ ...prev, guessCountry: value }))
    } else if (key == KEY_GAMES.CAPITAL) {
      setSelectedGameOptions((prev) => ({ ...prev, guessCapital: value }))
    }
  }

  return { updateGameOption, selectedGameOptions }
}
