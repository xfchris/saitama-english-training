import { screen, waitFor } from '@testing-library/react'
import { describe, it } from 'vitest'
import { trans } from '../config/i18n'
import './mocks/FirestoreMemoryMock'
import { ejecAllMocks, renderAppWithRoute } from './helpers'
import store from '../redux/store'
import { getWords } from '../redux/actions'
import { setGroupHashWordsByNumberWords } from '../redux/config.slice'
ejecAllMocks()

describe('App', () => {
  beforeEach(async () => {
    await store.dispatch(getWords())
    store.dispatch(setGroupHashWordsByNumberWords(10))
    renderAppWithRoute()
  })

  it('should work as expected', () => {
    expect(screen.getByText(trans('label.logoTextBar'))).toBeInTheDocument()
  })

  it('should show total words in memory', async () => {
    await waitFor(() => {
      expect(screen.getByText(`${trans('label.totalWords')} ${3}`)).toBeInTheDocument()
    })
  })
})
