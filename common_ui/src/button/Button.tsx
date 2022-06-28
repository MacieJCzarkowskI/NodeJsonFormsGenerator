import { css } from '@emotion/core'
import { useExpressionProps } from '@shared/hooks'
import { CommonComponentProps } from '@shared/types'
import { colors } from '@styles'
import classNames from 'classnames'
import React, { ButtonHTMLAttributes, FC } from 'react'
import { useFormContext } from 'react-hook-form'

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onPointerEnterCapture' | 'onPointerLeaveCapture'>,
    CommonComponentProps {}

const buttonCss = css`
  &:disabled {
    color: ${colors.greyB0};
    cursor: default;
  }
`

export const Button: FC<ButtonProps> = ({ children, className, expressionProperties, ...rest }) => {
  const methods = useFormContext()
  const expressionProps = useExpressionProps(methods, expressionProperties)

  return (
    <button
      type="button"
      {...rest}
      {...expressionProps}
      className={classNames('rounded outline-none shadow py-3 px-12 font-normal tracking-wider', className)}
      css={buttonCss}
    >
      {children}
    </button>
  )
}
