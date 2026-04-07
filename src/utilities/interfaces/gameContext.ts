import { KEY_GAMES } from '../constants/game/games'

export type GameMode = typeof KEY_GAMES.COUNTRY | typeof KEY_GAMES.CAPITAL

export interface GameContext {
  options: {}
  gameMode: {
    multipleChoice: (value: GameMode) => void
    writing: (value: GameMode) => void
  }
}

// Inside GameCountryProvider.tsx

export interface ImageOfTheFlag {
  png: string
  svg: string
  alt: string
}
