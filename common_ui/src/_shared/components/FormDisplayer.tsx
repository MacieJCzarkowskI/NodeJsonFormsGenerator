import { useAppForm } from '@shared/hooks'
import { pick } from 'ramda'
import React, { FC } from 'react'

export const FormDisplayer: FC = () => {
  const {
    methods: { getValues, formState },
  } = useAppForm()

  const { errors, ...formStateWithoutErrors } = formState
  const errorsWithoutRefs = Object.entries(errors).reduce((previous, [key, value]) => {
    return { ...previous, [key]: pick(['type', 'types', 'message'], value) }
  }, {})

  return (
    <div className="absolute top-0 right-0 p-2 bg-gray-100 max-h-full min-h-full overflow-auto">
      <pre>
        <b>value:</b> {JSON.stringify(getValues(), null, 2)}
      </pre>
      <pre>
        <b>errors:</b> {JSON.stringify(errorsWithoutRefs, null, 2)}
      </pre>
      <pre>
        <b>formState:</b> {JSON.stringify(formStateWithoutErrors, null, 2)}
      </pre>
    </div>
  )
}
