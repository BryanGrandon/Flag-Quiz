import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import Games from './layout/Games'

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
          const PagesHome = await import('./features/home/HomePage')
          return { Component: PagesHome.default }
        },
        hydrateFallbackElement: TheFallback('Loading Home'),
      },
      {
        path: 'game',
        element: <Games />,
        children: [
          {
            path: 'classic',
            lazy: async () => {
              const Classic = await import('./pages/game/classic/ClassicPage')
              return { Component: Classic.default }
            },
            hydrateFallbackElement: TheFallback('Loading Game'),
          },
          {
            path: 'comparison',
            lazy: async () => {
              const Classic = await import('./pages/game/comparison/ComparisonPage')
              return { Component: Classic.default }
            },
            hydrateFallbackElement: TheFallback('Loading Game'),
          },
        ],
      },
    ],
  },
])

const RouterTsx = () => {
  return <RouterProvider router={router} />
}

export default RouterTsx
