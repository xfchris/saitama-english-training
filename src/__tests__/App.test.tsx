import { screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { renderAppWithRoute } from './helpers'

describe('App', () => {
  it('should work as expected', () => {
    renderAppWithRoute('/admin')
    expect(screen.getByText('Admin pages')).toBeInTheDocument()
  })
})
