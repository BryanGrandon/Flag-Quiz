import { useNavigate } from 'react-router-dom'
import type { ClassicMode } from '../../game/classic/constants/modes'
import type { QuestionType } from '../../game/classic/constants/question-type'

type StartClassicGameParams = {
  type: QuestionType
  mode: ClassicMode
}

export const useStartClassicGame = () => {
  const navigate = useNavigate()

  const startClassicGame = ({ type, mode }: StartClassicGameParams) => {
    navigate(`/game/classic?type=${type}&mode=${mode}`)
  }

  return { startClassicGame }
}
