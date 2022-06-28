import { ErrorMessage, Label } from '@components'
import { css } from '@emotion/core'
import { useSmartForm } from '@shared/hooks'
import { CommonComponentProps, SmartFormComponentProps } from '@shared/types'
import { colors } from '@styles'
import React, { FC, forwardRef, InputHTMLAttributes, SyntheticEvent } from 'react'

const inputCss = css`
  background: ${colors.lightGreyF10};
  border-radius: 4px;
  border: none;
  min-height: 60px;
  padding: 0 12px;
  line-height: 14px;
  width: 320px;
`

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onPointerEnterCapture' | 'onPointerLeaveCapture'>,
    SmartFormComponentProps,
    CommonComponentProps {}

export const Input: FC<InputProps> = forwardRef(
  ({ name, label, validationRules, expressionProperties, ...rest }, ref) => {
    const { expressionProps, defaultValue, setValue } = useSmartForm(name, validationRules, expressionProperties) || {}

    return (
      <div>
        <Label>{label}</Label>
        <input
          {...rest}
          {...expressionProps}
          {...(name
            ? ({
                onChange: (e: SyntheticEvent<any>) => setValue(e.currentTarget.value),
                defaultValue,
              } as any)
            : { ref })}
          css={inputCss}
        />
        <ErrorMessage name={name} />
      </div>
    )
  },
)
