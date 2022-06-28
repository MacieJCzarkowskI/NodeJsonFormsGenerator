import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Form from '../form'
import { FormDisplayer } from '../_shared/components'
import { Select, SelectProps } from './Select'

export default {
  title: 'Inputs/Select',
  component: Select,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta

const Template: Story<SelectProps> = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Select label',
  options: ['option1', 'option2'],
  value: 'option1',
  isDisabled: false,
}

const TemplateWithForm: Story<SelectProps> = (args) => (
  <Form>
    <Select {...args} />
    <FormDisplayer />
  </Form>
)

export const WithForm = TemplateWithForm.bind({})
WithForm.args = {
  name: 'selectInput',
  validationRules: { required: 'required' },
  options: ['option1', 'option2'],
}
