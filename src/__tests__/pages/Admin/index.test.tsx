import { screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { memoryDBFirebase } from '../../mocks/FirestoreMemoryMock'
import { renderAppWithRoute } from '../../helpers'
import { trans } from '../../../config/i18n'
import { getWords } from '../../../redux/actions'
import store from '../../../redux/store'

describe('App', () => {
  beforeAll(async () => {
    await store.dispatch(getWords())
  })

  it('should work as expected', () => {
    renderAppWithRoute('/admin/words')
    expect(screen.getByText(memoryDBFirebase.words[0].data().english)).toBeInTheDocument()
    expect(screen.getByText(trans('label.wordsManage'))).toBeInTheDocument()
  })
})
