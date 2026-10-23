type WritingProps = {
  writingOptions: {
    handlerInput: (value: string) => void
    value: string
    style: () => string
    submit: () => void
    isWrongAnswer: boolean
    answer: string
  }
  isAnswerLocked: React.RefObject<boolean>
}

const Writing = ({ writingOptions, isAnswerLocked }: WritingProps) => {
  const { submit, value, handlerInput, style, answer, isWrongAnswer } = writingOptions
  console.log(isAnswerLocked.current)
  return (
    <section className='flex flex-col gap-6 w-full max-w-md'>
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
          value={value}
          onChange={(e) => handlerInput(e.target.value)}
          placeholder='Type your answer...'
          autoComplete='off'
          className={`flex-1 px-4 py-3 rounded-xl bg-gray-800 border transition-all outline-none focus:ring-green-400 focus:border-transparent ${style()}`}
        />

        <button
          type='submit'
          disabled={isAnswerLocked.current}
          className='px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium'
        >
          Submit
        </button>
      </form>

      {isWrongAnswer && (
        <p className='mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400'>
          Incorrect answer. The correct answer is: <span className='font-semibold text-green-400'>{answer}</span>
        </p>
      )}
    </section>
  )
}

export default Writing
