import { Button, ButtonProps } from '@components'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

export default {
  title: 'Inputs/Button',
  component: Button,
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
}
