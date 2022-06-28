import { Meta, Story } from '@storybook/react/types-6-0'
import { nanoid } from 'nanoid'
import React from 'react'
import Button from '../button'
import Form from '../form'
import Input from '../input'
import { Stepper, StepperProps } from './Stepper'

export default {
  title: 'Wrappers/Stepper',
  component: Stepper,
} as Meta

const Template: Story<StepperProps> = (args) => <Stepper {...args} />

export const Default = Template.bind({})
Default.args = {
  steps: [
    {
      key: nanoid(),
      title: 'First step',
      content: 'First step content',
    },
    {
      key: nanoid(),
      title: 'Second step',
      content: 'Second step content',
    },
    {
      key: nanoid(),
      title: 'Third step',
      content: 'Third step content',
    },
  ],
  finalStepButton: <Button className="mr-2">FINAL</Button>,
}

const TemplateWithForm: Story<StepperProps> = (args) => (
  <Form
    options={{
      shouldUnregister: false,
    }}
  >
    <Stepper {...args} />
  </Form>
)

export const WithForm = TemplateWithForm.bind({})
WithForm.args = {
  steps: [
    {
      key: nanoid(),
      title: 'First step',
      content: (
        <div>
          <Input name="nested.firstInput" validationRules={{ required: 'this is required' }} />
          <Input
            name="nested2.firstInput"
            expressionProperties={{
              disabled: 'not(nested.firstInput)',
            }}
          />
        </div>
      ),
    },
    {
      key: nanoid(),
      title: 'Second step',
      content: 'Second step content',
    },
  ],
}
