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
  images: Array(10).fill({
    imageUrl: '1634766823222-c4f8a3c6-713d-45f0-a492-49643cf32ed6.jpeg',
    id: '',
    poultryId: ''
  }),
  registers: [
    {
      id: '714f3278-5bb1-4e3f-bd30-9acba448fb2d',
      poultryId: '20bc2d1c-548f-461c-872c-07d7746e11b4',
      description: 'Atualizações de domingo',
      date: new Date('2021-10-26T02:19:31.991Z'),
      type: 'IMAGENS',
      files: [{
        fileName: '1634766823222-c4f8a3c6-713d-45f0-a492-49643cf32ed6.jpeg',
      }, {
        fileName: '1634766823222-c4f8a3c6-713d-45f0-a492-49643cf32ed6.jpeg',
      }]
    },
    {
      id: '714f3278-5bb1-4e3f-bd30-9acba448fb2c',
      poultryId: '20bc2d1c-548f-461c-872c-07d7746e11b4',
      description: 'Atualizações de segunda-feira',
      date: new Date('2021-10-26T02:19:31.991Z'),
      type: 'VACINAÇÃO',
      metadata: {
        dose: '1',
        name: 'Coronavac',
      },
      files: []
    },
    {
      id: '714f3278-5bb1-4e3f-bd30-9acba448fb2a',
      poultryId: '20bc2d1c-548f-461c-872c-07d7746e11b4',
      description: 'Atualizações de segunda-feira',
      date: new Date('2021-10-26T02:19:31.991Z'),
      type: 'MEDIÇÃO E PESAGEM',
      metadata: {
        weight: '100',
        measurement: '125',
      },
      files: []
    },
    {
      id: '714f3278-5bb1-4e3f-bd30-9acba448fb2f',
      poultryId: '20bc2d1c-548f-461c-872c-07d7746e11b4',
      description: 'Ave anúnciada no criatório XPTO',
      date: new Date('2021-10-26T02:19:31.991Z'),
      type: 'ANÚNCIO',
      files: []
    }
  ],
  advertising: {
    price: 1500,
    id: 'id',
    externalId: 'externalId'
  }
}
