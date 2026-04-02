import Button from '../../../components/ui/Button'

type game_mode_card = {
  title: string
  howToPlay: string[]
  img: {
    src: string
    alt: string
  }
  routes: string
}

const GameModeCard = ({ title, howToPlay, img, routes }: game_mode_card) => {
  const redirectToGame = () => {
    window.location.href = routes
  }
  return (
    <article className='h-full flex flex-col justify-between p-4 gap-4 border border-gray-500 shadow-gray-700/30 rounded-xl shadow-lg'>
      <section className='flex gap-4 items-center border-b border-primary'>
        <picture className='w-10 h-10'>
          <img src={img.src} alt={img.alt} className='object-cover mb-3' />
        </picture>
        <h3 className='text-2xl font-basicaline'>{title}</h3>
      </section>
      <section className=''>
        <h3 className='text-xl font-basicaline'>How to play</h3>
        <div className='flex flex-col gap-1 text-gray-400'>
          {howToPlay.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
      </section>
      <Button text='Start Quiz' onClick={redirectToGame} moreClasses='bg-secondary hover:bg-secondary/80 text-black w-full' />
    </article>
  )
}

export default GameModeCard
