import { GAME_MODES, KEY_GAMES } from '../constants/game/games'

export type GameMode = (typeof GAME_MODES)[keyof typeof GAME_MODES]
export type GameType = typeof KEY_GAMES.COUNTRY | typeof KEY_GAMES.CAPITAL
export type AllGameType = GameType | typeof KEY_GAMES.POPULATION

export interface GameContext {
  options: {
    set: {
      GameOption: ({ type, value }: { type: GameType; value: GameMode }) => void
    }
    get: {
      GameOption: ({ type }: { type: GameType }) => GameMode
    }
  }
  startTheGame: ({ type }: { type: AllGameType }) => void
}

// Inside GameCountryProvider.tsx

export interface ImageOfTheFlag {
  png: string
  svg: string
  alt: string
}
