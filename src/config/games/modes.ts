import { List, PenLine, type LucideIcon } from 'lucide-react'

export const GAME_MODES = {
  multiple_choice: {
    label: 'Multiple Choice',
    icon: List,
  },
  writing: {
    label: 'Writing',
    icon: PenLine,
  },
} as const

export type GameModes = keyof typeof GAME_MODES

export const TYPE_MODES = Object.fromEntries(Object.keys(GAME_MODES).map((key) => [key.toUpperCase(), key])) as Record<
  Uppercase<GameModes>,
  GameModes
>

export type Modes = {
  label: string
  icon: LucideIcon
  key: GameModes
}

export const MODES: Modes[] = Object.entries(GAME_MODES).map(([key, mode]) => ({ key: key as GameModes, ...mode }))
