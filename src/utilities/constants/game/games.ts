import { ROUTES } from '../routes/paths'
import { GAME_MODES } from './gameModes'

export const KEY_GAMES = {
  COUNTRY: 'guessCountry',
  CAPITAL: 'guessCapital',
  POPULATION: '',
}

export const GAMES = [
  {
    id: 1,
    key: KEY_GAMES.COUNTRY,
    title: 'Guess the Country',
    description: 'A fun game where players guess the country based on its flag.',
    optionGame: true,
    defaultOption: GAME_MODES.MULTIPLE,
    routes: ROUTES.GUESS_COUNTRY,
  },
  {
    id: 2,
    key: KEY_GAMES.CAPITAL,
    title: 'Guess the Capital',
    description: "A challenging game in which players must guess a country's capital based on its flag.",
    optionGame: true,
    defaultOption: GAME_MODES.MULTIPLE,
    routes: ROUTES.GUESS_CAPITAL,
  },
  {
    id: 3,
    key: KEY_GAMES.POPULATION,
    title: 'Guess who more Population', // Check title
    description: '', // Create description
    optionGame: false,
    routes: ROUTES.GUESS_CAPITAL, // Create route
  },
]

export const GAME_FLIP = {}
