import { useEffect } from 'react'
import type { GameModes } from '../../config/games/modes'
import { dynamicStorageKey } from '../../shared/utilities/dynamicStorageKey'
import { storage } from '../../shared/utilities/storage'
import StreaksHeader from './components/StreaksHeader'
import { useGameEngine } from './hooks/useGameEngine'
import Button from '../../shared/components/Button'
import type { GameCategories } from '../../config/games/categories'

const GamePage = () => {
  const mode = storage.load(dynamicStorageKey({ base: 'init_mode', dynamic: '' })) as GameModes
  const category = storage.load(dynamicStorageKey({ base: 'init_category', dynamic: '' })) as GameCategories
  const { createRound, displayFlag, multipleChoice, getStreaks, colorCard } = useGameEngine()

  useEffect(() => {
    if (!category || !mode) return
    createRound()
  }, [category, mode, createRound])

  return (
    <article>
      <StreaksHeader category={category} mode={mode} best={getStreaks.best} current={getStreaks.current} />

      <article className='mx-auto w-full max-w-6xl p-3 sm:p-4'>
        <section
          className={`mx-auto grid w-full grid-cols-1 items-center justify-items-center gap-6 rounded-2xl border ${colorCard} bg-gray-800/50 p-4 shadow-lg sm:p-6 lg:grid-cols-2 lg:gap-8`}
        >
          <picture className='flex h-44 w-full max-w-md items-center justify-center overflow-hidden rounded-xl bg-gray-900/40 sm:h-56 lg:h-70'>
            {displayFlag && <img src={displayFlag} alt='Flag' className='block max-h-full max-w-full object-contain' />}
          </picture>

          <div className='flex w-full max-w-md flex-col gap-3 sm:gap-4'>
            {multipleChoice.options.map((option, index) => (
              <Button
                key={option}
                title={option}
                onClick={() => multipleChoice.handlerOptions(option)}
                className={`w-full border transition-all  ${multipleChoice.styleButtons(option)}`}
                icon={
                  <span className='flex size-7 shrink-0 items-center justify-center rounded-full border border-current/30 text-sm font-semibold'>
                    {String.fromCharCode(65 + index)}
                  </span>
                }
              />
            ))}
          </div>
        </section>
      </article>

      <footer className='text-center mt-12 text-gray-400'>🏅 Can you beat your best score?</footer>
    </article>
  )
}

export default GamePage
