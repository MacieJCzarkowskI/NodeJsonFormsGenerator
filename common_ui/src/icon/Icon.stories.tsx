import { Icon, IconProps } from '@components'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

export default {
  title: 'Icon',
  component: Icon,
} as Meta

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'accessibility',
}
