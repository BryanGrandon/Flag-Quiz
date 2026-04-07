import { GAME_MODES, GAME_TYPE } from '../constants/game/games'

export type GameMode = (typeof GAME_MODES)[keyof typeof GAME_MODES]
export type GameType = (typeof GAME_TYPE)[keyof typeof GAME_TYPE]

export interface GameContext {
  options: {
    set: {
      GameOption: ({ type, value }: { type: GameType; value: GameMode }) => void
    }
    get: {
      GameOption: ({ type }: { type: GameType }) => GameMode
    }
  }
  gameMode: {
    multipleChoice: (value: GameType) => void
    writing: (value: GameType) => void
  }
}

// Inside GameCountryProvider.tsx

export interface ImageOfTheFlag {
  png: string
  svg: string
  alt: string
}
