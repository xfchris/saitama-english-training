import { createContext, useContext } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { AppDispatch } from '../redux/store'
import { ChildrenProps } from '../types/config'

interface IAppContext {
  navigate: NavigateFunction
  dispatch: AppDispatch
}
const AppContext = createContext<IAppContext | null>(null)

export function AppProvider({ children }: ChildrenProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const providerValue = {
    navigate,
    dispatch
  }
  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
}

export function useApp(): IAppContext {
  const state = useContext(AppContext)
  if (!state) {
    throw new Error('useApp must be used within AppProvider')
  }
  return state
}
