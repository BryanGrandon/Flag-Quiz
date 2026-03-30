import { useState } from 'react'
import GameCard from './GameCard'
import type { game_key } from '../../../utilities/interfaces/games'

type game_card_flip = {
  theId: number
  gameKey: game_key
  front: {
    title: string
    description: string
    optionGame: boolean
  }
  back: {
    title: string
    description: string[]
  }
}

const GameCardFlip = ({ theId, gameKey, front, back }: game_card_flip) => {
  const [flip, setFlip] = useState(false)

  return (
    <article className='perspective cursor-pointer'>
      <article className={`relative w-full  duration-500 transform-style ${flip ? 'rotate-y-180' : ''}`}>
        <section className='absolute w-full h-full backface-hidden bg-gray-800 flex items-start justify-center text-white rounded-xl'>
          <GameCard key={theId} gameKey={gameKey} front={front} buttons={{ howToPlay: () => setFlip(!flip), startQuiz: () => {} }} />
        </section>
        <section className='absolute w-full h-full backface-hidden rotate-y-180 bg-gray-800 flex items-start justify-center text-white rounded-xl'>
          <section className='flex flex-col gap-4 p-6 h-full justify-between'>
            <section>
              <h3 className='text-2xl font-bold mb-3'>{back.title}</h3>
              {back.description.map((desc, index) => (
                <p key={index} className='text-gray-200 mb-2'>
                  {desc}
                </p>
              ))}
            </section>

            <button onClick={() => setFlip(!flip)} className='border border-gray-600 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer'>
              Flip Back
            </button>
          </section>
        </section>

        <section className='invisible p-0'>
          <GameCard key={theId} gameKey={gameKey} front={front} buttons={{ howToPlay: () => setFlip(!flip), startQuiz: () => {} }} />
        </section>
      </article>
    </article>
  )
}

export default GameCardFlip
