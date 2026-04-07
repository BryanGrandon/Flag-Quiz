import { KEY_GAMES } from '../constants/game/games'

export type game_key = typeof KEY_GAMES.COUNTRY | typeof KEY_GAMES.CAPITAL | typeof KEY_GAMES.POPULATION

interface Flags {
  png: string
  svg: string
  alt: string
}

interface Name {
  common: string
  official: string
  nativeName: NativeName
}

interface NativeName {
  [key: string]: {
    official: string
    common: string
  }
}

export interface Country {
  flags: Flags
  name: Name
  capital: string[]
  population: number
}
