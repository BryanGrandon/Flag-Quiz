import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GameCountryProvider from './context/GameCountryProvider.tsx'

// CSS
import './styles/global.css'
import './styles/base.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameCountryProvider>
      <App />
    </GameCountryProvider>
  </StrictMode>,
)
