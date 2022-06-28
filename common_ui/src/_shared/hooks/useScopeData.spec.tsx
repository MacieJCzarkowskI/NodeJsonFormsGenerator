import { useScopeData } from '@shared/hooks'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { FormProvider, useForm, useFormContext, UseFormOptions } from 'react-hook-form'

const getWrapper = (options: UseFormOptions<any> = {}) => ({ children }: any) => {
  const methods = useForm(options)
  return <FormProvider {...methods}>{children}</FormProvider>
}

const getRenderHook = (callback: (props: any) => any) => {
  return renderHook(callback, { wrapper: getWrapper() })
}

describe('useScopeData.ts', () => {
  it('should not work when form context is not provided', () => {
    const { result } = getRenderHook(() => {
      return useScopeData(undefined)
    })
    expect(result.current).toBe(undefined)
  })

  it('should return empty scope data', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      return useScopeData(methods)
    })
    expect(result.current).toStrictEqual({})
  })

  it('should return scope data with single nullish property', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('firstInput')
      return useScopeData(methods)
    })
    expect(result.current).toStrictEqual({ firstInput: undefined })
  })

  it('should return scope data with single property', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('firstInput')
      methods.setValue('firstInput', 'newValue')
      return useScopeData(methods)
    })
    expect(result.current).toStrictEqual({ firstInput: 'newValue' })
  })

  it('should return scope data with single nested property', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('nested.firstInput')
      methods.setValue('nested.firstInput', 'newValue')
      return useScopeData(methods)
    })
    expect(result.current.nested.firstInput).toEqual('newValue')
  })

  // TODO
  // it('should evaluate expression to true when scope has no value', () => {
  //   const { result } = getRenderHook(() => {
  //     const methods = useFormContext()
  //     return useExpressionProps(methods, { disabled: '!this.firstInput' })
  //   })
  //   expect(result.current).toStrictEqual({ disabled: true })
  // })

  // it('should correctly evaluate $isValid property when flat form', () => {
  //   const { result } = getRenderHook(() => {
  //     const methods = useFormContext()
  //     methods.register('firstInput', { required: 'required' })
  //     return useExpressionProps(methods, { isValid: 'this.$isValid' })
  //   })
  //   expect(result.current).toStrictEqual({ isValid: true })
  // })

  it('should calculate $isValid property in scope data when nested form', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('nested.firstInput', { required: 'required' })
      return useScopeData(methods)
    })
    expect(result.current).toStrictEqual({
      nested: {
        $isValid: false,
        firstInput: undefined,
      },
    })
  })

  it('should calculate $isValid property in scope data when nested form partially completed', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('nested.firstInput', { required: 'required' })
      methods.register('nested.firstInput2', { required: 'required' })
      methods.setValue('nested.firstInput', 'newVal')
      return useScopeData(methods)
    })
    expect(result.current).toStrictEqual({
      nested: {
        $isValid: false,
        firstInput: 'newVal',
        firstInput2: undefined,
      },
    })
  })

  it('should calculate $isValid property in scope data when two nested forms', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('nested.firstInput', { required: 'required' })
      methods.register('nested2.firstInput')
      return useScopeData(methods)
    })
    expect(result.current).toStrictEqual({
      nested: {
        $isValid: false,
        firstInput: undefined,
      },
      nested2: {
        $isValid: true,
        firstInput: undefined,
      },
    })
  })
})
