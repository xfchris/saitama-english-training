import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Word } from '../types/config'
import { getWords } from './actions'
import { RootState } from './store'

type InitialStateType = {
  words: Word[]
}
const initialState: InitialStateType = {
  words: []
}

const configApp = createSlice({
  name: 'configApp',
  initialState,
  reducers: {
    setLanguaje: (state: any, action: PayloadAction<string>) => {
      state.data.viewerConfig.lang = action.payload
    },
    resetConfigApp: () => {
      return initialState
    }
  },
  extraReducers: builder => {
    builder.addCase(getWords.fulfilled, (state: InitialStateType, action: PayloadAction<Word[]>) => {
      state.words = action.payload
    })
  }
})

export const { setLanguaje, resetConfigApp } = configApp.actions
export const selectConfigApp = (state: RootState) => state.configApp

export default configApp.reducer
