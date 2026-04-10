import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// CSS
import './styles/global.css'
import './styles/base.css'
import RouterTsx from './Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterTsx />
  </StrictMode>,
)
