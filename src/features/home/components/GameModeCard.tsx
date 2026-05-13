import { useState } from 'react'
import { useStartClassicGame } from '../hooks/useStartClassicGame'
import { GAME_MODES, type GameModes } from '../../../shared/constants/game-modes'
import type { GameCategory } from '../../../shared/constants/game-category'
import { CLASSIC_MODES } from '../../../shared/data/classicGameData'
import { formatMode } from '../../../shared/utilities/formatMode'
import { storage } from '../../../shared/utilities/storage'
import Button from '../../../shared/components/Button'
import SectionHeader from './SectionHeader'
import IconList from '../../../shared/components/icons/IconList'
import IconWriting from '../../../shared/components/icons/IconWriting'
import { dynamicStorageKey } from '../../../shared/utilities/dynamicStorageKey'

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
  const STORAGE_CATEGORY_MODE = 'categoryMode'
  const dynamicKey = dynamicStorageKey({ base: STORAGE_CATEGORY_MODE, dynamic: [category] })
  const [selectedMode, setSelectedMode] = useState<GameModes>(storage.load(dynamicKey) ?? GAME_MODES.MULTIPLE_CHOICE)
  const { startClassicGame } = useStartClassicGame()

  const styles = color

  const handlerStartQuiz = () => {
    storage.save(dynamicKey, selectedMode)
    startClassicGame({ category, mode: selectedMode })
  }

  const selectIcon = (mode: GameModes) => {
    switch (mode) {
      case GAME_MODES.MULTIPLE_CHOICE:
        return <IconList />

      case GAME_MODES.WRITING:
        return <IconWriting />
    }
  }

  return (
    <article className={`flex p-0.5 bg-linear-to-tr ${styles.button} rounded-2xl overflow-hidden`}>
      <article className={`flex flex-col gap-4 justify-between relative rounded-2xl  bg-black/70 backdrop-blur-md p-6 shadow-lg transition-all`}>
        <header className='flex items-center gap-4'>
          <img src={icon.src} alt={icon.alt} className={`p-3 rounded-xl bg-linear-to-r ${styles.button}`} />
          <h3 className='text-2xl font-semibold text-white font-basicaline tracking-wide'>{title}</h3>
        </header>
        <p className='text-sm text-gray-300'>{description}</p>
        <SectionHeader title='How to play' />
        <p className='text-gray-300'>{howToPlay}</p>
        <section className='flex flex-col gap-4'>
          <SectionHeader title='Game Options' />
          <section className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
            {CLASSIC_MODES.map((mode, index) => (
              <Button
                key={index}
                title={formatMode(mode)}
                onClick={() => setSelectedMode(mode)}
                icon={selectIcon(mode)}
                className={`w-full justify-center border ${selectedMode === mode ? `${styles.active} text-white` : 'border-white/20 text-gray-300 hover:bg-white/10'}`}
              />
            ))}
          </section>
        </section>

        <Button title='Start Quiz' onClick={handlerStartQuiz} className={`py-3 rounded-xl text-white font-medium justify-center bg-linear-to-r ${styles.button} hover:opacity-90`} />
      </article>
    </article>
  )
}
