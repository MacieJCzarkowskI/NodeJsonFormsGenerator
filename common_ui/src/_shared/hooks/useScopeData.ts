import { equals, is, isEmpty, mapObjIndexed, path as getByPath } from 'ramda'
import { useMemo } from 'react'
import { Control, UnpackNestedValue, UseFormMethods } from 'react-hook-form'

export type UseScopeData = { [key: string]: any } | undefined

export function useScopeData(methods?: UseFormMethods<any>): UseScopeData {
  if (isEmpty(methods) || methods == null) {
    return undefined
  }

  const { getValues, control } = methods
  const values = getValues()

  // FIXME
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(() => getValuesWithIsValidProperty(values, control, []), [control, values])
}

function getValuesWithIsValidProperty(obj: UnpackNestedValue<any>, control: Control<any>, parentPath: string[]): any {
  const { validFieldsRef, fieldsWithValidationRef, formStateRef } = control
  if (!is(Object, obj)) {
    return obj
  }

  return mapObjIndexed((value, path) => {
    if (!is(Object, value)) {
      return value
    }

    const nestedPath = parentPath.concat(path)
    const errors = getByPath(nestedPath, formStateRef.current.errors)
    const $isValid =
      equals(getByPath(nestedPath, validFieldsRef.current), getByPath(nestedPath, fieldsWithValidationRef.current)) &&
      (isEmpty(errors) || errors == null)

    return {
      ...getValuesWithIsValidProperty(value, control, nestedPath),
      $isValid,
    }
  }, obj)
}
