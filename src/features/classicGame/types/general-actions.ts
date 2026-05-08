export type GeneralActions = {
  gameActions: {
    nextRound: () => void
    restart: () => void
  }
  storageActions: {
    reset: () => void
  }
  validators: {
    checkAnswer: (value: string) => boolean
  }
}
