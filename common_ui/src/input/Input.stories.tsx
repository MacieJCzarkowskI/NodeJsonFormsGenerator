import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Form from '../form'
import { FormDisplayer } from '../_shared/components'
import { Input, InputProps } from './Input'

export default {
  title: 'Inputs/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta

const Template: Story<InputProps> = (args) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Input label',
  placeholder: 'input placeholder',
}

const TemplateWithForm: Story<InputProps> = (args) => (
  <Form>
    <Input {...args} />
    <FormDisplayer />
  </Form>
)

export const WithForm = TemplateWithForm.bind({})
WithForm.args = {
  name: 'input',
  validationRules: { required: 'required' },
}
