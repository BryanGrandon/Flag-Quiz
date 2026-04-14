import type { ClassicModeOption } from '../constants/mode-options'
import type { QuestionType } from '../constants/question-type'

export type GameImage = {
  src: string
  alt: string
}

export type ClassicGame<T extends QuestionType = QuestionType> = {
  id: number
  questionType: T
  title: string
  description: string[]
  image: GameImage
  options: ClassicModeOption[]
}
