import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

const initialState = {}

const configApp = createSlice({
  name: 'configApp',
  initialState,
  reducers: {
    setLanguaje: (state: any, action: PayloadAction<string>) => {
      state.data.viewerConfig.lang = action.payload
    },
    resetConfigApp: () => {
      localStorage.clear()
      return initialState
    }
  }
  /*extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state: any, action: any) => {
        state.data = action.payload
        localStorage.setItem('token', state.data.token as string)
        state.status = 'idle'
        state.error = null
      })
  }*/
})

export const { setLanguaje, resetConfigApp } = configApp.actions
export const selectConfigApp = (state: RootState) => state.configApp

export default configApp.reducer
