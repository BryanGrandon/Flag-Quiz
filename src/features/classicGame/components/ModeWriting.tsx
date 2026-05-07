import { useWriting } from '../hooks/useWriting'
import WrongAnswerFeedback from './WarningTryAgain'

type Props = {
  winner: string
  checkAnswer: ({ value }: { value: string }) => void
  restartGame: () => void
  image:
    | {
        svg: string
        png: string
        alt: string
      }
    | undefined
}

const ModeWriting = ({ winner, checkAnswer, restartGame, image }: Props) => {
  console.log(winner)
  const { submit, inputWriting, setInputValue, isDisabled, getInputStyle, isWrongAnswerInput, restartInput } = useWriting({ winner: winner ?? '', checkAnswer, restartGame })
  return (
    <>
      <article className='bg-linear-to-r p-0.5 rounded-2xl mx-auto'>
        <section className='grid lg:grid-cols-2 items-center gap-8 bg-gray-900 p-6 rounded-2xl shadow-lg'>
          <picture className='max-w-100 lg:w-120 max-h-60 lg:h-70 overflow-hidden rounded-xl mx-auto'>
            {image && <img src={image.svg} alt={image.alt} className='object-cover object-center w-full h-full' />}
          </picture>

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
