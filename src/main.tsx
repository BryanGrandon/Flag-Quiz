import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GameCountryProvider from './context/GameCountryProvider.tsx'

// CSS
import './styles/global.css'
import './styles/base.css'
import RouterTsx from './Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameCountryProvider>
      <RouterTsx />
    </GameCountryProvider>
  </StrictMode>,
)
