import { AsyncSelect, AsyncSelectProps, Form } from '@components'
import { FormDisplayer } from '@shared/components'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

export default {
  title: 'inputs/AsyncSelect',
  component: AsyncSelect,
} as Meta

const Template: Story<AsyncSelectProps> = (args) => (
  <Form>
    <AsyncSelect {...args} />
    <FormDisplayer />
  </Form>
)

export const WithForm = Template.bind({})

const loadOptions = async (inputValue: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        ['async option 1', 'async option 2']
          .filter((item) => item.includes(inputValue))
          .map((item) => ({ value: item, label: item })),
      )
    }, 1000)
  })
}

WithForm.args = {
  name: 'asyncSelect',
  query: {},
  loadOptions,
}
