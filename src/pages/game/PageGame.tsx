import useClassicGame from './hooks/useClassicGame'
import { useSearchParams } from 'react-router-dom'
import type { ClassicModes, ClassicType } from './types/classic'
import { useEffect } from 'react'

const PageGame = () => {
  const [params] = useSearchParams()

  const type = params.get('type') as ClassicType | null
  const mode = params.get('mode') as ClassicModes | null

  const { startClassicGame, isReady, gameRound } = useClassicGame()

  useEffect(() => {
    if (!type || !mode) return
    if (!isReady) return
    startClassicGame(type, mode)
  }, [startClassicGame, type, mode, isReady])

  return (
    <main>
      <article>
        <h2>Game</h2>
        <section className='test '>
          <img src={gameRound.image?.svg} alt='' />
          {gameRound.options.length > 0 ? (
            <section>
              {gameRound.options.map((el) => (
                <p>{el}</p>
              ))}
            </section>
          ) : null}
        </section>
      </article>
    </main>
  )
}

export default PageGame
