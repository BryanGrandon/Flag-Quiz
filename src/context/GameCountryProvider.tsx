import { useEffect, useState } from 'react'
import { GameCountryContext } from './GameCountryContext'
// import { GAME_MODES } from '../utilities/constants/game/gameModes'
// import { KEY_GAMES } from '../utilities/constants/game/games'
import { fetchData } from '../services/api/fetchData'
import { ALL_FLAGS_URL } from '../utilities/constants/config/api'
import type { Country } from '../utilities/interfaces/games'

const GameCountryProvider = ({ children }: { children: React.ReactNode }) => {
  const [allFlags, setAllFlags] = useState<Country[]>([])
  const [remainingFlags, setRemainingFlags] = useState<Country[]>([])
  // const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null) // Change UI based on correct or wrong answer

  useEffect(() => {
    const getAllCountries = async () => {
      const data = await fetchData(ALL_FLAGS_URL)
      setAllFlags(data)
      setRemainingFlags(data)
    }

    getAllCountries()
  }, [])

  // ===== Country Game Logic ===== // Delete Country and Capital for create one for both of use games

  const [winningCountryName, setWinningCountryName] = useState<string>('')
  const [countryOptions, setCountryOptions] = useState<string[]>([])

  const selectWinnerCountry = () => {
    const winner = remainingFlags[Math.floor(Math.random() * remainingFlags.length)]?.name?.common
    const filter = remainingFlags.filter((country: Country) => country.name.common !== winner)
    setWinningCountryName(winner)
    setRemainingFlags(filter)
    console.log(remainingFlags.length, allFlags.length) // Delete this after testing)
    return winner
  }

  // Start Multiple Choice Country Game
  const startMultipleChoiceCountryGame = () => {
    const winner = selectWinnerCountry()
    const limit = 4
    const options: string[] = []
    options.push(winner)

    while (options.length < limit) {
      const randomCountry = allFlags[Math.floor(Math.random() * allFlags.length)]?.name?.common
      if (!options.includes(randomCountry) && randomCountry !== undefined) options.push(randomCountry)
    }
    options.sort(() => Math.random() - 0.5) // Shuffle options
    setCountryOptions(options)
    console.log(options) // Delete this after testing
  }

  // Start Writing Answer Country Game
  const startWrittenCountryGame = () => {
    selectWinnerCountry()
  }

  const startCountryModesModes = {
    multipleChoice: startMultipleChoiceCountryGame,
    writing: startWrittenCountryGame,
  }

  // ===== Capital Game Logic ===== //

  const [winningCapitalName, setWinningCapitalName] = useState<string>('')
  const [capitalOptions, setCapitalOptions] = useState<string[]>([])

  const selectWinnerCapital = () => {
    const winner = remainingFlags[Math.floor(Math.random() * remainingFlags.length)]?.capital[0]
    const filter = remainingFlags.filter((capital: Country) => capital.capital[0] !== winner)
    setWinningCapitalName(winner)
    setRemainingFlags(filter)
    console.log(remainingFlags.length, allFlags.length) // Delete this after testing)
    console.log(winner)
    return winner
  }

  // Start Multiple Choice Capital Game
  const startMultipleChoiceCapitalGame = () => {
    const winner = selectWinnerCapital()
    const limit = 4
    const options: string[] = []
    options.push(winner)

    while (options.length < limit) {
      const randomCapital = allFlags[Math.floor(Math.random() * allFlags.length)]?.capital[0]
      if (!options.includes(randomCapital) && randomCapital !== undefined) options.push(randomCapital)
    }
    options.sort(() => Math.random() - 0.5) // Shuffle options
    setCapitalOptions(options)
    console.log(options) // Delete this after testing
  }
  // Start Writing Answer Capital Game
  const startWrittenCapitalGame = () => {
    selectWinnerCapital()
  }

  const startCapitalModesModes = {
    multipleChoice: startMultipleChoiceCapitalGame,
    writing: startWrittenCapitalGame,
  }

  // ===== Score Tracking Logic =====

  // For Country - For Capital // - Time (102 seconds / 1:42 minutes) / points (50pts for correct) / Title game (Quiz Country) /  mode (Multiple Choice or writing answer) / Title ( 🏆 High Score && 🕛 Last Game )

  // ===== Options for Guess Country and Guess Capital game modes =====
  // const [guessCountry, setGuessCountry] = useState(GAME_MODES.MULTIPLE)
  // const [guessCapital, setGuessCapital] = useState(GAME_MODES.MULTIPLE)

  // const updateGameOption = ({ key, value }: { key: string; value: string }) => {
  //   if (key === KEY_GAMES.COUNTRY) setGuessCountry(value)
  //   else if (key === KEY_GAMES.CAPITAL) setGuessCapital(value)
  // }

  return (
    <GameCountryContext.Provider
      value={{
        options: {
          game: {
            countryGame: startCountryModesModes,
            capitalGame: startCapitalModesModes,
          },
        },
      }}
    >
      {children}
    </GameCountryContext.Provider>
  )
}

export default GameCountryProvider
