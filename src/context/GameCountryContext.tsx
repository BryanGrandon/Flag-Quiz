import React from 'react'
import type { game_country_type } from '../utilities/interfaces/games'

export const GameCountryContext = React.createContext<game_country_type>({} as game_country_type)
