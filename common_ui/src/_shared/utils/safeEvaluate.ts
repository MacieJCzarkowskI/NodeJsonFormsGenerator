/* eslint-disable @typescript-eslint/no-implied-eval */

export function safeEvaluate(expression: string, scope: any) {
  return Function(`return (${expression})`).bind(scope)()
}
