import useClassicGame from './hooks/useClassicGame'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { CLASSIC_MODE } from './constants/modes'
import { QUESTION_TYPES } from './constants/question-type'
import { isValidOption } from '../../../utilities/validators'
import useGameConfig from './hooks/useGameConfig'

const PageGame = () => {
  const [params] = useSearchParams()

  const typeParam = params.get('type')
  const modeParam = params.get('mode')

  const type = isValidOption(QUESTION_TYPES, typeParam) ? typeParam : null
  const mode = isValidOption(CLASSIC_MODE, modeParam) ? modeParam : null

  const { runGame, startClassicGame, isReady, gameRound, checkAnswer, isGameOver, restartGame } = useClassicGame()
  const { setGameConfig } = useGameConfig()

  // ===== Init game =====
  useEffect(() => {
    if (!type || !mode || !isReady) return
    setGameConfig({ type, mode })
    startClassicGame({ type, mode })
  }, [type, mode, isReady, startClassicGame, setGameConfig, runGame])

  return (
    <main>
      {isGameOver && (
        <article className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10'>
          <section className='bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-300 text-center'>
            <h2 className='text-xl font-bold mb-2'>Game Over</h2>
            <p>points: 1000</p>
            <p>Time: 1.1 minutes</p>

            <button type='button' className='mt-4 px-4 py-2 bg-white text-black rounded hover:scale-105 transition' onClick={restartGame}>
              Try Again
            </button>
          </section>
        </article>
      )}

      <article className='min-h-lvh flex items-center justify-center'>
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
                  {option}
                </button>
              ))}
            </section>
          )}
        </section>
      </article>
    </main>
  )
}

export default PageGame
