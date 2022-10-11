import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Word } from '../types/config'
import { getWords } from './actions'
import { RootState } from './store'
import { ConfigTrainType, LangType } from './types'

type InitialStateType = {
  words: Word[]
  configTrain: ConfigTrainType
  lang: LangType
  studiedHashWords: string[]
}

const initialState: InitialStateType = {
  words: [],
  configTrain: {
    studyEnglishToSpanish: true,
    studyRandomMode: false,
    studyAutomatic: false
  },
  lang: 'es',
  studiedHashWords: []
}

const configApp = createSlice({
  name: 'configApp',
  initialState,
  reducers: {
    setLang: (state: InitialStateType, action: PayloadAction<LangType>) => {
      state.lang = action.payload
    },
    setStudyEnglishToSpanish: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.configTrain.studyEnglishToSpanish = action.payload
    },
    setStudyAutomatic: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.configTrain.studyAutomatic = action.payload
    },
    setStudyRandomMode: (state: InitialStateType, action: PayloadAction<boolean>) => {
      state.configTrain.studyRandomMode = action.payload
    },
    addStudiedWord: (state: InitialStateType, action: PayloadAction<string>) => {
      if (!state.studiedHashWords.includes(action.payload)) {
        state.studiedHashWords.push(action.payload)
      }
    },
    setStudiedhashWords: (state: InitialStateType, action: PayloadAction<string[]>) => {
      state.studiedHashWords = action.payload
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

export const { setLang, setStudyEnglishToSpanish, setStudyAutomatic, setStudyRandomMode, addStudiedWord, setStudiedhashWords, resetConfigApp } =
  configApp.actions
export const selectConfigApp = (state: RootState) => state.configApp

export default configApp.reducer
