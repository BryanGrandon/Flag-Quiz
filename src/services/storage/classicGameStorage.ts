import { CLASSIC_GAME_CONFIG } from '../../pages/game/classic/constants/config'
import type { ClassicSavedGame } from '../../pages/game/classic/types/storage'
import { storage } from '../../utilities/storage'

const CLASSIC_SAVED_GAME_KEY = CLASSIC_GAME_CONFIG.STORAGE_KEYS.SAVED_GAME

export const classicGameStorage = {
  load: (): ClassicSavedGame | null => storage.load<ClassicSavedGame>(CLASSIC_SAVED_GAME_KEY),
  save: (game: ClassicSavedGame): void => storage.save(CLASSIC_SAVED_GAME_KEY, game),
  remove: (): void => storage.remove(CLASSIC_SAVED_GAME_KEY),
}
