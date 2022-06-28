import { Image, ImageProps } from '@components'
import { AxiosProvider } from '@shared/hooks'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

export default {
  title: 'Image',
  component: Image,
} as Meta

const Template: Story<ImageProps> = (args) => (
  <AxiosProvider config={{}}>
    <Image {...args} />
  </AxiosProvider>
)

export const Default = Template.bind({})
Default.args = {
  name: 'accessibility',
}
