import { useNavigate } from 'react-router-dom'
import type { ClassicModes, ClassicType } from '../../game/types/classic'

type StartClassicGameParams = {
  type: ClassicType
  mode: ClassicModes
}

export const useStartClassicGame = () => {
  const navigate = useNavigate()

  const startClassicGame = ({ type, mode }: StartClassicGameParams) => {
    navigate(`/classic-game?type=${type}&mode=${mode}`)
  }

  return { startClassicGame }
}
