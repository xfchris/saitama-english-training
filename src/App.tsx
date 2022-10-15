import { AppProps } from './types/config'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Routing from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/App.scss'
import { useTranslation } from 'react-i18next'
import SpinnerLogo from './components/SpinnerLogo'
import { talkText } from './utils/helpers'
import { useEffect } from 'react'

function App({ location }: AppProps) {
  const { ready } = useTranslation()

  useEffect(() => {
    talkText('hi', 0.001)
  }, [])

  if (!ready) {
    return <SpinnerLogo />
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routing location={location} />
      </PersistGate>
    </Provider>
  )
}

export default App
