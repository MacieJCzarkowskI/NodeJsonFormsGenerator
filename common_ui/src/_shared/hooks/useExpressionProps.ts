import { useScopeData } from '@shared/hooks'
import { ExpressionProperties } from '@shared/types'
import { safeEvaluate } from '@shared/utils'
import { isEmpty } from 'ramda'
import { useMemo } from 'react'
import { UseFormMethods } from 'react-hook-form'

export type UseExpressionProps = { [key: string]: any } | undefined

export function useExpressionProps(
  methods: UseFormMethods<any>,
  expressionProperties?: ExpressionProperties,
): UseExpressionProps {
  const scopeData = useScopeData(methods)

  if (!expressionProperties || isEmpty(expressionProperties) || scopeData == null) {
    return undefined
  }

  // FIXME
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(
    () =>
      Object.entries(expressionProperties).reduce(
        (previous, [property, expression]) => ({
          ...previous,
          [property]: safeEvaluate(expression, scopeData),
        }),
        {},
      ),
    [expressionProperties, scopeData],
  )
}
