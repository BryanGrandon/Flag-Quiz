import { useState } from 'react'

type game_card = {
  title: string
  description: string
  optionGame: boolean
  defaultOption?: string
  selectOption: (value: string) => void
}

const GameCard = ({ title, description, optionGame, defaultOption, selectOption }: game_card) => {
  const [activeOption, setActiveOption] = useState(defaultOption)
  const buttonsGameOptions = [
    {
      id: 1,
      text: 'Multiple choice mode',
      value: 'multiple',
    },
    {
      id: 2,
      text: 'Write answer mode',
      value: 'write',
    },
  ]

  const clickOption = (value: string) => {
    selectOption(value)
    setActiveOption(value)
  }

  return (
    <section className='rounded-xl p-6 shadow-lg w-full test'>
      <h3 className='text-2xl font-bold mb-3'>{title}</h3>
      <p className='text-gray-400 mb-4'>{description}</p>
      {optionGame ? (
        <section className='mb-6 space-y-2'>
          <h3>Game Options</h3>
          <section className='pl-4'>
            {buttonsGameOptions.map((option) => (
              <button key={option.id} className='flex items-center gap-2 p-1 cursor-pointer' onClick={() => clickOption(option.value)}>
                <span className={`w-2 h-2 rounded-full ${option.value == activeOption ? 'bg-blue-500' : 'bg-gray-500'}`}></span>
                {option.text}
              </button>
            ))}
          </section>
        </section>
      ) : null}
      <section className='grid grid-cols-2 gap-3'>
        <button className='border border-gray-600 py-2 rounded-lg hover:bg-gray-700 transition'>How to Play</button>
        <button className='bg-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-500 transition'>Start Quiz</button>
      </section>
    </section>
  )
}

export default GameCard
