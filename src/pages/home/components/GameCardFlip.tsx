import { useState } from 'react'
import GameCard from './GameCard'

type game_card_flip = {
  gameKey: string
  title: string
  description: string
  optionGame: boolean
  defaultOption?: string
}

const GameCardFlip = ({ gameKey, title, description, optionGame, defaultOption }: game_card_flip) => {
  const [flip, setFlip] = useState(false)

  return (
    <article className='perspective cursor-pointer'>
      <article className={`relative w-full  duration-500 transform-style ${flip ? 'rotate-y-180' : ''}`}>
        <section className='absolute w-full h-full backface-hidden bg-gray-800 flex items-start justify-center text-white rounded-xl'>
          <GameCard
            gameKey={gameKey}
            title={title}
            description={description}
            optionGame={optionGame}
            defaultOption={defaultOption}
            buttons={{ howToPlay: () => setFlip(!flip), startQuiz: () => {} }}
          />
        </section>
        <section className='absolute w-full h-full backface-hidden rotate-y-180 bg-purple-600 flex items-center justify-center text-white rounded-xl'>
          Back
          <p></p>
          <button onClick={() => setFlip(!flip)} className='bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 rounded-lg'>
            Flip Back
          </button>
        </section>

        <section className='invisible p-0'>
          <GameCard
            gameKey={gameKey}
            title={title}
            description={description}
            optionGame={optionGame}
            defaultOption={defaultOption}
            buttons={{ howToPlay: () => setFlip(!flip), startQuiz: () => {} }}
          />
        </section>
      </article>
    </article>
  )
}

export default GameCardFlip
