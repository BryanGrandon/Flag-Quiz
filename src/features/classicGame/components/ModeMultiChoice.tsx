import Button from '../../../shared/components/Button'
import { useMultipleChoice } from '../hooks/useMultipleChoice'
import type { GameImage } from '../types/game-state'
import type { GeneralActions } from '../types/general-actions'
import WrongAnswerFeedback from './WarningTryAgain'

type Props = GeneralActions & {
  image: GameImage | undefined
  options: string[]
}

const MultipleChoiceMode = ({ image, options, gameActions, storageActions, validators }: Props) => {
  const { getButtonStyle, handleOptionSelect, handleTryAgain, isWrongAnswer } = useMultipleChoice({
    gameActions,
    storageActions,
    validators,
  })

  return (
    <>
      <article className='bg-linear-to-r p-0.5 rounded-2xl mx-auto'>
        <section className='grid lg:grid-cols-2 items-center gap-8 bg-gray-900 p-6 rounded-2xl shadow-lg'>
          <picture className='w-80 lg:w-120 h-40 lg:h-70 overflow-hidden rounded-xl mx-auto'>
            {image && <img src={image.svg} alt={image.alt} className='object-cover object-center w-full h-full' />}
          </picture>

          <section>
            <h2 className='text-xl font-semibold mb-4 border-b border-gray-700 pb-2'>Make your guess</h2>

            <section className='flex flex-col gap-4'>
              {options?.map((option, index) => (
                <Button
                  key={option}
                  title={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`border ${getButtonStyle(option)}`}
                  icon={<span className='w-6 h-6 flex items-center justify-center rounded-full border'>{String.fromCharCode(65 + index)}</span>}
                />
              ))}
            </section>
          </section>
        </section>
      </article>

      {isWrongAnswer && <WrongAnswerFeedback onClick={handleTryAgain} />}
    </>
  )
}

export default MultipleChoiceMode
