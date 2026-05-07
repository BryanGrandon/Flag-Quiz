import Button from '../../../shared/components/Button'

type ClassicGameHeaderProps = {
  mode: string
  category: string
  streakCurrent: number
  bestCurrent: number
}

const ClassicGameHeader = ({ category, streakCurrent, bestCurrent, mode }: ClassicGameHeaderProps) => {
  return (
    <header>
      <nav className='flex items-center justify-between mb-8'>
        <Button title={'← Back'} onClick={() => window.history.back()} />

        <section className='text-center'>
          <h1 className='text-3xl font-bold'>Guess the {category}</h1>
          <p className='text-gray-400 text-sm'>Look at the flag and choose the correct {category}</p>
        </section>
        <section className='text-sm text-gray-300'>
          Mode: <span className='text-green-400'>{mode}</span>
        </section>
      </nav>
      <section className='flex justify-center gap-6 mb-10'>
        <p className='px-6 py-3 rounded-lg border border-green-400/60 bg-green-500/20'>
          🏆 Best: <span className='font-bold'>{bestCurrent}</span>
        </p>
        <p className='px-6 py-3 rounded-lg border border-purple-400/60 bg-purple-500/20'>
          🔥 Streak: <span className='font-bold'>{streakCurrent}</span>
        </p>
      </section>
    </header>
  )
}

export default ClassicGameHeader
