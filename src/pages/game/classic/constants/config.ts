export const CLASSIC_GAME_CONFIG = {
  ANSWER_OPTIONS_COUNT: 4,

  // scoring
  POINTS_PER_CORRECT: 10,
  POINTS_PER_WRONG: 0,

  // timers (ms)
  QUESTION_TIME_LIMIT: 15000,

  // local storage
  STORAGE_KEYS: {
    BEST_SCORE: 'classic_best_score',
    SAVED_CLASSIC_ROUND: 'classic_saved_game',
  },
} as const
