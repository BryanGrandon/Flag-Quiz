import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_CATEGORIES } from '../../shared/constants/game-category'
import { GAME_MODES } from '../../shared/constants/game-modes'
import { isValidOption } from '../../shared/utilities/validators'
import { useClassicGameEngine } from './hooks/useClassicGameEngine'

const ClassicGamePage = () => {
  const [params] = useSearchParams()
  const categoryParam = params.get('category')
  const modeParam = params.get('mode')

  const category = isValidOption(GAME_CATEGORIES, categoryParam) ? categoryParam : null
  const mode = isValidOption(GAME_MODES, modeParam) ? modeParam : null

  const { startClassicGame, classicGame, isLoading, checkAnswer, restartGame } = useClassicGameEngine()

  useEffect(() => {
    if (!category || !mode || isLoading) return
    startClassicGame({ category, mode })
  }, [category, mode, isLoading, startClassicGame])

  const best = 5 // Change this to get the best score from storage
  const streak = 3 // Change this to get the current streak from storage

  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (id: string) => {
    // improve this logic
    if (showResult) return
    setSelected(id)
    setShowResult(true)

    setTimeout(() => {
      if (id === classicGame?.winner) {
        setSelected(null)
        setShowResult(false)
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
      <header className='flex items-center justify-between mb-8'>
        <button className='px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition'>← Back</button> {/* Add icon for back button */}
        <section className='text-center'>
          <h1 className='text-3xl font-bold'>Guess the {category}</h1>
          <p className='text-gray-400 text-sm'>Look at the flag and choose the correct {category}</p>
        </section>
        <section className='text-sm text-gray-300'>
          Mode: <span className='text-green-400'>{mode?.split('_').join(' ')}</span> {/* Capitalize the first letter of each word */}
        </section>
      </header>

      <section className='flex justify-center gap-6 mb-10'>
        <p className='px-6 py-3 rounded-lg border border-green-400/60 bg-green-500/20'>
          🏆 Best: <span className='font-bold'>{best}</span>
        </p>
        <p className='px-6 py-3 rounded-lg border border-purple-400/60 bg-purple-500/20'>
          🔥 Streak: <span className='font-bold'>{streak}</span>
        </p>
      </section>

      <article className='grid md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-blue-950/40 backdrop-blur-2xl  p-6 rounded-2xl shadow-lg border-2 border-blue-900'>
        <picture className='p-4 rounded-2xl shadow-lg'>
          <img src={classicGame?.image?.svg} alt='flag' className='w-full h-64 object-cover rounded-xl' />
        </picture>
        {/* Multiple choice options */}
        <section>
          <h2 className='text-xl font-semibold mb-4 border-b border-gray-700 pb-2'>Make your guess</h2>
          <section className='flex flex-col gap-4'>
            {/* Check height options buttons */}
            {classicGame?.options?.map((opt, index) => (
              <button key={index} onClick={() => handleSelect(opt)} className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition ${getButtonStyle(opt)}`}>
                <span className='w-8 h-8 flex items-center justify-center rounded-full border'>{String.fromCharCode(65 + index)}</span>
                {opt}
              </button>
            ))}
          </section>
        </section>
        {/* Write your answer */}
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
      </article>

      {showResult && selected !== classicGame?.winner && (
        // Create a button to scroll back to the top of the page and start a new round

        <section className='mt-6 flex flex-col items-center gap-4'>
          <p className='text-red-400 font-medium'>❌ Wrong answer. Try again!</p>

          <button
            onClick={() => {
              // Create a function to reset the game state and start a new round
              setSelected(null)
              setShowResult(false)
              restartGame()
            }}
            className='px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition font-semibold'
          >
            Try again
          </button>
        </section>
      )}

      <footer className='text-center mt-12 text-gray-400'>🏅 Can you beat your best score?</footer>
    </article>
  )
}
export default ClassicGamePage
