import { useContext } from 'react'
import { GameCountryContext } from '../../context/GameCountryContext'

export const useHookContext = () => {
  return useContext(GameCountryContext)
}
