import { act, fireEvent, screen, waitFor } from '@testing-library/react'
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

  it('should send add words to redux', async () => {
    expect(screen.getByText(`${trans('label.totalWords')} 0`)).toBeInTheDocument()
    act(() => {
      const button = screen.getByText(trans('label.updateWords'))
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
    await waitFor(() => {
      expect(screen.getByText(`${trans('label.totalWords')} ${3}`)).toBeInTheDocument()
    })
  })
})
