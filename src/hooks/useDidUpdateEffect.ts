import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export function useDidUpdateEffect(fn: EffectCallback, inputs?: DependencyList | undefined): void {
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      return fn()
    }
    didMountRef.current = true
  }, inputs)
}
