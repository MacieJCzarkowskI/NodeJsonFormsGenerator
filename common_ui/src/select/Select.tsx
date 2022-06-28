import { ErrorMessage, Label } from '@components'
import { useSmartForm } from '@shared/hooks'
import { SmartFormComponentProps } from '@shared/types'
import { colors } from '@styles'
import React, { FC, forwardRef } from 'react'
import ReactSelect, { Props as ReactSelectProps } from 'react-select'
import { GroupedOptionsType, OptionsType } from 'react-select/src/types'

const customStyles = () => ({
  container: (provided: any) => ({
    ...provided,
    display: 'inline-block',
    minWidth: 320,
  }),
  control: (provided: any) => ({
    ...provided,
    cursor: 'pointer',
    background: `${colors.lightGreyF10}`,
    borderRadius: '4px',
    padding: 12,
    border: 'none',
    // boxShadow: state.isFocused ? `0 0 0 2px ${colors.greyS}` : 0,
    // color: state.isFocused ? `${colors.black}` : `${colors.blue1}`,
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    transition: 'all 150ms ease-in',
  }),
  menu: (provided: any) => ({
    ...provided,
    marginTop: '6px',
    background: colors.white,
    borderRadius: '4px',
  }),
  placeholder: (provided: any) => ({
    ...provided,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'inherit',
  }),
  option: (styles: any) => ({
    ...styles,
    cursor: 'pointer',
    padding: '6px 20px',
  }),
})

type OptionType = { label: string; value: string }

export interface SelectProps extends Omit<ReactSelectProps, 'options'>, SmartFormComponentProps {
  options?: GroupedOptionsType<OptionType> | OptionsType<OptionType> | string[] | number[]
}

export const Select: FC<SelectProps> = forwardRef(
  (
    {
      label,
      options,
      value,
      onChange,
      onInputChange,
      inputValue,
      isMulti,
      onMenuClose,
      name,
      validationRules,
      ...restProps
    },
    ref,
  ) => {
    const { defaultValue, setValue } = useSmartForm(name, validationRules)

    const optionsAsOptionType: OptionType[] =
      (options as any)?.map((option: any) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return { label: option, value: option }
        }
        return option
      }) ?? []

    const handleChange = (option: OptionType) => {
      setValue?.(option.value)
    }

    return (
      <div>
        <Label>{label}</Label>
        <ReactSelect
          ref={ref as any}
          {...restProps}
          defaultValue={optionsAsOptionType.find((data) => data.value === defaultValue)}
          options={optionsAsOptionType}
          placeholder={label}
          styles={{
            ...restProps.styles,
            ...customStyles(),
          }}
          components={{
            ...restProps.components,
            IndicatorSeparator: () => null,
          }}
          getOptionValue={(val) => val.value}
          {...(name ? { onChange: handleChange as any } : {})}
        />
        <ErrorMessage name={name} />
      </div>
    )
  },
)
