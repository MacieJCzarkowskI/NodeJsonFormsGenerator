import { ErrorMessage } from '@components/error-message'
import { Label } from '@components/label'
import { useSmartForm } from '@shared/hooks'
import { CommonComponentProps, Query, SmartFormComponentProps } from '@shared/types'
import { colors } from '@styles'
import React, { FC, forwardRef } from 'react'
import ReactAsyncSelect, { AsyncProps } from 'react-select/async'

const customStyles = ({ padding, border }: { padding?: string; border?: string }) => ({
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
    padding: `${padding || '15px'}`,
    border: `${border || 'none'}`,
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
    color: 'inherit',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'inherit',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
  }),
  option: (styles: any) => ({
    ...styles,
    cursor: 'pointer',
    padding: '6px 20px',
  }),
})

type OptionType = { label: string; value: string }

export interface AsyncSelectProps
  extends Omit<AsyncProps<OptionType>, 'loadOptions'>,
    SmartFormComponentProps,
    CommonComponentProps {
  query: Query
  loadOptions: (searchText: string, inputValue: { [key: string]: string }) => Promise<any>
  label?: string
  padding?: string
  border?: string
}

const loadOptions = (searchText: string, params: { [key: string]: string }): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = [
        { value: 'asd1', label: 'asd1' },
        { value: 'asd2', label: 'asd2' },
        { value: 'asd3', label: 'asd3' },
        { value: 'asd4', label: 'asd4' },
      ]
      resolve(res.filter((element) => (params.paramOne ? element.value.includes(params.paramOne) : true)))
    }, 1000)
  })
}

export const AsyncSelect: FC<AsyncSelectProps> = forwardRef(
  ({ label, name, validationRules, padding, border, query }, ref) => {
    const { setValue, methods } = useSmartForm(name, validationRules)
    // const axiosInstance = useAxiosContext() // TODO
    // const expressionProps = useExpressionProps(methods, expressionProperties)

    const handleChange = (option: OptionType) => {
      setValue?.(option.value)
    }

    const queryProperties = Object.entries(query.properties || {}).reduce((previous, [key, value]) => {
      return {
        ...previous,
        [key]: methods.watch(value),
      }
    }, {})

    return (
      <div>
        <Label>{label}</Label>
        <ReactAsyncSelect
          // workaround to trigger options reload when queryProperties have changed https://github.com/JedWatson/react-select/issues/1879
          key={JSON.stringify(queryProperties)}
          ref={ref as any}
          styles={{
            ...customStyles({ padding, border }),
          }}
          placeholder={label}
          onChange={handleChange as any}
          loadOptions={(inputVal) => {
            return loadOptions(inputVal, queryProperties)
          }}
          cacheOptions
          defaultOptions
        />
        <ErrorMessage name={name} />
      </div>
    )
  },
)
