import type { ClassicGame } from '../types/classic'

export const CLASSIC_CONFIG = {
  ANSWER_OPTIONS_COUNT: 4,
}

export const CLASSIC_TYPES = {
  COUNTRY: 'country',
  CAPITAL: 'capital',
} as const

export const CLASSIC_MODES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  WRITING: 'writing',
} as const

const CLASSIC_OPTIONS = [
  {
    id: 1,
    text: 'Multiple Choice',
    value: CLASSIC_MODES.MULTIPLE_CHOICE,
  },
  {
    id: 2,
    text: 'Writing',
    value: CLASSIC_MODES.WRITING,
  },
]

export const CLASSIC_GAMES: ClassicGame[] = [
  {
    id: 1,
    keyType: CLASSIC_TYPES.COUNTRY,
    title: 'Guess the Country',
    howToPlay: [
      `Guess the country based on a randomly displayed flag. Select the correct option or type in your answer, depending on the game mode you've chosen. Earn points for each correct answer and challenge yourself to get the highest score possible!`,
    ],
    options: CLASSIC_OPTIONS,
    img: {
      src: '',
      alt: '',
    },
  },
  {
    id: 2,
    keyType: CLASSIC_TYPES.CAPITAL,
    title: 'Guess the Capital',
    howToPlay: ['Guess the capital city from a random country.', 'Choose the correct option or type the answer depending on the selected mode. ', 'Score points for each correct answer!'],
    img: {
      src: '',
      alt: '',
    },
    options: CLASSIC_OPTIONS,
  },
]

// For UI
export const GAME_MODE_OPTIONS = [
  {
    id: 1,
    text: 'Multiple choice mode',
    value: CLASSIC_MODES.MULTIPLE_CHOICE,
  },
  {
    id: 2,
    text: 'Writing answer mode',
    value: CLASSIC_MODES.WRITING,
  },
]
