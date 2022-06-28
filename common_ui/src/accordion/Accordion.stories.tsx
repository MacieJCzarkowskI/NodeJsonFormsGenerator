import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Accordion, AccordionProps } from './Accordion'

export default {
  title: 'Wrappers/Accordion',
  component: Accordion,
} as Meta

const Template: Story<AccordionProps> = (args) => <Accordion {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Accordion title',
  children: 'Accordion content',
}
