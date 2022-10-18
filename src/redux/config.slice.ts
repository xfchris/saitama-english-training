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
}

const initialState: InitialStateType = {
  words: [],
  configTrain: {
    studyEnglishToSpanish: true,
    studyRandomMode: false,
    studyAutomatic: false,
    velocityStudyAutomatic: 1
  },
  lang: 'es',
  studiedHashWords: [],
  groupHashWords: [],
  orderTypeEstablished: 0
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
    setChangeVelocityAutomatic: (state: InitialStateType, action: PayloadAction<number>) => {
      state.configTrain.velocityStudyAutomatic = action.payload
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

export const {
  setLang,
  setStudyEnglishToSpanish,
  setChangeVelocityAutomatic,
  setStudyAutomatic,
  setStudyRandomMode,
  addStudiedWord,
  setStudiedhashWords,
  resetConfigApp,
  setGroupHashWords,
  setGroupHashWordsByNumberWords,
  setOrderTypeEstablished
} = configApp.actions

export const selectConfigApp = (state: RootState) => state.configApp

export default configApp.reducer
