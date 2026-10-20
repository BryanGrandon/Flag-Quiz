import { useEffect } from 'react'
import type { GameModes } from '../../config/games/modes'
import { dynamicStorageKey } from '../../shared/utilities/dynamicStorageKey'
import { storage } from '../../shared/utilities/storage'
import StreaksHeader from './components/StreaksHeader'
import { useGameEngine } from './hooks/useGameEngine'

const GamePage = () => {
  const mode = storage.load(dynamicStorageKey({ base: 'init_mode', dynamic: '' })) as GameModes
  const category = storage.load(dynamicStorageKey({ base: 'init_category', dynamic: '' })) as GameModes
  const { createRound, displayFlag, multipleChoice } = useGameEngine()

  useEffect(() => {
    if (!category || !mode) return
    createRound()
  }, [category, mode, createRound])

  return (
    <article>
      <StreaksHeader />

      <article className={`bg-linear-to-r p-0.5 rounded-2xl mx-auto`}>
        <section className='grid lg:grid-cols-2 items-center gap-8 bg-gray-900 p-6 rounded-2xl shadow-lg'>
          <picture className='w-80 lg:w-120 h-40 lg:h-70 overflow-hidden rounded-xl mx-auto'>
            {displayFlag && (
              <img
                src={displayFlag}
                alt='Flag'
                className='object-contain lg:object-cover object-center w-full h-full rounded-lg'
              />
            )}
          </picture>
          <section>{mode}</section>
          <div>
            {multipleChoice.options().map((el) => (
              <p>{el}</p>
            ))}
          </div>
        </section>
      </article>
    </article>
  )
}

export default GamePage
