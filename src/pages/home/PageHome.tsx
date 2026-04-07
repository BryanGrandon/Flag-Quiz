import { GAMES } from '../../utilities/constants/game/games'
import { useHookContext } from '../../utilities/hooks/useHookContext'
import GameModeCard from './components/GameModeCard'

const PageHome = () => {
  const { gameMode } = useHookContext()

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
            {GAMES.map((game) => (
              <GameModeCard title={game.title} howToPlay={game.howToPlay} routes={game.routes} img={game.img} />
            ))}
          </article>
        </article>
        <article>
          <h2 className='font-basicaline text-3xl py-4'>Streak</h2>
          <section className='flex flex-col gap-4'>
            <button onClick={() => gameMode.multipleChoice('country')}>Click Test Country</button>
            <button onClick={() => gameMode.multipleChoice('capital')}>Click Test Capital</button>
          </section>
        </article>
      </main>
    </>
  )
}

export default PageHome
