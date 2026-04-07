import { useEffect, useState } from 'react'
import { GameCountryContext } from './GameCountryContext'
// import { GAME_MODES } from '../utilities/constants/game/gameModes'
import { GAME_MODES, GAME_TYPE, KEY_GAMES } from '../utilities/constants/game/games'
import { fetchData } from '../services/api/fetchData'
import { ALL_FLAGS_URL } from '../utilities/constants/config/api'
import type { Country } from '../utilities/interfaces/games'
import type { GameMode, GameType, ImageOfTheFlag } from '../utilities/interfaces/gameContext'

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

  // ===== Country and Country Game Logic ===== //

  const [winningValue, setWinningValue] = useState<string>('')
  const [options, setOptions] = useState<string[]>([])
  const [imageOfTheFlag, setImageOfTheFlag] = useState<ImageOfTheFlag>()

  const getValue = (item: Country, type: GameType) => {
    return type === GAME_TYPE.COUNTRY ? item.name.common : item.capital[0]
  }

  const selectWinner = (type: GameType) => {
    const randomItem = remainingFlags[Math.floor(Math.random() * remainingFlags.length)]
    const winner = getValue(randomItem, type)
    setImageOfTheFlag({
      png: randomItem.flags.png,
      svg: randomItem.flags.svg,
      alt: randomItem.flags.alt,
    })
    setWinningValue(winner)
    setRemainingFlags((prev) => prev.filter((item: Country) => getValue(item, type) !== winner))
    console.log(remainingFlags.length, allFlags.length) // Delete this after testing)
    return winner
  }

  const generateOption = (winner: string, type: GameType) => {
    const limit = 4
    const optionsSet = new Set<string>()
    optionsSet.add(winner)
    while (optionsSet.size < limit) {
      const randomItem = allFlags[Math.floor(Math.random() * allFlags.length)]
      const value = getValue(randomItem, type)
      if (!optionsSet.has(value) && value !== undefined) optionsSet.add(value)
    }
    return Array.from(optionsSet).sort(() => Math.random() - 0.5) // Shuffle options
  }

  const startMultipleChoiceGame = (type: GameType) => {
    const winner = selectWinner(type)
    const multipleOptions = generateOption(winner, type)
    setOptions(multipleOptions)
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXX Delete XXXXXXXXXXXXXXXXXXXXXXXXXXXX //
    console.log(multipleOptions)
    console.log(imageOfTheFlag)
    console.log(winningValue)
    console.log(options)
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXX Delete XXXXXXXXXXXXXXXXXXXXXXXXXXXX //
  }

  const startWrittenGame = (type: GameType) => {
    selectWinner(type)
  }

  const startGamesModes = {
    multipleChoice: (type: GameType) => startMultipleChoiceGame(type),
    writing: (type: GameType) => startWrittenGame(type),
  }

  // ===== Score Tracking Logic ===== //

  // For Country - For Capital // - Time (102 seconds / 1:42 minutes) / points (50pts for correct) / Title game (Quiz Country) /  mode (Multiple Choice or writing answer) / Title ( 🏆 High Score && 🕛 Last Game )

  // ===== Options for Guess Country and Guess Capital game modes ===== //

  const [selectedGameOptionCountry, setSelectedGameOptionCountry] = useState<GameMode>(GAME_MODES.MULTIPLE_CHOICE)
  const [selectedGameOptionCapital, setSelectedGameOptionCapital] = useState<GameMode>(GAME_MODES.MULTIPLE_CHOICE)

  const setGameOption = ({ type, value }: { type: GameType; value: GameMode }) => {
    if (type === KEY_GAMES.COUNTRY) setSelectedGameOptionCountry(value)
    else if (type === KEY_GAMES.CAPITAL) setSelectedGameOptionCapital(value)
  }

  const getGameOption = ({ type }: { type: GameType }) => {
    if (type === KEY_GAMES.COUNTRY) return selectedGameOptionCountry
    else if (type === KEY_GAMES.CAPITAL) return selectedGameOptionCapital
    throw new Error('Invalid game type')
  }

  return (
    <GameCountryContext.Provider
      value={{
        options: {
          set: {
            GameOption: setGameOption,
          },
          get: {
            GameOption: getGameOption,
          },
        },
        gameMode: startGamesModes,
      }}
    >
      {children}
    </GameCountryContext.Provider>
  )
}

export default GameCountryProvider
