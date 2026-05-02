import { GAME_MODES } from '../constants/game-modes'

const TYPE_COUNTRY = 'country'
const TYPE_CAPITAL = 'capital'

export const CLASSIC_MODES = [GAME_MODES.MULTIPLE_CHOICE, GAME_MODES.WRITING] as const

export const GAME_CONFIG = [
  {
    id: 1,
    category: TYPE_COUNTRY,
    title: 'Guess the Country',
    description: 'Identify the country from its flag and test your global knowledge.',
    howToPlay: `Guess the country based on a randomly displayed flag. Select the correct option or type in your answer, depending on the game mode you've chosen. Earn points for each correct answer and challenge yourself to get the highest score possible!`,
    modes: CLASSIC_MODES,
    image: {
      src: 'https://svgowl.com/show/389190/flag.svg',
      alt: 'Country Flag Quiz',
    },
    color: 'purple',
  },
  {
    id: 2,
    category: TYPE_CAPITAL,
    title: 'Guess the Capital',
    description: 'Match countries with their capitals and sharpen your geography skills.',
    howToPlay: `Guess the capital city from a random country. Choose the correct option or type the answer depending on the selected mode. Score points for each correct answer!`,
    modes: CLASSIC_MODES,
    image: {
      src: 'https://svgowl.com/show/389259/landmark.svg',
      alt: 'Capital City Quiz',
    },
    color: 'blue',
  },
] as const
