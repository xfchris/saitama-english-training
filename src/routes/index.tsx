import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from '../pages/Admin'
import Index from '../pages/Index'
import StartIn from '../pages/Training'
import Login from '../pages/Login'
import Training from '../pages/Training/Training'
import { AppProvider } from '../providers/AppProvider'
import { RoutingProps } from '../types/config'

const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin/words',
    element: <Admin />
  },
  {
    path: '/training',
    element: <StartIn />
  },
  {
    path: '/training/:wordHash',
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
