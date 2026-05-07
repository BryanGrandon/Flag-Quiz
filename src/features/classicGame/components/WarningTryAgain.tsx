import Button from '../../../shared/components/Button'

type WrongAnswerFeedbackProps = {
  onClick: () => void
  message?: string
}

const WrongAnswerFeedback = ({ onClick, message }: WrongAnswerFeedbackProps) => {
  return (
    <>
      <section className=' flex flex-col items-center gap-4' id='tryAgain'>
        <p className='text-red-400 font-medium'>❌ Wrong answer. Try again!</p>
        {message && <p className='text-green-500'>Answer: {message}</p>}
        <Button title='Try again' onClick={onClick} className='bg-red-600 hover:bg-red-500 font-semibold' />
      </section>
    </>
  )
}

export default WrongAnswerFeedback
