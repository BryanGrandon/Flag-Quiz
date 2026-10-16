import { Flag, Landmark, type LucideIcon } from 'lucide-react'
import { MODES, type Modes } from './modes'

const GAME_SETTINGS_CATEGORIES = {
  country: {
    title: 'Guess the Country',
    description: 'Identify the country from its flag and test your global knowledge.',
    icon: Flag,
    howToPlay: `Guess the country based on a randomly displayed flag. Select the correct option or type in your answer, depending on the game mode you've chosen. Earn points for each correct answer and challenge yourself to get the highest score possible!`,
    modes: MODES,
    color: {
      default: 'from-purple-500 to-pink-500',
      active: 'bg-purple-500/30 border-purple-400',
    },
  },
  capital: {
    title: 'Guess the Capital',
    description: 'Match countries with their capitals and sharpen your geography skills.',
    icon: Landmark,
    howToPlay: `Guess the capital city from a random country. Choose the correct option or type the answer depending on the selected mode. Score points for each correct answer!`,
    modes: MODES,
    color: {
      default: 'from-cyan-400 to-blue-500',
      active: 'bg-blue-500/30 border-blue-400',
    },
  },
}

export type GameCategories = keyof typeof GAME_SETTINGS_CATEGORIES

export const GAME_CATEGORIES = Object.fromEntries(
  Object.keys(GAME_SETTINGS_CATEGORIES).map((key) => [key.toUpperCase(), key]),
) as Record<Uppercase<GameCategories>, GameCategories>

export type GameConfig = {
  category: GameCategories
  title: string
  description: string
  icon: LucideIcon
  howToPlay: string
  modes: Modes[]
  color: {
    default: string
    active: string
  }
}

export const GAMES: GameConfig[] = Object.entries(GAME_SETTINGS_CATEGORIES).map(([key, data]) => ({
  category: key as GameCategories,
  ...data,
}))
