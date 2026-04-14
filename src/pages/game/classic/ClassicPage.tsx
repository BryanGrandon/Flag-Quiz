import useClassicGame from './hooks/useClassicGame'
import { useSearchParams } from 'react-router-dom'
import type { ClassicModes, ClassicType } from './types/classic'
import { useEffect, useState } from 'react'

const PageGame = () => {
  // PageClassicGame
  const [params] = useSearchParams()

  const type = params.get('type') as ClassicType | null
  const mode = params.get('mode') as ClassicModes | null

  const { startClassicGame, isReady, gameRound } = useClassicGame()

  useEffect(() => {
    if (!type || !mode) return
    if (!isReady) return
    startClassicGame(type, mode)
  }, [startClassicGame, type, mode, isReady])

  // Save (round) if reload or F5

  const [activeButton, setActiveButton] = useState('')

  return (
    <main>
      <article className='min-h-lvh test flex items-center justify-center'>
        <article>
          <section className='test flex gap-8 p-8 rounded-xl'>
            <section className='w-120 h-70 overflow-hidden test rounded-lg'>
              <img src={gameRound.image?.svg} alt='' className='object-cover object-center w-full h-full' />
            </section>
            {gameRound.options.length > 0 ? (
              <section className='test flex flex-col justify-evenly'>
                <h2 className='font-basicaline text-xl'>Make your guess</h2>
                {gameRound.options.map((el) => (
                  <button
                    className={`min-w-50 text-center text-lg bg-gray-600 rounded py-2 px-8 cursor-pointer select-none transition ${activeButton == el ? 'bg-primary scale-105' : ''}`}
                    onClick={() => setActiveButton(el)}
                  >
                    {el}
                  </button>
                ))}
              </section>
            ) : null}
          </section>
        </article>
      </article>
    </main>
  )
}

export default PageGame
