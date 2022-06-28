import { ErrorMessage, Input, Label } from '@components'
import { css } from '@emotion/core'
import { useSmartForm } from '@shared/hooks'
import { CommonComponentProps, SmartFormComponentProps } from '@shared/types'
import { colors } from '@styles'
import React, { FC, forwardRef } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'

const datePickerStyles = css`
  .react-datepicker {
    background: ${colors.white};
    box-shadow: 0px 2px 16px rgba(128, 130, 151, 0.2);
    border-radius: 8px;
    border: none;
    width: 265px;
  }

  .react-datepicker__navigation {
    background: ${colors.lightGreyE5};
    border: 0.5px solid ${colors.lightGreyE5};
    border-radius: 50%;
    width: 24px;
    height: 24px;
  }

  .react-datepicker__navigation--previous {
    left: 190px;
    top: 17px;
  }

  .react-datepicker__navigation--next {
    top: 17px;
    right: 15px;
  }

  .react-datepicker__header {
    border: none;
    background-color: ${colors.white};
    padding-top: 16px;
  }

  .react-datepicker__current-month {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: ${colors.black50};
    text-align: left;
    padding-left: 15px;
  }

  .react-datepicker__day-names {
    margin-top: 20px;
  }

  .react-datepicker__day-name {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.29px;
  }

  .react-datepicker__month-container {
    float: unset;
  }

  .react-datepicker__month {
    padding-bottom: 25px;
    margin: 0;
  }

  .react-datepicker__day {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${colors.black50};
    padding: 3px 6px;
    margin: 2.5px;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day:hover {
    border-radius: 4px;
    background: ${colors.lightGreyE5};
    color: ${colors.blue1};
  }
`

const DEFAULT_DATE_FORMAT = 'dd/MM/yyyy'

export interface DatePickerProps extends ReactDatePickerProps, SmartFormComponentProps, CommonComponentProps {}

export const DatePicker: FC<DatePickerProps> = forwardRef(
  ({ customInput, name, validationRules, label, expressionProperties, ...rest }, ref) => {
    const { defaultValue, expressionProps, setValue } = useSmartForm(name, validationRules, expressionProperties)

    return (
      <div css={datePickerStyles}>
        <Label>{label}</Label>
        <ReactDatePicker
          ref={ref as any}
          dateFormat={DEFAULT_DATE_FORMAT}
          {...rest}
          {...expressionProps}
          customInput={customInput || <Input />}
          {...(name
            ? {
                selected: defaultValue as any,
                onChange: (date) => setValue(date),
              }
            : {})}
        />
        <ErrorMessage name={name} />
      </div>
    )
  },
)
