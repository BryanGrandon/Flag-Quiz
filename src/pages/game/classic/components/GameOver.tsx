type GameOverProps = {
  image: {
    svg: string
    alt: string
  }
  answer: string
  currentStreak: number
  onClickReset: () => void
}

export const GameOver = ({ image, answer, currentStreak, onClickReset }: GameOverProps) => {
  return (
    <article className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50' role='dialog' aria-modal='true'>
      <section className='max-w-md flex flex-col gap-4 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-600 text-center'>
        <h2 className='text-3xl font-bold font-basicaline text-red-400'>Game Over</h2>

        {image && (
          <picture className='h-40 w-70 overflow-hidden rounded'>
            <img src={image.svg} alt={image.alt} className='object-cover object-center w-full h-full' />
          </picture>
        )}

        <p className='text-lg'>
          Correct Answer: <span className='block mt-1 text-green-400 font-bold text-xl'>{answer}</span>
        </p>
        <p className='px-4 py-2 border border-gray-500 rounded-lg text-sm'>
          Current Streak: <span className='font-semibold'>{currentStreak}</span>
        </p>
        <button type='button' onClick={onClickReset} className='mt-2 px-4 py-2 bg-white text-black rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer'>
          Try Again
        </button>
      </section>
    </article>
  )
}
