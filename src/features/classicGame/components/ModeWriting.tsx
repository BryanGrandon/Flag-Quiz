import { useWriting } from '../hooks/useWriting'
import type { GameImage } from '../types/game-state'
import type { GeneralActions } from '../types/general-actions'
import GuessImage from './GuessImage'
import WrongAnswerFeedback from './WarningTryAgain'

type ModeWritingProps = GeneralActions & {
  winner: string
  image: GameImage | undefined
  color: string
}

const ModeWriting = ({ winner, image, validators, gameActions, storageActions, color }: ModeWritingProps) => {
  const { submit, inputWriting, setInputValue, isDisabled, getInputStyle, isWrongAnswerInput, restartInput } = useWriting({
    validators,
    gameActions,
    storageActions,
  })
  return (
    <>
      <article className={`bg-linear-to-r p-0.5 rounded-2xl mx-auto ${color}`}>
        <section className='grid lg:grid-cols-2 items-center gap-8 bg-gray-900 p-6 rounded-2xl shadow-lg'>
          {image && <GuessImage image={{ svg: image.svg, alt: image.alt }} />}

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
                className={`flex-1 px-4 py-3 rounded-xl bg-gray-800 border transition-all outline-none focus:ring-green-400 focus:border-transparent ${getInputStyle()}`}
              />

              <button type='submit' disabled={isDisabled} className='px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium'>
                Submit
              </button>
            </form>
          </section>
        </section>
      </article>

      {isWrongAnswerInput && <WrongAnswerFeedback onClick={restartInput} message={winner} />}
    </>
  )
}

export default ModeWriting
