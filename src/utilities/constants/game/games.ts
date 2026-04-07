import { ROUTES } from '../routes/paths'

export const KEY_GAMES = {
  COUNTRY: 'country',
  CAPITAL: 'capital',
  POPULATION: 'population',
}

export const GAMES = [
  {
    id: 1,
    key: KEY_GAMES.COUNTRY,
    title: 'Guess the Country',
    howToPlay: ['Guess the country from a random flag.', 'Choose the correct option or type the answer depending on the selected mode. ', 'Score points for each correct answer!'],
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
