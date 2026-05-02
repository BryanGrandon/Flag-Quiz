import { CLASSIC_GAMES } from '../game/classic/data/classic.game'
import GameClassicCard from './components/GameClassicCard'

const PageHome = () => {
  return (
    <>
      <header className='p-4 max-w-350 mx-auto flex flex-col gap-2 min-h-50 items-center justify-center'>
        <h1 className='font-basicaline text-4xl'>Flag Quiz</h1>
        <p className=''>Test your knowledge of flags from around the world!</p>
      </header>
      <main className='test p-4 max-w-350 mx-auto'>
        <article>
          <h2 className='font-basicaline text-3xl py-4'>Game Modes</h2>
          <article className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
            {CLASSIC_GAMES.map((game) => (
              <GameClassicCard key={game.id} id={game.id} questionType={game.questionType} title={game.title} description={game.description} image={game.image} options={game.options} />
            ))}
          </article>
        </article>
      </main>
    </>
  )
}

export default PageHome
