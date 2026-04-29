import useClassicGame from './hooks/useClassicGame'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { CLASSIC_MODE } from './constants/modes'
import { QUESTION_TYPES } from './constants/question-type'
import { isValidOption } from '../../../utilities/validators'

const PageGame = () => {
  const [params] = useSearchParams()

  const typeParam = params.get('type')
  const modeParam = params.get('mode')

  const type = isValidOption(QUESTION_TYPES, typeParam) ? typeParam : null
  const mode = isValidOption(CLASSIC_MODE, modeParam) ? modeParam : null

  const { startClassicGame, isReady, gameRound, checkAnswer, isGameOver, restartGame, streak, correctAnswer } = useClassicGame()

  // ===== Init game =====
  useEffect(() => {
    if (!type || !mode || !isReady) return
    startClassicGame({ type, mode })
  }, [type, mode, isReady, startClassicGame])

  return (
    <>
      {isGameOver && (
        <article className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10'>
          <section className='flex flex-col gap-4 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-300 text-center'>
            <h2 className='font-basicaline text-2xl font-bold mb-2'>Game Over</h2>
            <picture className='flex h-40 w-70 overflow-hidden rounded-lg'>
              {gameRound.image && <img src={gameRound.image.svg} alt='flag' className='object-cover object-center w-full h-full' />}
            </picture>
            <p className=' text-lg font-semibold'>
              Correct Answer: <span className='text-green-400'>{correctAnswer}</span>
            </p>
            <p className='px-4 py-2 border border-gray-400 rounded-lg'>Current Streak: {streak.current}</p>
            <button type='button' className=' px-4 py-2 bg-white text-black rounded hover:scale-105 transition' onClick={restartGame}>
              Try Again
            </button>
          </section>
        </article>
      )}
      <main className='min-h-screen flex flex-col gap-10'>
        <header className='test p-4 flex flex-col gap-4 items-center justify-center'>
          <h2 className='text-4xl font-basicaline text-center font-bold'>Guess the {type}</h2>
          <section className='flex flex-row gap-10 items-center justify-center'>
            <p className='px-4 py-2 border border-gray-400 rounded-lg'>Best Current: {streak.best}</p>
            <p className='px-4 py-2 border border-gray-400 rounded-lg'>Current Streak: {streak.current}</p>
          </section>
        </header>

        <article className='flex items-center justify-center'>
          <section className='flex gap-8 p-8 rounded-xl'>
            <picture className='w-120 h-70 overflow-hidden rounded-lg'>{gameRound.image && <img src={gameRound.image.svg} alt='flag' className='object-cover object-center w-full h-full' />}</picture>

            {gameRound.options.length > 0 && (
              <section className='flex flex-col justify-evenly'>
                <h2 className='text-xl mb-4'>Make your guess</h2>

                {gameRound.options.map((option, index) => (
                  <button
                    key={`${option}-${index}`}
                    type='button'
                    className='w-80 text-center text-lg bg-gray-600 rounded py-2 px-8 cursor-pointer transition hover:bg-primary hover:scale-105'
                    onClick={() => checkAnswer(option)}
                  >
                    <abbr title={option} className='no-underline'>
                      <h3 className='overflow-hidden whitespace-nowrap text-ellipsis'>{option}</h3>
                    </abbr>
                  </button>
                ))}
              </section>
            )}
          </section>
        </article>
      </main>
    </>
  )
}

export default PageGame
