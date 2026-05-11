import { GAME_CONFIG } from '../../shared/data/classicGameData'
import { GameModeCard } from './components/GameModeCard'

const HomePage = () => {
  return (
    <>
      <header className='p-4 max-w-300 mx-auto flex flex-col gap-2 min-h-30 items-center justify-center test'>
        <h1 className='font-basicaline text-4xl'>Flag Quiz</h1>
        <p className=''>Test your knowledge of flags from around the world!</p>
      </header>
      <main className='p-4 max-w-300 mx-auto'>
        <article className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {GAME_CONFIG.map((game) => (
            <GameModeCard key={game.id} title={game.title} howToPlay={game.howToPlay} description={game.description} category={game.category} icon={game.image} color={game.color} />
          ))}
        </article>
      </main>
    </>
  )
}

export default HomePage
