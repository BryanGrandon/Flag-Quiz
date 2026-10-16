import { useState } from 'react'
import { TYPE_MODES, type GameModes } from '../../../config/games/modes'
import { GAME_CATEGORIES, type GameCategories } from '../../../config/games/categories'
import { dynamicStorageKey } from '../../../shared/utilities/dynamicStorageKey'
import { storage } from '../../../shared/utilities/storage'
import { useNavigate } from 'react-router-dom'

const useStartGame = () => {
  const navigate = useNavigate()

  const countryDynamicKey = dynamicStorageKey({ base: 'mode', dynamic: GAME_CATEGORIES.COUNTRY })
  const capitalDynamicKey = dynamicStorageKey({ base: 'mode', dynamic: GAME_CATEGORIES.CAPITAL })

  const [countrySelectMode, setCountrySelectMode] = useState<GameModes>(
    storage.load(countryDynamicKey) ?? TYPE_MODES.MULTIPLE_CHOICE,
  )
  const [capitalSelectMode, setCapitalSelectMode] = useState<GameModes>(
    storage.load(capitalDynamicKey) ?? TYPE_MODES.MULTIPLE_CHOICE,
  )

  type SetSelectMode = {
    category: GameCategories
    mode: GameModes
  }

  const setSelectMode = ({ category, mode }: SetSelectMode) => {
    switch (category) {
      case GAME_CATEGORIES.CAPITAL:
        setCapitalSelectMode(mode)
        break

      case GAME_CATEGORIES.COUNTRY:
        setCountrySelectMode(mode)
        break
    }
  }

  const getSelectMode = (category: GameCategories) => {
    switch (category) {
      case GAME_CATEGORIES.CAPITAL:
        return capitalSelectMode

      case GAME_CATEGORIES.COUNTRY:
        return countrySelectMode
    }
  }

  const startGame = (category: GameCategories) => {
    switch (category) {
      case GAME_CATEGORIES.CAPITAL: {
        const params = new URLSearchParams({ category, mode: capitalSelectMode })
        storage.save(capitalDynamicKey, capitalSelectMode)
        navigate({ pathname: '/game/classic', search: params.toString() })
        break
      }

      case GAME_CATEGORIES.COUNTRY: {
        const params = new URLSearchParams({ category, mode: countrySelectMode })
        storage.save(countryDynamicKey, countrySelectMode)
        navigate({ pathname: '/game/classic', search: params.toString() })
        break
      }
    }
  }

  return { setSelectMode, getSelectMode, startGame }
}

export default useStartGame
