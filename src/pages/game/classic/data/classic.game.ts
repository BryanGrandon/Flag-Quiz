import { CLASSIC_MODE_OPTIONS } from '../constants/mode-options'
import { QUESTION_TYPES } from '../constants/question-type'
import type { ClassicGame } from '../types/game'

export const CLASSIC_GAMES: ClassicGame[] = [
  {
    id: 1,
    questionType: QUESTION_TYPES.COUNTRY,
    title: 'Guess the Country',
    description: [
      `Guess the country based on a randomly displayed flag. Select the correct option or type in your answer, depending on the game mode you've chosen. Earn points for each correct answer and challenge yourself to get the highest score possible!`,
    ],
    options: CLASSIC_MODE_OPTIONS,
    image: {
      src: 'https://svgowl.com/show/389190/flag.svg',
      alt: 'Country Flag Quiz',
    },
  },
  {
    id: 2,
    questionType: QUESTION_TYPES.CAPITAL,
    title: 'Guess the Capital',
    description: ['Guess the capital city from a random country.', 'Choose the correct option or type the answer depending on the selected mode. ', 'Score points for each correct answer!'],
    options: CLASSIC_MODE_OPTIONS,
    image: {
      src: 'https://svgowl.com/show/389259/landmark.svg',
      alt: 'Capital City Quiz',
    },
  },
]
