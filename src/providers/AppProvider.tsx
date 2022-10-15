import { createContext, useContext, useEffect, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks'
import { AppDispatch } from '../redux/store'
import { ChildrenProps } from '../types/config'
import { Auth, UserCredential, User, signInWithEmailAndPassword, signOut as signOutFirebase } from 'firebase/auth'
import { auth } from '../config/firebase'
import Swal from 'sweetalert2'
import { trans } from '../config/i18n'
import { selectConfigApp, setStudyAutomatic } from '../redux/config.slice'
import { useSelector } from 'react-redux'

interface IAppContext {
  user: User | null | undefined
  auth: Auth
  navigate: NavigateFunction
  dispatch: AppDispatch
  signIn: (email: string, password: string) => Promise<UserCredential | void>
  signOut: () => Promise<void>
  handleAutomaticStudy: () => void
  studyAutomatic: boolean
}
const AppContext = createContext<IAppContext | null>(null)

export function AppProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { studyAutomatic } = useSelector(selectConfigApp).configTrain

  function signIn(email: string, password: string): Promise<UserCredential | void> {
    return signInWithEmailAndPassword(auth, email, password).catch(() => {
      Swal.fire(trans('error.invalidLogin'), undefined, 'error')
    })
  }

  function signOut() {
    return signOutFirebase(auth)
  }

  const handleAutomaticStudy = () => {
    dispatch(setStudyAutomatic(!studyAutomatic))
  }

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged(user => {
      setUser(user)
    })
    return unsubsrcibe
  }, [])

  const providerValue = {
    user,
    navigate,
    dispatch,
    signIn,
    signOut,
    handleAutomaticStudy,
    studyAutomatic,
    auth
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
