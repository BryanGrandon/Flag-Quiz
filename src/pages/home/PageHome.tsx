import { GAMES } from '../../utilities/constants/game/games'
import GameCardFlip from './components/GameCardFlip'

const PageHome = () => {
  return (
    <>
      <header className='test p-4 max-w-350 mx-auto'>
        <h1 className='font-basicaline text-4xl text-center'>Flag Quiz</h1>
        <p></p>
      </header>
      <main className='test p-4 max-w-350 mx-auto '>
        <article>
          <h2 className='font-basicaline text-3xl py-4'>Game Modes</h2>
          <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
            {GAMES.map((game) => (
              <GameCardFlip key={game.id} theId={game.id} gameKey={game.key} front={game.front} back={game.back} />
            ))}
          </article>
        </article>
      </main>
    </>
  )
}

export default PageHome
