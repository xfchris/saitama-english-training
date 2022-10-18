import { createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApi } from '../services'
import { Word } from '../types/config'
import { changeLnToBr, getArrayFromCollection } from '../utils/helpers'
import { setGroupHashWords, setOrderTypeEstablished } from './config.slice'

export const getWords = createAsyncThunk('getWords', async (_, { dispatch }) => {
  const response = await firebaseApi('words').getAll()
  const groupWords: string[][] = [[]]
  const result = getArrayFromCollection<Word>(response).map(word => {
    groupWords[0].push(word.id)
    word.englishHtml = changeLnToBr(word.english)
    word.spanishHtml = changeLnToBr(word.spanish)
    return word
  })
  dispatch(setGroupHashWords(groupWords))
  dispatch(setOrderTypeEstablished(0))
  return result
})
