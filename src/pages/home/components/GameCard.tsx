import { GAME_MODE_OPTIONS } from '../../../utilities/constants/game/gameModes'
import { useGames } from '../../../utilities/hooks/useGames'
import type { game_key } from '../../../utilities/interfaces/games'

type game_card = {
  gameKey: game_key
  front: {
    title: string
    description: string
    optionGame: boolean
  }
  buttons: {
    howToPlay: () => void
    startQuiz: () => void
  }
}

const GameCard = ({ gameKey, front, buttons }: game_card) => {
  const { updateGameOption, selectedGameOptions } = useGames()
  const { title, description, optionGame } = front

  const activeOption = selectedGameOptions[gameKey] ?? 'multiple'

  return (
    <section className='rounded-xl p-6 shadow-lg w-full border border-gray-500 shadow-gray-500/30'>
      <h3 className='text-2xl font-bold mb-3'>{title}</h3>
      <p className='text-gray-400 mb-4'>{description}</p>
      {optionGame ? (
        <section className='mb-6 space-y-2'>
          <h3>Game Options</h3>
          <section className='flex flex-col gap-1 pl-4'>
            {GAME_MODE_OPTIONS.map((option) => (
              <button key={option.id} className='flex items-center gap-2 button border border-gray-700 w-full' onClick={() => updateGameOption({ key: gameKey, value: option.value })}>
                <span className={`w-2 h-2 rounded-full ${activeOption === option.value ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
                {option.text}
              </button>
            ))}
          </section>
        </section>
      ) : null}
      <section className='grid grid-cols-2 gap-3'>
        {/* Create a component for buttons */}
        <button onClick={buttons?.howToPlay} className='button bg-gray-500 text-white hover:bg-gray-600'>
          How to Play
        </button>
        <button onClick={buttons?.startQuiz} className='button bg-blue-500 text-white hover:bg-blue-600'>
          Start Quiz
        </button>
      </section>
    </section>
  )
}

export default GameCard
