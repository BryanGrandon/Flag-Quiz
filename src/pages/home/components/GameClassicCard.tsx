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
      <section className='flex gap-4 items-center'>
        <picture className='w-10 h-10 test bg-red-700 rounded-xl p-1'>
          <img src={image.src} alt={image.alt} className='object-cover mb-3 w-full h-full' />
        </picture>
        <h3 className='text-2xl font-basicaline'>{title}</h3>
      </section>
      <section className='flex flex-col gap-2 h-full'>
        <div className='flex gap-2 items-center'>
          <h3 className='text-xl font-basicaline min-w-fit'>How to play</h3>
          <span className='h-px rounded-xl w-full bg-gray-400 my-2'></span>
        </div>
        <div className='flex flex-col gap-1 text-gray-400'>
          {description.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>

        {options.length > 0 ? (
          <>
            <section className=' space-y-2'>
              <div className='flex gap-2 items-center'>
                <h3 className='text-xl font-basicaline min-w-fit'>Game Options</h3>
                <span className='h-px rounded-xl w-full bg-gray-400 my-2'></span>
              </div>
              <section className='flex flex-row gap-2 '>
                {options.map((option) => (
                  <SelectButton key={option.id} text={option.label} checked={activeMode} value={option.value} onClick={() => setActiveMode(option.value)} />
                ))}
              </section>
            </section>
          </>
        ) : null}
      </section>
      <Button text='Start Quiz' onClick={() => startClassicGame({ type: questionType, mode: activeMode })} moreClasses='bg-secondary hover:bg-secondary/80 text-black w-full' />
    </article>
  )
}

export default GameClassicCard
