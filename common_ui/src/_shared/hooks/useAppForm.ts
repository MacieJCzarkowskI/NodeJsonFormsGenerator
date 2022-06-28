import { useExpressionProps, UseExpressionProps } from '@shared/hooks'
import { ExpressionProperties } from '@shared/types'
import { useFormContext, UseFormMethods } from 'react-hook-form'

export interface UseAppForm<TFieldValues extends Record<string, any>> {
  methods: UseFormMethods<TFieldValues>
  expressionProps: UseExpressionProps
}

export function useAppForm<TFieldValues extends Record<string, any>>(
  expressionProperties?: ExpressionProperties,
): UseAppForm<TFieldValues> {
  const methods = useFormContext<TFieldValues>() || {}
  const expressionProps = useExpressionProps(methods, expressionProperties)

  return {
    methods,
    expressionProps,
  }
}
