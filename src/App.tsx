import { AppProps } from './types/config'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Routing from './routes'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/scss/App.scss'

function App({ location }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routing location={location} />
      </PersistGate>
    </Provider>
  )
}

export default App
