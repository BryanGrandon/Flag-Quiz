import { useEffect } from 'react'
import { TYPE_MODES, type GameModes } from '../../config/games/modes'
import { dynamicStorageKey } from '../../shared/utilities/dynamicStorageKey'
import { storage } from '../../shared/utilities/storage'
import StreaksHeader from './components/StreaksHeader'
import { useGameEngine } from './hooks/useGameEngine'
import type { GameCategories } from '../../config/games/categories'
import MultipleChoice from './components/MultipleChoice'
import Writing from './components/Writing'

const GamePage = () => {
  const mode = storage.load(dynamicStorageKey({ base: 'init_mode', dynamic: '' })) as GameModes
  const category = storage.load(dynamicStorageKey({ base: 'init_category', dynamic: '' })) as GameCategories
  const { createRound, displayFlag, multipleChoice, getStreaks, colorCard, writing, isAnswerLocked } = useGameEngine()

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

          {mode === TYPE_MODES.MULTIPLE_CHOICE ? (
            <MultipleChoice
              options={multipleChoice.options}
              handlerOptions={multipleChoice.handlerOptions}
              styleButtons={multipleChoice.styleButtons}
            />
          ) : (
            <Writing writingOptions={writing} isAnswerLocked={isAnswerLocked} />
          )}
        </section>
      </article>

      <footer className='text-center mt-12 text-gray-400'>🏅 Can you beat your best score?</footer>
    </article>
  )
}

export default GamePage
