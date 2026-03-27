import { useState } from 'react'
import GameCard from './components/GameCard'

const PageHome = () => {
  const [guessTheCountry, setGuessTheCountry] = useState('')
  const [guessTheCapital, setGuessTheCapital] = useState('')
  const games = [
    {
      id: 1,
      title: 'Guess the Country',
      description: 'A fun game where players guess the country based on its flag.',
      optionGame: true,
      defaultOption: 'multiple',
      selectOption: (value: string) => setGuessTheCountry(value),
    },
    {
      id: 2,
      title: 'Guess the Capital',
      description: "A challenging game in which players must guess a country's capital based on its flag.",
      optionGame: true,
      defaultOption: 'multiple',
      selectOption: (value: string) => setGuessTheCapital(value),
    },
  ]

  console.log(guessTheCountry, guessTheCapital)
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
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </article>
        </article>
      </main>
    </>
  )
}

export default PageHome
