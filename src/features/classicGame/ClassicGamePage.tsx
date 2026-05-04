import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_CATEGORIES } from '../../shared/constants/game-category'
import { GAME_MODES } from '../../shared/constants/game-modes'
import { isValidOption } from '../../shared/utilities/validators'
import { useClassicGameEngine } from './hooks/useClassicGameEngine'
import Button from '../../shared/components/Button'

const ClassicGamePage = () => {
  const [params] = useSearchParams()
  const categoryParam = params.get('category')
  const modeParam = params.get('mode')

  const category = isValidOption(GAME_CATEGORIES, categoryParam) ? categoryParam : null
  const mode = isValidOption(GAME_MODES, modeParam) ? modeParam : null

  const { startClassicGame, classicGame, isLoading, checkAnswer, restartGame, streakManager } = useClassicGameEngine()

  useEffect(() => {
    if (!category || !mode || isLoading) return
    startClassicGame({ category, mode })
  }, [category, mode, isLoading, startClassicGame])

  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const resetStates = () => {
    setSelected(null)
    setShowResult(false)
  }

  const handleTryAgain = () => {
    resetStates()
    restartGame()
  }

  const handleSelect = (id: string) => {
    if (showResult) return
    setSelected(id)
    setShowResult(true)

    setTimeout(() => {
      if (id === classicGame?.winner) {
        resetStates()
        checkAnswer({ value: id })
      }
    }, 200)
  }

  const getButtonStyle = (element: string) => {
    if (!showResult) return 'bg-gray-700 hover:bg-gray-600'
    if (element === classicGame?.winner) return 'bg-green-600 border-green-400'
    if (element === selected) return 'bg-red-600 border-red-400'
    return 'bg-gray-700 opacity-50'
  }

  return (
    <article className='min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6'>
      <header>
        <nav className='flex items-center justify-between mb-8'>
          <Button title={'← Back'} onClick={() => window.history.back()} />

          <section className='text-center'>
            <h1 className='text-3xl font-bold'>Guess the {category}</h1>
            <p className='text-gray-400 text-sm'>Look at the flag and choose the correct {category}</p>
          </section>
          <section className='text-sm text-gray-300'>
            Mode: <span className='text-green-400'>{mode?.split('_').join(' ')}</span> {/* Capitalize the first letter of each word */}
          </section>
        </nav>
        <section className='flex justify-center gap-6 mb-10'>
          <p className='px-6 py-3 rounded-lg border border-green-400/60 bg-green-500/20'>
            🏆 Best: <span className='font-bold'>{streakManager.best}</span>
          </p>
          <p className='px-6 py-3 rounded-lg border border-purple-400/60 bg-purple-500/20'>
            🔥 Streak: <span className='font-bold'>{streakManager.current}</span>
          </p>
        </section>
      </header>

      <article className='flex flex-col gap-6 test'>
        <article className='grid lg:grid-cols-2 items-center gap-8 mx-auto bg-blue-950/40 backdrop-blur-2xl  p-6 rounded-2xl shadow-lg border-2 border-blue-900'>
          <picture className='max-w-100 lg:w-120 max-h-60 lg:h-70 overflow-hidden rounded-lg'>
            {classicGame.image && <img src={classicGame.image.svg} alt={classicGame.image.alt} className='object-cover object-center w-full h-full' />}
          </picture>
          {mode === GAME_MODES.MULTIPLE_CHOICE ? (
            <section>
              <h2 className='text-xl font-semibold mb-4 border-b border-gray-700 pb-2'>Make your guess</h2>
              <section className='flex flex-col gap-4'>
                {classicGame?.options?.map((option, index) => (
                  <>
                    <Button
                      title={option}
                      onClick={() => handleSelect(option)}
                      className={`border transition ${getButtonStyle(option)}`}
                      icon={<span className='w-6 h-6 flex items-center justify-center rounded-full border'>{String.fromCharCode(65 + index)}</span>}
                    />
                  </>
                ))}
              </section>
            </section>
          ) : (
            <section>
              <h2 className='text-xl font-semibold mb-4 border-b border-gray-700 pb-2'>Write your answer</h2>
              <form className='flex gap-4' onSubmit={(e) => e.preventDefault()}>
                {/* Create a function to handle form submission */}
                <input
                  type='text'
                  placeholder='Type your answer...'
                  className='flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition'
                />
                <button type='submit' className='px-5 py-3 rounded-lg bg-green-600 hover:bg-green-500 transition'>
                  Submit
                </button>
              </form>
            </section>
          )}
        </article>
        {showResult && selected !== classicGame?.winner && (
          // Create a button to scroll back to the top of the page and start a new round

          <section className=' flex flex-col items-center gap-4'>
            <p className='text-red-400 font-medium'>❌ Wrong answer. Try again!</p>
            <Button title='Try again' onClick={handleTryAgain} className='bg-red-600 hover:bg-red-500 font-semibold' />
          </section>
        )}
      </article>

      <footer className='text-center mt-12 text-gray-400'>🏅 Can you beat your best score?</footer>
    </article>
  )
}
export default ClassicGamePage
