import { useClassicGameStorage } from './useClassicGameStorage'
import { useClassicRoundManager } from './useClassicRoundManager'
import { useCountriesPool } from './useCountriesPool'
import { useCountriesQuery } from './useCountriesQuery'

export const useClassicGameEngine = () => {
  const { startClassicGame, classicGame, configClassicGame } = useClassicRoundManager()
  const { isLoading, data: countries } = useCountriesQuery()
  const { remainingCountries } = useCountriesPool(countries)
  const { getGameStorage } = useClassicGameStorage()

  const nextRound = () => startClassicGame(configClassicGame)

  const handlerCorrectAnswer = () => {
    nextRound()
    // TODO: increase streak
  }

  const restartGame = () => {
    remainingCountries.reset()
    getGameStorage(configClassicGame).remove(['winner', 'options', 'image']) // ????????????????
    // TODO: reset current streak
    nextRound()
  }
  const checkAnswer = ({ value }: { value: string }) => {
    const isCorrect = value === classicGame.winner
    getGameStorage(configClassicGame).remove(['winner', 'options', 'image'])
    if (isCorrect) handlerCorrectAnswer()
    else {
      console.log('sssd') // Check
    }
  }

  return { startClassicGame, classicGame, isLoading, checkAnswer, restartGame }
}
