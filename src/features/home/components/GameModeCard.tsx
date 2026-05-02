import { useState } from 'react'
import { CLASSIC_MODES } from '../../../shared/data/classicGameData'
import SectionHeader from './SectionHeader'
import { useStartClassicGame } from '../hooks/useStartClassicGame'
import type { GameCategory } from '../../../shared/constants/game-category'
import { GAME_MODES, type GameModes } from '../../../shared/constants/game-modes'

interface GameModeCardProps {
  title: string
  icon: {
    src: string
    alt: string
  }
  description: string
  howToPlay: string
  category: GameCategory
  color: 'blue' | 'purple'
}

export const GameModeCard = ({ title, description, icon, color, howToPlay, category }: GameModeCardProps) => {
  const [selectedMode, setSelectedMode] = useState<GameModes>(GAME_MODES.MULTIPLE_CHOICE)
  const { startClassicGame } = useStartClassicGame()

  const colorStyles = {
    blue: {
      button: 'from-cyan-400 to-blue-500',
      active: 'bg-blue-500/20 border-blue-400',
    },
    purple: {
      button: 'from-purple-500 to-pink-500',
      active: 'bg-purple-500/20 border-purple-400',
    },
  }

  const styles = colorStyles[color]

  return (
    <article className={`flex flex-col gap-4 justify-between relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg transition-all`}>
      <header className='flex items-center gap-4'>
        <img src={icon.src} alt={icon.alt} className={`p-3 rounded-xl bg-linear-to-r ${styles.button}`} />
        <h3 className='text-xl font-semibold text-white'>{title}</h3>
      </header>

      <p className='text-sm text-gray-300'>{description}</p>

      <SectionHeader title='How to play' />

      <p className='text-gray-300'>{howToPlay}</p>

      <section className='flex flex-col gap-4'>
        <SectionHeader title='Game Options' />

        <section className='flex gap-2'>
          {CLASSIC_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`flex-1 px-4 py-2 rounded-lg border text-sm transition cursor-pointer ${selectedMode === mode ? `${styles.active} text-white` : 'border-white/10 text-gray-300 hover:bg-white/10'}`}
            >
              {mode === GAME_MODES.MULTIPLE_CHOICE ? 'Multiple Choice' : 'Writing'}
            </button>
          ))}
        </section>
      </section>

      <button
        onClick={() => startClassicGame({ category, mode: selectedMode })}
        className={`w-full py-3 rounded-xl font-medium text-white bg-linear-to-r ${styles.button} hover:opacity-90 transition cursor-pointer`}
      >
        Start Quiz →
      </button>
    </article>
  )
}
