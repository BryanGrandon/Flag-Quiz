import { ROUTES } from '../routes/paths'

export const KEY_GAMES = {
  COUNTRY: 'country',
  CAPITAL: 'capital',
  POPULATION: 'population',
} as const

// ===== Game Types ===== //

export const GAME_MODES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  WRITE: 'write',
} as const

export const GAME_TYPE = {
  COUNTRY: 'country',
  CAPITAL: 'capital',
} as const

// ===== Game Options ===== //

export const GAME_MODE_OPTIONS = [
  {
    id: 1,
    text: 'Multiple choice mode',
    value: GAME_MODES.MULTIPLE_CHOICE,
  },
  {
    id: 2,
    text: 'Write answer mode',
    value: GAME_MODES.WRITE,
  },
]

// ===== Games ===== //

export const GAMES = [
  {
    id: 1,
    key: KEY_GAMES.COUNTRY,
    title: 'Guess the Country',
    howToPlay: [
      `Guess the country based on a randomly displayed flag. Select the correct option or type in your answer, depending on the game mode you've chosen. Earn points for each correct answer and challenge yourself to get the highest score possible!`,
    ],
    routes: ROUTES.GUESS_COUNTRY,
    img: {
      src: '',
      alt: '',
    },
  },
  {
    id: 2,
    key: KEY_GAMES.CAPITAL,
    title: 'Guess the Capital',
    howToPlay: ['Guess the capital city from a random country.', 'Choose the correct option or type the answer depending on the selected mode. ', 'Score points for each correct answer!'],
    routes: ROUTES.GUESS_CAPITAL,
    img: {
      src: '',
      alt: '',
    },
  },
  {
    id: 3,
    key: KEY_GAMES.POPULATION,
    title: 'Guess the Population',
    howToPlay: ['Select the correct country name from the options based on the displayed flag.'],
    routes: ROUTES.GUESS_CAPITAL, //
    img: {
      src: '',
      alt: '',
    },
  },
]
