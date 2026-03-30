import { GAME_MODE_OPTIONS } from '../../../utilities/constants/game/gameModes'
import { useGames } from '../../../utilities/hooks/useGames'

type GameKey = 'guessCountry' | 'guessCapital'

type game_card = {
  gameKey: GameKey
  title: string
  description: string
  optionGame: boolean
  defaultOption?: string
  buttons: {
    howToPlay: () => void
    startQuiz: () => void
  }
}

const GameCard = ({ gameKey, title, description, optionGame, buttons }: game_card) => {
  const { updateGameOption, selectedGameOptions } = useGames()

  const clickOption = (value: string) => {
    updateGameOption({ key: gameKey, value })
  }

  const activeOption = selectedGameOptions[gameKey] ?? 'multiple'

  return (
    <section className='rounded-xl p-6 shadow-lg w-full test'>
      <h3 className='text-2xl font-bold mb-3'>{title}</h3>
      <p className='text-gray-400 mb-4'>{description}</p>
      {optionGame ? (
        <section className='mb-6 space-y-2'>
          <h3>Game Options</h3>
          <section className='pl-4'>
            {GAME_MODE_OPTIONS.map((option) => (
              <button key={option.id} className='flex items-center gap-2 p-1 cursor-pointer' onClick={() => clickOption(option.value)}>
                <span className={`w-2 h-2 rounded-full ${activeOption === option.value ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
                {option.text}
              </button>
            ))}
          </section>
        </section>
      ) : null}
      <section className='grid grid-cols-2 gap-3'>
        <button onClick={buttons?.howToPlay} className='border border-gray-600 py-2 rounded-lg hover:bg-gray-700 transition'>
          How to Play
        </button>
        <button onClick={buttons?.startQuiz} className='bg-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-500 transition'>
          Start Quiz
        </button>
      </section>
    </section>
  )
}

export default GameCard
