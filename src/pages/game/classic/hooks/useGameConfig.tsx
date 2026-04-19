import { useState } from 'react'

import { QUESTION_TYPES, type QuestionType } from '../constants/question-type'
import { CLASSIC_MODE, type ClassicMode } from '../constants/modes'

const useGameConfig = () => {
  const [gameQuestionType, setGameQuestionType] = useState<QuestionType>(QUESTION_TYPES.COUNTRY)
  const [gameMode, setGameMode] = useState<ClassicMode>(CLASSIC_MODE.MULTIPLE_CHOICE)

  const setGameConfig = ({ type, mode }: { type: QuestionType; mode: ClassicMode }) => {
    setGameQuestionType(type)
    setGameMode(mode)
  }

  return {
    gameMode,
    gameQuestionType,
    setGameConfig,
  }
}

export default useGameConfig
