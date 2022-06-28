import { Conditional, ConditionalProps, Form, Input } from '@components'
import { FormDisplayer } from '@shared/components'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

export default {
  title: 'Wrappers/Conditional',
  component: Conditional,
  argTypes: {
    condition: { control: 'boolean' },
  },
} as Meta

const Template: Story<ConditionalProps> = (args) => <Conditional {...args} />

export const Default = Template.bind({})
Default.args = {
  whenTrue: 'condition is true',
  whenFalse: 'condition is false',
}

const TemplateWithForm: Story<ConditionalProps> = (args) => (
  <Form>
    <Input name="inputValue" />
    <Conditional {...args} />
    <FormDisplayer />
  </Form>
)

export const WithForm = TemplateWithForm.bind({})
WithForm.argTypes = { condition: { control: 'text' } }
WithForm.args = {
  condition: 'this.inputValue',
  whenTrue: <div>Input has value</div>,
  whenFalse: <div>Input is empty</div>,
}
