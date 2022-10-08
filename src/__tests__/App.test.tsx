import { screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { trans } from '../config/i18n'
import { renderAppWithRoute } from './helpers'

describe('App', () => {
  it('should work as expected', () => {
    renderAppWithRoute()
    expect(screen.getByText(trans('label.logoTextBar'))).toBeInTheDocument()
  })
})
