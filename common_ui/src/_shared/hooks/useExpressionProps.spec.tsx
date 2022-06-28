import { useExpressionProps } from '@shared/hooks'
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

describe('useExpressionProps.ts', () => {
  it('should not work when expressionProperties are empty', () => {
    const { result } = renderHook(() => useExpressionProps({} as any, {}))
    expect(result.current).toBe(undefined)
  })

  it('should evaluate expression to true', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('firstInput')
      return useExpressionProps(methods, { result: '!this.firstInput' })
    })
    expect(result.current.result).toStrictEqual(true)
  })

  it('should evaluate expression to false', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('firstInput')
      methods.setValue('firstInput', 'newValue')
      return useExpressionProps(methods, { result: '!this.firstInput' })
    })
    expect(result.current.result).toStrictEqual(false)
  })

  it('should evaluate expression to true when scope is nested', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('nested.firstInput')
      methods.setValue('nested.firstInput', 'newVal')
      return useExpressionProps(methods, { result: '!!this.nested?.firstInput' })
    })
    expect(result.current.result).toStrictEqual(true)
  })

  it('should evaluate expression to false when scope is nested', () => {
    const { result } = getRenderHook(() => {
      const methods = useFormContext()
      methods.register('nested.firstInput')
      methods.setValue('nested.firstInput', 'newVal')
      return useExpressionProps(methods, { result: '!this.nested?.firstInput' })
    })
    expect(result.current.result).toStrictEqual(false)
  })
})
