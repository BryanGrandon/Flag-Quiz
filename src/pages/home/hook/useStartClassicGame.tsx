import { useNavigate } from 'react-router-dom'
import type { ClassicModes, ClassicType } from '../../game/classic/types/classic'

type StartClassicGameParams = {
  type: ClassicType
  mode: ClassicModes
}

export const useStartClassicGame = () => {
  const navigate = useNavigate()

  const startClassicGame = ({ type, mode }: StartClassicGameParams) => {
    navigate(`/game/classic?type=${type}&mode=${mode}`)
  }

  return { startClassicGame }
}
