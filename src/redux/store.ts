import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import configApp from './config.slice'
import storage from 'redux-persist/lib/storage'
import { PERSIST, persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['configApp']
}

const configAppPersistConfig = {
  key: 'configApp',
  storage,
  blacklist: ['canSyncWords']
}

const rootReducer = combineReducers({
  configApp: persistReducer(configAppPersistConfig, configApp)
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const persistor = persistStore(store)
export default store
