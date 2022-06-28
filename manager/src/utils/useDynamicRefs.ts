/* eslint-disable no-console */
import { createRef, RefObject } from 'react'

const map = new Map<string, RefObject<unknown>>()

const setRef = (key: string): RefObject<unknown> | void => {
  if (!key) return console.warn('useDynamicRefs: Cannot set ref without key ')
  const ref = createRef()
  map.set(key, ref)
  return ref
}

const getRef = (key: string): RefObject<unknown> | undefined | void => {
  if (!key) return console.warn('useDynamicRefs: Cannot get ref without key')
  return map.get(key)
}

export const useDynamicRefs = () => {
  return [getRef, setRef]
}
