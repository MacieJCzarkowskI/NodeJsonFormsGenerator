import React, { cloneElement, FC, ReactElement } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormOptions } from 'react-hook-form'

const DEFAULT_OPTIONS: UseFormOptions = {
  mode: 'all',
  reValidateMode: 'onChange',
}

export interface FormProps<TFieldValues extends FieldValues = FieldValues, TContext extends object = object> {
  options?: UseFormOptions<TFieldValues, TContext>
  onSubmit?: SubmitHandler<TFieldValues>
  submitButton?: ReactElement
}

export const Form: FC<FormProps> = ({ options, submitButton, onSubmit, children }) => {
  const methods = useForm({
    ...DEFAULT_OPTIONS,
    ...options,
  })
  const { handleSubmit: handleFormSubmit } = methods

  const handleSubmit = handleFormSubmit((form) => {
    // eslint-disable-next-line no-alert
    alert(JSON.stringify(form, null, 2)) // FIXME
    onSubmit?.(form)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        {children}
        {submitButton &&
          cloneElement(submitButton, {
            ...submitButton.props,
            type: 'submit',
          })}
      </form>
    </FormProvider>
  )
}
