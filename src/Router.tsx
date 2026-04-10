import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'

const TheFallback = (text: string) => {
  return <p>{text}</p>
}

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const PagesHome = await import('./pages/home/PageHome')
          return { Component: PagesHome.default }
        },
        hydrateFallbackElement: TheFallback('Loading Home'),
      },
      {
        path: 'classic-game',
        lazy: async () => {
          const PageGame = await import('./pages/game/PageGame')
          return { Component: PageGame.default }
        },
        hydrateFallbackElement: TheFallback('Loading Game'),
      },
    ],
  },
])

const RouterTsx = () => {
  return <RouterProvider router={router} />
}

export default RouterTsx
