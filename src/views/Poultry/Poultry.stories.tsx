import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { poultryFactory } from '@cig-platform/factories'

import Poultry from './Poultry'

export default {
  title: 'Poultry',
  component: Poultry,
} as ComponentMeta<typeof Poultry>

const Template: ComponentStory<typeof Poultry> = (args) => <Poultry {...args} />

export const Example = Template.bind({})
Example.args = {
  poultry: poultryFactory({
    videos: {
      measurement: 'https://www.youtube.com/watch?v=Hh9vXojYq9A',
      presentation: 'https://www.youtube.com/watch?v=Hh9vXojYq9A'
    }
  }),
  images: [
    {
      imageUrl: '1633798026572-6edaa0a3-567e-4656-ad2a-a5c9c45e2655.jpeg',
      id: '',
      poultryId: ''
    }
  ]
}
