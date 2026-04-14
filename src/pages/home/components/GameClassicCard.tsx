import { useState } from 'react'
import SelectButton from './SelectButton'
import Button from '../../../components/ui/Button'
import { useStartClassicGame } from '../hook/useStartClassicGame'
import type { ClassicGame } from '../../game/classic/types/game'
import { CLASSIC_MODE, type ClassicMode } from '../../game/classic/constants/modes'

const GameClassicCard = ({ title, description, image, questionType, options }: ClassicGame) => {
  const [activeMode, setActiveMode] = useState<ClassicMode>(CLASSIC_MODE.MULTIPLE_CHOICE)
  const { startClassicGame } = useStartClassicGame()

  return (
    <article className='flex flex-col p-4 gap-4 border border-gray-500 shadow-gray-700/30 rounded-xl shadow-lg'>
      <section className='flex gap-4 items-center border-b border-primary'>
        <picture className='w-10 h-10'>
          <img src={image.src} alt='SS' className='object-cover mb-3' />
        </picture>
        <h3 className='text-2xl font-basicaline'>{title}</h3>
      </section>
      <section className='flex flex-col gap-2 h-full'>
        <h3 className='text-xl font-basicaline'>How to play</h3>
        <div className='flex flex-col gap-1 text-gray-400'>
          {description.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
        <span className='h-px rounded-xl w-full bg-gray-400 my-2'></span>
        {options.length > 0 ? (
          <>
            <section className=' space-y-2'>
              <h3 className='text-xl font-basicaline'>Game Options</h3>
              <section className='flex flex-row gap-2 '>
                {options.map((option) => (
                  <SelectButton key={option.id} text={option.label} checked={activeMode} value={option.value} onClick={() => setActiveMode(option.value)} />
                ))}
              </section>
            </section>
            <span className='h-px rounded-xl w-full bg-gray-400 my-2'></span>
          </>
        ) : null}
      </section>
      <Button text='Start Quiz' onClick={() => startClassicGame({ type: questionType, mode: activeMode })} moreClasses='bg-secondary hover:bg-secondary/80 text-black w-full' />
    </article>
  )
}

export default GameClassicCard
