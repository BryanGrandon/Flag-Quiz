import { ROUTES } from '../routes/paths'

export const KEY_GAMES = {
  COUNTRY: 'guessCountry',
  CAPITAL: 'guessCapital',
  POPULATION: 'guessPopulation',
}

export const GAMES = [
  {
    id: 1,
    key: KEY_GAMES.COUNTRY,
    front: {
      title: 'Guess the Country',
      description: 'A fun game where players guess the country based on its flag.',
      optionGame: true,
    },
    back: {
      title: 'How to Play',
      description: ['Guess the country from a random flag.', 'Choose the correct option or type the answer depending on the selected mode. ', 'Score points for each correct answer!'],
    },
    routes: ROUTES.GUESS_COUNTRY,
  },
  {
    id: 2,
    key: KEY_GAMES.CAPITAL,
    front: {
      title: 'Guess the Capital',
      description: "A challenging game in which players must guess a country's capital based on its flag.",
      optionGame: true,
    },
    back: {
      title: 'How to Play',
      description: ['Guess the capital city from a random country.', 'Choose the correct option or type the answer depending on the selected mode. ', 'Score points for each correct answer!'],
    },
    routes: ROUTES.GUESS_CAPITAL,
  },
  {
    id: 3,
    key: KEY_GAMES.POPULATION,
    front: {
      title: 'Guess the Population',
      description: 'A game where players guess the population of a country based on its flag.',
      optionGame: false,
    },
    back: {
      title: 'How to Play',
      description: ['Select the correct country name from the options based on the displayed flag.'],
    },
    routes: ROUTES.GUESS_CAPITAL, // Create route
  },
]

export const GAME_FLIP = {}
