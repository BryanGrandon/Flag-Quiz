import React from 'react'
import type { GameContext } from '../utilities/interfaces/gameContext'

export const GameCountryContext = React.createContext<GameContext>({} as GameContext)
