import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import Poultry from './Poultry'

export default {
  title: 'Poultry',
  component: Poultry,
} as ComponentMeta<typeof Poultry>

const Template: ComponentStory<typeof Poultry> = (args) => <Poultry {...args} />

export const Example = Template.bind({})
Example.args = {
}
