import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Form from '../form'
import { FormDisplayer } from '../_shared/components'
import { DatePicker, DatePickerProps } from './DatePicker'

export default {
  title: 'Inputs/DatePicker',
  component: DatePicker,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Datepicker label',
  placeholderText: 'Datepicker placeholder',
}

const TemplateWithForm: Story<DatePickerProps> = (args) => (
  <Form>
    <DatePicker {...args} />
    <FormDisplayer />
  </Form>
)

export const WithForm = TemplateWithForm.bind({})
WithForm.args = {
  name: 'dateInput',
  validationRules: { required: 'required' },
}
