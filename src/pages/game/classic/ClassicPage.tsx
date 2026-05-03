import useClassicGame from './hooks/useClassicGame'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { CLASSIC_MODE } from './constants/modes'
import { QUESTION_TYPES } from './constants/question-type'
import { isValidOption } from '../../../shared/utilities/validators'
import { GameOver } from './components/GameOver'

const PageGame = () => {
  const [params] = useSearchParams()
  const typeParam = params.get('category')
  const modeParam = params.get('mode')
  const type = isValidOption(QUESTION_TYPES, typeParam) ? typeParam : null
  const mode = isValidOption(CLASSIC_MODE, modeParam) ? modeParam : null
  const { startClassicGame, isReady, gameRound, checkAnswer, isGameOver, restartGame, streak, correctAnswer } = useClassicGame()

  useEffect(() => {
    if (!type || !mode || !isReady) return
    startClassicGame({ type, mode })
  }, [type, mode, isReady, startClassicGame])

  return (
    <>
      {isGameOver && (
        <>
          <GameOver image={gameRound.image} answer={correctAnswer} currentStreak={streak.current} onClickReset={restartGame} />
        </>
      )}
      <main className='min-h-screen flex flex-col gap-10'>
        <header className='p-4 flex flex-col gap-4 backdrop-blur-sm overlay border-b border-gray-700 bg-[url("https://static.vecteezy.com/system/resources/previews/030/470/821/non_2x/colorful-flags-of-the-world-background-from-many-flags-of-the-world-ai-generated-photo.jpg")]'>
          <section className='flex items-center justify-between relative'>
            <button onClick={() => window.history.back()} className='px-3 py-1 text-sm border border-gray-500 rounded-md hover:bg-gray-800 transition cursor-pointer'>
              ← Back
            </button>
            <span className='text-sm text-gray-400'>Mode: {type}</span>
          </section>

          <h2 className='text-3xl md:text-4xl font-bold text-center font-basicaline relative'>Guess the {type}</h2>

          <section className='flex gap-6 justify-center relative'>
            <p className='px-4 py-2 border border-gray-500 rounded-lg text-sm min-w-30 text-center bg-gray-900/60'>
              Best: <span className='font-semibold'>{streak.best}</span>
            </p>
            <p className='px-4 py-2 border border-gray-500 rounded-lg text-sm min-w-30 text-center bg-gray-900/60'>
              Streak: <span className='font-semibold'>{streak.current}</span>
            </p>
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
