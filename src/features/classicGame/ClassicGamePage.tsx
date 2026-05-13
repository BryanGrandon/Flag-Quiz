import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_CATEGORIES } from '../../shared/constants/game-category'
import { isValidOption } from '../../shared/utilities/validators'
import { GAME_MODES } from '../../shared/constants/game-modes'
import { useClassicGameEngine } from './hooks/useClassicGameEngine'
import ClassicGameHeader from './components/ClassicGameHeader'
import ModeMultiChoice from './components/ModeMultiChoice'
import ModeWriting from './components/ModeWriting'
import { getStyle } from './utilities/getStyles'

const ClassicGamePage = () => {
  const [params] = useSearchParams()
  const categoryParam = params.get('category')
  const modeParam = params.get('mode')

  const category = isValidOption(GAME_CATEGORIES, categoryParam) ? categoryParam : null
  const mode = isValidOption(GAME_MODES, modeParam) ? modeParam : null

  const { startClassicGame, classicGame, gameActions, storageActions, validators } = useClassicGameEngine()

  useEffect(() => {
    if (!category || !mode) return
    startClassicGame({ category, mode })
  }, [category, mode, startClassicGame])

  const style = category ? getStyle(category) : ''

  return (
    <article className='min-h-screen'>
      <ClassicGameHeader category={category ?? ''} mode={mode ?? ''} streakCurrent={classicGame?.streak?.current ?? 0} bestCurrent={classicGame?.streak?.best ?? 0} />

      <article className='flex flex-col gap-6 px-6'>
        {mode === GAME_MODES.MULTIPLE_CHOICE ? (
          <ModeMultiChoice options={classicGame.options ?? []} image={classicGame.image} gameActions={gameActions} storageActions={storageActions} validators={validators} color={style} />
        ) : (
          <ModeWriting winner={classicGame.winner ?? ''} image={classicGame.image} gameActions={gameActions} storageActions={storageActions} validators={validators} color={style} />
        )}
      </article>

      <footer className='text-center mt-12 text-gray-400'>🏅 Can you beat your best score?</footer>
    </article>
  )
}
export default ClassicGamePage
