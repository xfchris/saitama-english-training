import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from '../pages/Admin'
import Index from '../pages/Index'
import Training from '../pages/Training'
import { AppProvider } from '../providers/AppProvider'
import { RoutingProps } from '../types/config'

const routes = [
  {
    path: '/login',
    element: <Admin />
  },
  {
    path: '/admin/words',
    element: <Admin />
  },
  {
    path: '/admin/word',
    element: <Admin />
  },
  {
    path: '/admin/words/:idWork',
    element: <Admin />
  },
  {
    path: '/words',
    element: <Admin />
  },
  {
    path: '/training',
    element: <Training />
  },
  {
    path: '*',
    element: <Index />
  }
]

export default function Routing({ location }: RoutingProps) {
  return (
    <BrowserRouter>
      <Routes location={location}>
        {routes.map(({ path, element }, i) => (
          <Route key={i} path={path} element={<AppProvider>{element}</AppProvider>} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
