import { createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApi } from '../services'
import { Word } from '../types/config'
import { changeLnToBr, getArrayFromCollection } from '../utils/helpers'

export const getWords = createAsyncThunk('getWords', async () => {
  const response = await firebaseApi('words').getAll()
  const result = getArrayFromCollection<Word>(response).map(word => {
    word.englishHtml = changeLnToBr(word.english)
    word.spanishHtml = changeLnToBr(word.spanish)
    return word
  })
  return result
})
