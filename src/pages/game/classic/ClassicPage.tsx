import useClassicGame from './hooks/useClassicGame'
import { useSearchParams } from 'react-router-dom'

import { useEffect } from 'react'
import type { ClassicMode } from './constants/modes'
import type { QuestionType } from './constants/question-type'

const PageGame = () => {
  // PageClassicGame
  const [params] = useSearchParams()

  const type = params.get('type') as QuestionType
  const mode = params.get('mode') as ClassicMode

  const { startClassicGame, isReady, gameRound, checkAnswer, isGameOver, restartGame } = useClassicGame()

  useEffect(() => {
    if (!type || !mode) return
    if (!isReady) return
    startClassicGame(type, mode)
  }, [startClassicGame, type, mode, isReady])

  return (
    <main>
      {isGameOver ? (
        <article className='fixed w-full h-full flex justify-center items-center'>
          <section className='bg-gray-800 p-4 rounded-2xl shadow-lg shadow-gray-800 border border-gray-300'>
            <h2 className='text-xl font-bold mb-2'>Game Over</h2>
            <p>points: 1000</p>
            <p>Time: 1.1 minutes</p>
            <button className='mt-4 px-4 py-2 bg-white text-black rounded hover:scale-105 transition' onClick={restartGame}>
              Try Again
            </button>
          </section>
        </article>
      ) : null}

      <article className='min-h-lvh test flex items-center justify-center'>
        <article>
          <section className='test flex gap-8 p-8 rounded-xl'>
            <section className='w-120 h-70 overflow-hidden test rounded-lg'>
              <img src={gameRound.image?.svg} alt='' className='object-cover object-center w-full h-full' />
            </section>
            {gameRound.options.length > 0 ? (
              <section className='test flex flex-col justify-evenly'>
                <h2 className='font-basicaline text-xl'>Make your guess</h2>
                {gameRound.options.map((el) => (
                  <button className={`w-80 text-center text-lg bg-gray-600 rounded py-2 px-8 cursor-pointer select-none transition hover:bg-primary hover:scale-105`} onClick={() => checkAnswer(el)}>
                    {el}
                  </button>
                ))}
              </section>
            ) : null}
          </section>
        </article>
      </article>
    </main>
  )
}

export default PageGame
