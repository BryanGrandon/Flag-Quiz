import Button from '../../../shared/components/Button'
import IconCup from '../../../shared/components/icons/IconCup'
import IconFire from '../../../shared/components/icons/IconFire'
import IconLeftArrow from '../../../shared/components/icons/IconLeftArrow'
import { formatMode } from '../../../shared/utilities/formatMode'

type ClassicGameHeaderProps = {
  mode: string
  category: string
  streakCurrent: number
  bestCurrent: number
}

const ClassicGameHeader = ({ category, streakCurrent, bestCurrent, mode }: ClassicGameHeaderProps) => {
  return (
    <header className='flex flex-col gap-4 p-4'>
      <nav className='flex items-center justify-between'>
        <Button title={'Back'} onClick={() => window.history.back()} icon={<IconLeftArrow />} />
        <section className='text-center hidden lg:block'>
          <h1 className='text-4xl font-bold font-basicaline'>Guess the {category}</h1>
          <p className='text-gray-400 text-sm'>Look at the flag and choose the correct {category}</p>
        </section>
        <section className='text-sm text-gray-300'>
          Mode: <span className='text-green-400'>{formatMode(mode)}</span>
        </section>
      </nav>
      <section className='flex flex-col gap-4'>
        <section className='text-center lg:hidden'>
          <h1 className='text-4xl font-bold font-basicaline'>Guess the {category}</h1>
          <p className='text-gray-400 text-sm'>Look at the flag and choose the correct {category}</p>
        </section>
        <section className='flex justify-center gap-6 mb-10'>
          <p className='px-6 py-3 rounded-lg border border-green-400/60 bg-green-500/20 flex gap-2'>
            <IconCup color='#05df72' /> Best: <span className='font-bold'>{bestCurrent}</span>
          </p>
          <p className='px-6 py-3 rounded-lg border border-purple-400/60 bg-purple-500/20 flex gap-2'>
            <IconFire color='oklch(71.4% 0.203 305.504)' /> Streak: <span className='font-bold'>{streakCurrent}</span>
          </p>
        </section>
      </section>
    </header>
  )
}

export default ClassicGameHeader
