import { GAMES } from '../../../config/games/categories'
import Button from '../../../shared/components/Button'
import useStartGame from '../hooks/useStartGame'
import SectionGameCategory from './SectionGameCategory'

const GameCategories = () => {
  const { setSelectMode, getSelectMode, startGame } = useStartGame()

  return (
    <article className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {GAMES.map((el) => (
        <section
          key={el.category}
          className={`flex p-0.5 bg-linear-to-tr ${el.color.default} rounded-2xl overflow-hidden`}
        >
          <article
            className={`flex flex-col gap-4 justify-between relative rounded-2xl  bg-black/70 backdrop-blur-md p-6 shadow-lg transition-all`}
          >
            <header className='flex items-center gap-4'>
              <div className={`p-3 rounded-xl bg-linear-to-r ${el.color.default}`}>
                <el.icon />
              </div>

              <h2 className='text-3xl font-semibold text-white font-basicaline tracking-wide'>{el.title}</h2>
            </header>
            <p>{el.description}</p>
            <SectionGameCategory label='How To Play'>
              <p>{el.howToPlay}</p>
            </SectionGameCategory>

            <SectionGameCategory label='Game Options'>
              <section className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {el.modes.map((mode, index) => (
                  <Button
                    key={index}
                    title={mode.label}
                    onClick={() => setSelectMode({ category: el.category, mode: mode.key })}
                    icon={<mode.icon />}
                    className={`w-full justify-center border ${mode.key === getSelectMode(el.category) ? `${el.color.active} text-white` : 'border-white/20 text-gray-300 hover:bg-white/10'}`}
                  />
                ))}
              </section>
            </SectionGameCategory>

            <Button
              title='Start Quiz'
              onClick={() => {
                startGame(el.category)
              }}
              className={`py-3 rounded-xl text-white font-medium justify-center bg-linear-to-r ${el.color.default} hover:opacity-90`}
            />
          </article>
        </section>
      ))}
    </article>
  )
}

export default GameCategories
