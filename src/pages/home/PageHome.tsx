import { CLASSIC_GAMES } from '../game/constants/classic'
import GameModeCard from './components/GameModeCard'
import { useStartClassicGame } from './hook/useStartClassicGame'

const PageHome = () => {
  const { startClassicGame } = useStartClassicGame()

  return (
    <>
      <header className='p-4 max-w-350 mx-auto flex flex-col gap-2 min-h-50 items-center justify-center'>
        <h1 className='font-basicaline text-4xl'>Flag Quiz</h1>
        <p className=''>Test your knowledge of flags from around the world!</p>
      </header>
      <main className='test p-4 max-w-350 mx-auto'>
        <article>
          <h2 className='font-basicaline text-3xl py-4'>Game Modes</h2>
          <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
            {/* {CLASSIC_GAMES.map((game) => (
              <GameModeCard key={game.id} type={game.key} title={game.title} howToPlay={game.howToPlay} routes={game.routes} img={game.img} />
            ))} */}
          </article>
        </article>
        <article className='flex flex-col p-4 gap-4'>
          <button onClick={() => startClassicGame({ type: 'country', mode: 'multiple_choice' })}>Country - options</button>
          <button onClick={() => startClassicGame({ type: 'country', mode: 'writing' })}>Country - write</button>
          <button onClick={() => startClassicGame({ type: 'capital', mode: 'multiple_choice' })}>Capital - options</button>
          <button onClick={() => startClassicGame({ type: 'capital', mode: 'writing' })}>Capital - write</button>
        </article>
      </main>
    </>
  )
}

export default PageHome
