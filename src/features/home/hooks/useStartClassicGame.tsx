import { useNavigate } from 'react-router-dom'
import type { GameCategory } from '../../../shared/constants/game-category'
import type { GameModes } from '../../../shared/constants/game-modes'

type StartClassicGameParams = {
  category: GameCategory
  mode: GameModes
}

export const useStartClassicGame = () => {
  const navigate = useNavigate()

  const startClassicGame = ({ category, mode }: StartClassicGameParams) => {
    const params = new URLSearchParams({
      category,
      mode,
    })

    navigate({
      pathname: '/game/classic',
      search: params.toString(),
    })
  }

  return { startClassicGame }
}
