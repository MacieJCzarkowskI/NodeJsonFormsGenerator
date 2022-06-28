import { useExpressionProps, UseExpressionProps } from '@shared/hooks'
import { ExpressionProperties } from '@shared/types'
import { useEffect } from 'react'
import {
  DeepPartial,
  FieldName,
  FieldValue,
  SetValueConfig,
  UnpackNestedValue,
  useFormContext,
  UseFormMethods,
  ValidationRules,
} from 'react-hook-form'

export interface UseSmartForm<TFieldValues extends Record<string, any>> {
  methods: UseFormMethods<TFieldValues>
  expressionProps: UseExpressionProps
  defaultValue: FieldValue<TFieldValues>
  setValue(
    value:
      | FieldValue<TFieldValues>
      | UnpackNestedValue<DeepPartial<TFieldValues>>
      | string[]
      | undefined
      | null
      | boolean,
    options?: SetValueConfig,
  ): void
}

export function useSmartForm<TFieldValues extends Record<string, any>>(
  name?: FieldName<TFieldValues>,
  validationRules?: ValidationRules,
  expressionProperties?: ExpressionProperties,
): UseSmartForm<TFieldValues> {
  const methods = useFormContext<TFieldValues>() || {}
  const expressionProps = useExpressionProps(methods, expressionProperties)
  const { register, setValue, getValues } = methods

  useEffect(() => {
    if (name) {
      register?.(name, validationRules)
    }
  }, [name, register, validationRules])

  const defaultValue = getValues?.(name as string) as any

  const onValueSet = (
    value:
      | FieldValue<TFieldValues>
      | UnpackNestedValue<DeepPartial<TFieldValues>>
      | string[]
      | undefined
      | null
      | boolean,
    options?: SetValueConfig,
  ) => {
    setValue(name as string, value, { shouldValidate: true, shouldDirty: true, ...options })
  }

  return {
    methods,
    expressionProps,
    defaultValue,
    setValue: onValueSet,
  }
}
