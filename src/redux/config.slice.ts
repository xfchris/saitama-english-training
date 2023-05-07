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
  groupHashWords: string[][]
  orderTypeEstablished: number
  canSyncWords: boolean
}

const initialState: InitialStateType = {
  words: [],
  configTrain: {
    studyEnglishToSpanish: true,
    studyRandomMode: false,
    studyAutomatic: false,
    velocityStudyAutomatic: 3
  },
  lang: 'es',
  studiedHashWords: [],
  groupHashWords: [],
  orderTypeEstablished: 1,
  canSyncWords: true
}

const configApp = createSlice({
  name: 'configApp',
  initialState,
  reducers: {
    setLang: (state: InitialStateType, action: PayloadAction<LangType>) => {
      state.lang = action.payload
    },
    setOrderTypeEstablished: (state: InitialStateType, action: PayloadAction<number>) => {
      state.orderTypeEstablished = action.payload
    },
    setStudiedhashWords: (state: InitialStateType, action: PayloadAction<string[]>) => {
      state.studiedHashWords = action.payload
    },
    setGroupHashWords: (state: InitialStateType, action: PayloadAction<string[][]>) => {
      state.groupHashWords = action.payload
    },
    setConfigTrain: (state: InitialStateType, action: PayloadAction<Partial<ConfigTrainType>>) => {
      state.configTrain = { ...state.configTrain, ...action.payload }
    },
    addStudiedWord: (state: InitialStateType, action: PayloadAction<string>) => {
      if (!state.studiedHashWords.includes(action.payload)) {
        state.studiedHashWords.push(action.payload)
      }
    },
    setGroupHashWordsByNumberWords: (state: InitialStateType, action: PayloadAction<number>) => {
      let groupIndex = -1
      state.groupHashWords = state.words.reduce((out: string[][], word: Word, index: number) => {
        if (index % action.payload === 0) {
          groupIndex++
        }
        if (!out[groupIndex]) {
          out[groupIndex] = []
        }
        out[groupIndex].push(word.id)
        return out
      }, [])
    },
    resetConfigApp: () => initialState
  },
  extraReducers: builder => {
    builder.addCase(getWords.fulfilled, (state: InitialStateType, action: PayloadAction<Word[]>) => {
      if (action.payload.length) {
        state.words = action.payload
        state.canSyncWords = false
      }
    })
  }
})

export const {
  setLang,
  setConfigTrain,
  addStudiedWord,
  setStudiedhashWords,
  resetConfigApp,
  setGroupHashWords,
  setGroupHashWordsByNumberWords,
  setOrderTypeEstablished
} = configApp.actions

export const selectConfigApp = (state: RootState) => state.configApp

export default configApp.reducer
