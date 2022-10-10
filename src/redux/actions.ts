import { createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApi } from '../services'
import { Word } from '../types/config'

export const getWords = createAsyncThunk('getWords', async () => {
  const response = await firebaseApi('words').getAll<Word>()
  return response
})
