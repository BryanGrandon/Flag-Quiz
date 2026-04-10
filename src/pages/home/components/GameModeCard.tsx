import Button from '../../../components/ui/Button'
// import { useHookContext } from '../../../utilities/hooks/useHookContext'
// import type { GameType } from '../../../utilities/interfaces/gameContext'
// import SelectButton from './SelectButton'

type game_mode_card = {
  title: string
  howToPlay: string[]
  type: string
  img: {
    src: string
    alt: string
  }
  routes: string
}

const GameModeCard = ({ title, howToPlay, img, routes }: game_mode_card) => {
  // const { options } = useHookContext()

  // const optionSelected = type as GameType
  // const isGameType = Object.values(GAME_TYPE).includes(type as GameType)
  // const activeOption = isGameType ? options.get.GameOption({ type: optionSelected }) : GAME_MODES.MULTIPLE_CHOICE

  const redirectToGame = () => {
    window.location.href = routes
  }

  return (
    <article className='flex flex-col p-4 gap-4 border border-gray-500 shadow-gray-700/30 rounded-xl shadow-lg'>
      <section className='flex gap-4 items-center border-b border-primary'>
        <picture className='w-10 h-10'>
          <img src={img.src} alt={img.alt} className='object-cover mb-3' />
        </picture>
        <h3 className='text-2xl font-basicaline'>{title}</h3>
      </section>
      <section className='flex flex-col gap-2 h-full'>
        <h3 className='text-xl font-basicaline'>How to play</h3>
        <div className='flex flex-col gap-1 text-gray-400'>
          {howToPlay.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
        <span className='h-px rounded-xl w-full bg-gray-400 my-2'></span>
        {/* {isGameType ? (
          <>
            <section className=' space-y-2'>
              <h3 className='text-xl font-basicaline'>Game Options</h3>
              <section className='flex flex-row gap-2 '>
                {GAME_MODE_OPTI.map((option) => (
                  <SelectButton key={option.id} text={option.text} checked={activeOption} value={option.value} onClick={() => options.set.GameOption({ type: optionSelected, value: option.value })} />
                ))}
              </section>
            </section>
            <span className='h-px rounded-xl w-full bg-gray-400 my-2'></span>
          </>
        ) : null} */}
      </section>
      <Button text='Start Quiz' onClick={redirectToGame} moreClasses='bg-secondary hover:bg-secondary/80 text-black w-full' />
    </article>
  )
}

export default GameModeCard
