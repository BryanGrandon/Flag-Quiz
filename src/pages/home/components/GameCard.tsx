import Button from '../../../components/ui/Button'
import { GAME_MODE_OPTIONS } from '../../../utilities/constants/game/gameModes'
import { useGames } from '../../../utilities/hooks/useGames'
import type { game_key } from '../../../utilities/interfaces/games'
import SelectButton from './SelectButton'

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
              <SelectButton text={option.text} checked={activeOption} value={option.value} onClick={() => updateGameOption({ key: gameKey, value: option.value })} />
            ))}
          </section>
        </section>
      ) : null}
      <section className='grid grid-cols-2 gap-3'>
        <Button text='How to Play' onClick={buttons?.howToPlay} moreClasses='bg-gray-500 hover:bg-gray-600 text-white' />
        <Button text='Start Quiz' onClick={buttons?.startQuiz} moreClasses='bg-blue-500 hover:bg-blue-600 text-white' />
      </section>
    </section>
  )
}

export default GameCard
