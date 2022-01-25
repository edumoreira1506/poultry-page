import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { breederFactory, poultryFactory } from '@cig-platform/factories'

import Poultry from './Poultry'

export default {
  title: 'Poultry',
  component: Poultry,
} as ComponentMeta<typeof Poultry>

const Template: ComponentStory<typeof Poultry> = (args) => <Poultry {...args} />

export const Example = Template.bind({})
Example.args = {
  poultry: {
    ...poultryFactory({
      videos: {
        measurement: 'https://www.youtube.com/watch?v=Hh9vXojYq9A',
        presentation: 'https://www.youtube.com/watch?v=Hh9vXojYq9A'
      }
    }),
    code: 'ABCD-123'
  },
  contacts: [
    {
      breederId: '',
      id: '',
      type: 'WHATS_APP',
      value: '(15) 99644-2031'
    }
  ],
  images: [
    {
      imageUrl: '1634766823222-c4f8a3c6-713d-45f0-a492-49643cf32ed6.jpeg',
      id: '',
      poultryId: ''
    },
    {
      imageUrl: '1636412705405-2021-11-06_21-22.png',
      id: '',
      poultryId: ''
    },
    {
      imageUrl: '1640124345946-13_do_tamanho_de_uma_crianca___galo_tem_1_26m__recorde_nacional_e_mundial___divulgacao-743758.jpg',
      id: '',
      poultryId: ''
    },
    {
      imageUrl: '1642550732608-matte-circulo.jpg',
      id: '',
      poultryId: ''
    }
  ],
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
    },
    {
      id: '714f3278-5bb1-4e3f-bd30-9acba448fb2f',
      poultryId: '20bc2d1c-548f-461c-872c-07d7746e11b4',
      description: 'Anúncio removido',
      date: new Date('2021-10-26T02:19:31.991Z'),
      type: 'REMOÇÃO DE ANÚNCIO',
      files: []
    },
    {
      id: '714f3278-5bb1-4e3f-bd30-9acba448fb2f',
      poultryId: '20bc2d1c-548f-461c-872c-07d7746e11b4',
      description: 'Ave transferida',
      date: new Date('2021-10-26T02:19:31.991Z'),
      type: 'TRANSFERÊNCIA',
      files: []
    }
  ],
  advertising: {
    price: 1500,
    id: 'id',
    externalId: 'externalId',
    questions: [
      {
        user: {
          name: 'Eduardo Moreira',
          id:  '',
          email: '',
          password: '',
          register: '',
        },
        answers: [
          {
            user: {
              name: 'Eduardo Moreira',
              id:  '',
              email: '',
              password: '',
              register: '',
            },
            id: '',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a iaculis quam, condimentum volutpat est.',
            questionId: '',
            createdAt: new Date(),
            externalId: '',
          }
        ],
        id: '',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a iaculis quam, condimentum volutpat est.',
        advertisingId: '',
        createdAt: new Date(),
        externalId: '',
      }
    ]
  },
  breeder: breederFactory(),
  breederId: 'Algum breeder id',
  onSeeConfig: () => alert('onSeeConfig')
}
