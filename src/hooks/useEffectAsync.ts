import { DependencyList, useEffect } from 'react'
import { PromiseVoidType } from '../types/config'

export function useEffectAsync(effect: PromiseVoidType, deps?: DependencyList | undefined) {
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      await effect()
    })()
  }, deps)
}
