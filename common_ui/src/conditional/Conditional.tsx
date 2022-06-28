import { useScopeData } from '@shared/hooks'
import { renderReactNode, safeEvaluate } from '@shared/utils'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export interface ConditionalProps {
  condition: string | boolean
  watcher?: string
  whenTrue: ReactNode | string
  whenFalse?: ReactNode | string
  whenNone?: ReactNode | string
}

export const Conditional: FC<ConditionalProps> = ({ condition, watcher, whenTrue, whenFalse }) => {
  const methods = useFormContext()
  const scopeData = useScopeData(methods)
  const [evaluatedCondition, setEvaluatedCondition] = useState<boolean>(false)
  const checker = watcher ? methods.watch(watcher) : this

  useEffect(() => {
    if (typeof condition === 'string') {
      setEvaluatedCondition(safeEvaluate(condition, scopeData))
    } else {
      setEvaluatedCondition(condition)
    }
  }, [checker])

  return <>{renderReactNode(evaluatedCondition ? whenTrue : whenFalse)}</>
}
