import { css } from '@emotion/core'
import { useAppForm } from '@shared/hooks'
import React, { FC } from 'react'

export interface ErrorMessageProps {
  name?: string
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ name }) => {
  const {
    methods: { errors },
  } = useAppForm()

  return name ? (
    <div
      className="text-danger100"
      css={css`
        min-height: 24px;
      `}
    >
      {errors?.[name]?.message}
    </div>
  ) : null
}
