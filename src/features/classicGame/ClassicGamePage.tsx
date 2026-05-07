import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_CATEGORIES } from '../../shared/constants/game-category'
import { isValidOption } from '../../shared/utilities/validators'
import { GAME_CONFIG } from '../../shared/data/classicGameData'
import { GAME_MODES } from '../../shared/constants/game-modes'
import { useClassicGameEngine } from './hooks/useClassicGameEngine'
import { useMultipleChoice } from './hooks/useMultipleChoice'
import ClassicGameHeader from './components/ClassicGameHeader'
import Button from '../../shared/components/Button'
import { useWriting } from './hooks/useWriting'

const ClassicGamePage = () => {
  const [params] = useSearchParams()
  const categoryParam = params.get('category')
  const modeParam = params.get('mode')

  const category = isValidOption(GAME_CATEGORIES, categoryParam) ? categoryParam : null
  const mode = isValidOption(GAME_MODES, modeParam) ? modeParam : null

  const { startClassicGame, classicGame, isLoading, streakManager, checkAnswer, restartGame } = useClassicGameEngine()
  const { getButtonStyle, handleOptionSelect, handleTryAgain, isWrongAnswer } = useMultipleChoice({ winner: classicGame.winner ?? '', checkAnswer, restartGame })
  const { setInputValue, inputWriting, isDisabled, IsWrongAnswerInput, submit, restartInput, getInputStyle } = useWriting({ winner: classicGame.winner ?? '', checkAnswer, restartGame })

  useEffect(() => {
    if (!category || !mode || isLoading) return
    startClassicGame({ category, mode })
  }, [category, mode, isLoading, startClassicGame])

  const style = category === GAME_CONFIG[0].category ? GAME_CONFIG[0].color : GAME_CONFIG[1].color

  return (
    <article className='min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6'>
      <ClassicGameHeader category={category ?? ''} mode={mode ?? ''} streakCurrent={streakManager.current} bestCurrent={streakManager.best} />

      <article className='flex flex-col gap-6'>
        <article className={`bg-linear-to-r ${style.button} p-0.5 rounded-2xl mx-auto`}>
          <article className={`grid lg:grid-cols-2 items-center gap-8 mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg`}>
            <picture className='max-w-100 lg:w-120 max-h-60 lg:h-70 overflow-hidden rounded-lg'>
              {classicGame.image && <img src={classicGame.image.svg} alt={classicGame.image.alt} className='object-cover object-center w-full h-full' />}
            </picture>
            {mode === GAME_MODES.MULTIPLE_CHOICE ? (
              <section>
                <h2 className='text-xl font-semibold mb-4 border-b border-gray-700 pb-2'>Make your guess</h2>
                <section className='flex flex-col gap-4'>
                  {classicGame?.options?.map((option, index) => (
                    <Button
                      title={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`border ${getButtonStyle(option)}`}
                      icon={<span className='w-6 h-6 flex items-center justify-center rounded-full border'>{String.fromCharCode(65 + index)}</span>}
                    />
                  ))}
                </section>
              </section>
            ) : (
              <section className='flex flex-col gap-4'>
                <h2 className='text-xl font-semibold border-b border-gray-700 pb-2'>Write your answer</h2>

                <form
                  className='flex flex-col sm:flex-row gap-4'
                  onSubmit={(e) => {
                    e.preventDefault()
                    submit()
                  }}
                >
                  <input
                    type='text'
                    value={inputWriting}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Type your answer...'
                    autoComplete='off'
                    // className='flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all'
                    className={`flex-1 px-4 py-3 rounded-xl bg-gray-800 border transition-all outline-none focus:ring-green-400 focus:border-transparent ${getInputStyle()}`}
                  />

                  <button
                    type='submit'
                    disabled={isDisabled}
                    className='px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium'
                  >
                    Submit
                  </button>
                </form>

                {/* {showResult && <p className={`text-sm font-medium ${isWrongAnswer ? 'text-red-400' : 'text-green-400'}`}>{isWrongAnswer ? '❌ Wrong answer' : '✅ Correct answer'}</p>} */}
              </section>
            )}
          </article>
        </article>
        {isWrongAnswer && (
          // Create a button to scroll back to the top of the page and start a new round

          <section className=' flex flex-col items-center gap-4'>
            <p className='text-red-400 font-medium'>❌ Wrong answer. Try again!</p>
            <Button title='Try again' onClick={handleTryAgain} className='bg-red-600 hover:bg-red-500 font-semibold' />
          </section>
        )}
        {IsWrongAnswerInput && (
          // Create a button to scroll back to the top of the page and start a new round

          <section className=' flex flex-col items-center gap-4'>
            <p className='text-red-400 font-medium'>❌ Wrong answer. Try again!</p>
            <Button title='Try again' onClick={restartInput} className='bg-red-600 hover:bg-red-500 font-semibold' />
          </section>
        )}
      </article>

      <footer className='text-center mt-12 text-gray-400'>🏅 Can you beat your best score?</footer>
    </article>
  )
}
export default ClassicGamePage
