import type { ClassicMode } from '../../pages/game/classic/constants/modes'
import type { QuestionType } from '../../pages/game/classic/constants/question-type'
import type { ClassicSavedGame } from '../../pages/game/classic/types/storage'
import { storage } from '../../utilities/storage'

export const createClassicGameStorage = (type: QuestionType, mode: ClassicMode) => {
  const key = `classic_game:${type}:${mode}`

  return {
    load: (): ClassicSavedGame | null => storage.load<ClassicSavedGame>(key),
    save: (game: ClassicSavedGame): void => storage.save(key, game),
    remove: (): void => storage.remove(key),
  }
}
