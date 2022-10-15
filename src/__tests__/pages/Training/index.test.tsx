import { screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { trans } from '../../../config/i18n'
import { memoryDBFirebase } from '../../mocks/FirestoreMemoryMock'
import { renderAppWithRoute } from '../../helpers'
import store from '../../../redux/store'
import { getWords } from '../../../redux/actions'

describe('Training', () => {
  beforeAll(async () => {
    await store.dispatch(getWords())
  })

  it('should render training page', () => {
    renderAppWithRoute('/training')
    expect(screen.getByText(memoryDBFirebase.words[0].data().english)).toBeInTheDocument()
    expect(screen.getByText(trans('button.removeStudiedWords'))).toBeInTheDocument()
  })
})
