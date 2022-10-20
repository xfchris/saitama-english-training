import { screen, waitFor } from '@testing-library/react'
import { describe, it } from 'vitest'
import { trans } from '../config/i18n'
import './mocks/FirestoreMemoryMock'
import { renderAppWithRoute } from './helpers'

describe('App', () => {
  beforeEach(async () => {
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
