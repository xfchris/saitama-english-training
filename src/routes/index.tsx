import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from '../pages/Admin'
import Index from '../pages/Index'
import { AppProvider } from '../providers/AppProvider'
import { RoutingProps } from '../types/config'

const routes = [
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/admin/works/:idWork',
    element: <Admin />
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
