import { useState } from 'react'
import { CLASSIC_MODES } from '../../../shared/data/classicGameData'
import SectionHeader from './SectionHeader'
import { useStartClassicGame } from '../hooks/useStartClassicGame'
import type { GameCategory } from '../../../shared/constants/game-category'
import { GAME_MODES, type GameModes } from '../../../shared/constants/game-modes'
import Button from '../../../shared/components/Button'

interface GameModeCardProps {
  title: string
  icon: {
    src: string
    alt: string
  }
  description: string
  howToPlay: string
  category: GameCategory
  color: {
    button: string
    active: string
  }
}

export const GameModeCard = ({ title, description, icon, color, howToPlay, category }: GameModeCardProps) => {
  const [selectedMode, setSelectedMode] = useState<GameModes>(GAME_MODES.MULTIPLE_CHOICE)
  const { startClassicGame } = useStartClassicGame()

  const styles = color

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
            <Button
              title={`${mode === GAME_MODES.MULTIPLE_CHOICE ? 'Multiple Choice' : 'Writing'}`}
              onClick={() => setSelectedMode(mode)}
              className={`w-full justify-center ${selectedMode === mode ? `${styles.active} text-white` : 'border-white/10 text-gray-300 hover:bg-white/10'}`}
            />
          ))}
        </section>
      </section>

      <Button
        title='Start Quiz'
        onClick={() => startClassicGame({ category, mode: selectedMode })}
        className={`py-3 rounded-xl text-white font-medium justify-center bg-linear-to-r ${styles.button} hover:opacity-90`}
      />
    </article>
  )
}
