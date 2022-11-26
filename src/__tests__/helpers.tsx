import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { newMockXhr } from 'mock-xmlhttprequest'
import { vi } from 'vitest'
import App from '../App'

export const JEST_TIMEOUT = 5000

vi.mock('firebase/auth', () => ({
  getAuth: () => ({
    onAuthStateChanged: (fn: any) => {
      fn({ id: 'Chris' })
    }
  })
}))

export function renderAppWithRoute(url?: string) {
  const history = createMemoryHistory()
  history.push(url ?? '')
  return render(<App location={history.location} />)
}

export async function XMLHttpRequestMock() {
  const MockXhr = newMockXhr()
  MockXhr.onSend = request => {
    const responseHeaders = { 'Content-Type': 'application/json' }
    request.respond(200, responseHeaders, '{}')
  }
  global.XMLHttpRequest = MockXhr
}

export function windowMock() {
  window.HTMLMediaElement.prototype.load = vi.fn()
  window.HTMLMediaElement.prototype.play = vi.fn()
  window.HTMLMediaElement.prototype.pause = vi.fn()
  window.HTMLMediaElement.prototype.addTextTrack = vi.fn()
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: vi.fn() }
  })
}

export function ejecAllMocks() {
  windowMock()
  XMLHttpRequestMock()
}

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
