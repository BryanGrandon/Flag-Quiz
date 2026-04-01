import Button from '../../components/ui/Button'
import { GAMES } from '../../utilities/constants/game/games'
// import GameCardFlip from './components/GameCardFlip'

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
          <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
            {GAMES.map((game) => (
              <article className='h-full flex flex-col justify-between test'>
                <section className='flex gap-4 test items-center'>
                  <picture className='w-10 h-10'>
                    <img src={'https://cdn.pixabay.com/photo/2024/02/03/02/16/paperclip07-earth-8549451_640.png'} alt={game.front.title} className='object-cover mb-3' />
                  </picture>
                  <h3>{game.front.title}</h3>
                </section>
                <section>
                  <h3>How to play</h3>
                  <div>
                    <p>{game.back.description[0]}</p>
                    <p>{game.back.description[1]}</p>
                  </div>
                </section>
                <Button text='Start Quiz' onClick={() => {}} moreClasses='bg-blue-500 hover:bg-blue-600 text-white w-full' />
              </article>
            ))}
          </article>
        </article>
        <article>
          <h2 className='font-basicaline text-3xl py-4'>Streak</h2>
        </article>
      </main>
    </>
  )
}

export default PageHome
