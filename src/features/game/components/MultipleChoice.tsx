import Button from '../../../shared/components/Button'

type MultipleChoiceProps = {
  options: string[]
  handlerOptions: (option: string) => void
  styleButtons: (option: string) => string
}

const MultipleChoice = ({ options, handlerOptions, styleButtons }: MultipleChoiceProps) => {
  return (
    <section className='flex flex-col gap-6 w-full max-w-md'>
      <h2 className='text-xl font-semibold  border-b border-gray-700 pb-2'>Make your guess</h2>

      <div className='flex w-full flex-col gap-3 sm:gap-4'>
        {options.map((option, index) => (
          <Button
            key={option}
            title={option}
            onClick={() => handlerOptions(option)}
            className={`w-full border transition-all  ${styleButtons(option)}`}
            icon={
              <span className='flex size-7 shrink-0 items-center justify-center rounded-full border border-current/30 text-sm font-semibold'>
                {String.fromCharCode(65 + index)}
              </span>
            }
          />
        ))}
      </div>
    </section>
  )
}

export default MultipleChoice
