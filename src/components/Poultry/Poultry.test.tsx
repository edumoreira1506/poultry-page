import React from 'react'
import { render, screen } from '@testing-library/react'
import { advertisingFactory, breederFactory, poultryFactory, userFactory } from '@cig-platform/factories'

import Poultry from './Poultry'
import { BreederContactTypeEnum, RegisterTypeEnum } from '@cig-platform/enums'
import userEvent from '@testing-library/user-event'

const DEFAULT_PROPS = {
  poultry: poultryFactory(),
  images: [],
  registers: [],
  breeder: breederFactory(),
  breederId: breederFactory().id
}

describe('Poultry', () => {
  it('renders correctly', () => {
    render(<Poultry {...DEFAULT_PROPS} />)

    expect(screen.getByText(DEFAULT_PROPS.poultry.name)).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.description)).toBeInTheDocument()
    expect(screen.getByText('Descrição')).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.type)).toBeInTheDocument()
    expect(screen.getByText('Raça')).toBeInTheDocument()
    expect(screen.getByText('Data de nascimento')).toBeInTheDocument()
    expect(screen.getByText('Cor da plumagem')).toBeInTheDocument()
    expect(screen.getByText('Cor dos olhos')).toBeInTheDocument()
    expect(screen.getByText('Cor das canelas')).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.tail)).toBeInTheDocument()
    expect(screen.getByText('Rabo')).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.crest)).toBeInTheDocument()
    expect(screen.getByText('Crista')).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.dewlap)).toBeInTheDocument()
    expect(screen.getByText('Barbela')).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.gender)).toBeInTheDocument()
    expect(screen.getByText('Sexo')).toBeInTheDocument()
    expect(screen.getByText('Nº Anilha Interna')).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.register)).toBeInTheDocument()
    expect(screen.getByText('Peso')).toBeInTheDocument()
    expect(screen.getByText('Medida')).toBeInTheDocument()
    expect(screen.getByText('Histórico')).toBeInTheDocument()
  })

  it('renders favorites and deals info', () => {
    const advertising = {
      ...advertisingFactory(),
      favorites: 10,
      deals: 11,
      questions: []
    }

    render(<Poultry {...DEFAULT_PROPS} advertising={advertising} />)

    expect(screen.getByText(advertising.favorites)).toBeInTheDocument()
    expect(screen.getByText('favoritos')).toBeInTheDocument()
    expect(screen.getByText(advertising.deals)).toBeInTheDocument()
    expect(screen.getByText('propostas')).toBeInTheDocument()
  })

  it('renders last measurement and weight register', () => {
    const register = {
      type: RegisterTypeEnum.MeasurementAndWeighing,
      metadata: { weight: 150, measurement: 150 },
      id: '',
      poultryId: '',
      description: '',
      date: new Date(),
      files: []
    }

    render(<Poultry {...DEFAULT_PROPS} registers={[register]} />)

    expect(screen.getByText(`${register.metadata.weight} KG`)).toBeInTheDocument()
    expect(screen.getByText(`${register.metadata.measurement} CM`)).toBeInTheDocument()
  })

  it('opens register modal', async () => {
    const register = {
      type: RegisterTypeEnum.MeasurementAndWeighing,
      metadata: { weight: 150, measurement: 150 },
      id: '',
      poultryId: '',
      description: 'Peso e medição',
      date: new Date(),
      files: []
    }

    render(<Poultry {...DEFAULT_PROPS} registers={[register]} />)

    const [birthDateRegister, measurementAndWeighRegister] = screen.getAllByText('Mais informações')

    userEvent.click(birthDateRegister)

    expect(screen.getByText(`Animal foi registrado em ${new Intl.DateTimeFormat('pt-BR').format(DEFAULT_PROPS.poultry.birthDate)}`)).toBeInTheDocument()

    userEvent.click(measurementAndWeighRegister)

    expect(screen.queryByText(`Animal foi registrado em ${new Intl.DateTimeFormat('pt-BR').format(DEFAULT_PROPS.poultry.birthDate)}`)).not.toBeInTheDocument()
  })

  it('renders videos', () => {
    const poultry = poultryFactory({
      videos: {
        measurement: 'https://www.youtube.com/watch?v=Bv-b2f5lEfI',
        presentation: 'https://www.youtube.com/watch?v=Bv-b2f5lEfI',
        walking: 'https://www.youtube.com/watch?v=Bv-b2f5lEfI'
      }
    })

    render(<Poultry {...DEFAULT_PROPS} poultry={poultry} />)

    expect(screen.getByText('Vídeo de apresentação')).toBeInTheDocument()
    expect(screen.getByText('Vídeo andando')).toBeInTheDocument()
    expect(screen.getByText('Vídeo de medição')).toBeInTheDocument()
  })

  it('renders vaccines', () => {
    const register = {
      date: new Date(),
      description: 'Cool description vaccine',
      files: [],
      id: '',
      poultryId: '',
      type: RegisterTypeEnum.Vaccination,
      metadata: { dose: 1, name: 'Pfizer' }
    }

    render(
      <Poultry
        {...DEFAULT_PROPS}
        registers={[register]}
      />
    )

    expect(screen.getByText('Vacinas aplicadas')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Dose')).toBeInTheDocument()
    expect(screen.getByText(register.description)).toBeInTheDocument()
    expect(screen.getByText(register.metadata.name)).toBeInTheDocument()
    expect(screen.getByText(`${register.metadata.dose}ª`)).toBeInTheDocument()
  })

  it('renders weight and measurement', () => {
    const register = {
      date: new Date(),
      description: 'Cool description vaccine',
      files: [],
      id: '',
      poultryId: '',
      type: RegisterTypeEnum.MeasurementAndWeighing,
      metadata: { weight: 150, measurement: 150 }
    }

    render(
      <Poultry
        {...DEFAULT_PROPS}
        registers={[register]}
      />
    )

    expect(screen.getByText('AMFA')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getAllByText('Peso')).toHaveLength(2)
    expect(screen.getAllByText('Medida')).toHaveLength(2)
    expect(screen.getByText(register.description)).toBeInTheDocument()
    expect(screen.getByText(`${register.metadata.measurement} CM`)).toBeInTheDocument()
    expect(screen.getByText(`${register.metadata.weight} KG`)).toBeInTheDocument()
  })

  it('renders advertising questions', () => {
    const advertising = {
      ...advertisingFactory(),
      favorites: 0,
      deals: 0,
      questions: [
        {
          user: userFactory(),
          breeder: breederFactory(),
          answers: [{
            content: 'Resposta 1',
            createdAt: new Date(),
            id: '',
            externalId: '',
            questionId: '',
            user: userFactory(),
          }],
          content: 'Pergunta 1',
          createdAt: new Date(),
          id: '',
          externalId: '',
          advertisingId: ''
        }
      ]
    }

    render(<Poultry {...DEFAULT_PROPS} advertising={advertising} />)

    expect(screen.getByText('Perguntas')).toBeInTheDocument()

    advertising.questions.forEach(question => {
      expect(screen.getByText(question.content)).toBeInTheDocument()
      expect(screen.getByText(`${question.breeder.name} - ${question.user.name}`)).toBeInTheDocument()

      question.answers.forEach(answer => {
        expect(screen.getByText(answer.content)).toBeInTheDocument()
        expect(screen.getByText(`${DEFAULT_PROPS.breeder.name} - ${answer.user.name}`)).toBeInTheDocument()
      })
    })
  })

  it('calls onComment correctly', () => {
    const onComment = jest.fn()
    const advertising = {
      ...advertisingFactory(),
      favorites: 0,
      deals: 0,
      questions: [
        {
          user: userFactory(),
          answers: [{
            content: 'Resposta 1',
            createdAt: new Date(),
            id: '',
            externalId: '',
            questionId: '',
            user: userFactory(),
          }],
          content: 'Pergunta 1',
          createdAt: new Date(),
          id: '',
          externalId: '',
          advertisingId: ''
        }
      ]
    }

    render(<Poultry {...DEFAULT_PROPS} advertising={advertising} onComment={onComment} />)

    userEvent.click(screen.getByText('Comentar'))

    expect(onComment).toHaveBeenCalledTimes(1)
    expect(onComment).toHaveBeenCalledWith({ advertisingId: advertising.id, comment: '' })
  })

  it('calls onAnswer correctly', () => {
    const onAnswer = jest.fn()
    const advertising = {
      ...advertisingFactory(),
      favorites: 0,
      deals: 0,
      questions: [
        {
          user: userFactory(),
          answers: [{
            content: 'Resposta 1',
            createdAt: new Date(),
            id: '',
            externalId: '',
            questionId: '',
            user: userFactory(),
          }],
          content: 'Pergunta 1',
          createdAt: new Date(),
          id: '',
          externalId: '',
          advertisingId: ''
        }
      ]
    }

    render(<Poultry {...DEFAULT_PROPS} advertising={advertising} onAnswer={onAnswer} />)

    userEvent.click(screen.getByText('Responder'))
    userEvent.click(screen.getByText('Responder'))

    expect(onAnswer).toHaveBeenCalledTimes(1)
    expect(onAnswer).toHaveBeenCalledWith({
      advertisingId: advertising.id,
      comment: '',
      commentId: advertising.questions[0].id
    })
  })

  it('renders message button', () => {
    const contact = {
      id: '',
      breederId: '',
      value: '(15) 99644-2031',
      type: BreederContactTypeEnum.WHATS_APP,
      createdAt: new Date()
    }
    const advertising = {
      ...advertisingFactory(),
      questions: [],
      favorites: 0,
      deals: 0
    }

    render(<Poultry {...DEFAULT_PROPS} advertising={advertising} contacts={[contact]} />)

    expect(screen.getByText('Mensagem')).toBeInTheDocument()
  })

  it('renders correctly buy button', () => {
    const onBuy = jest.fn()
    const advertising = {
      ...advertisingFactory(),
      questions: [],
      favorites: 0,
      deals: 0
    }

    render(<Poultry {...DEFAULT_PROPS} advertising={advertising} onBuy={onBuy} />)

    expect(screen.getByText('Fazer proposta')).toBeInTheDocument()

    userEvent.click(screen.getByText('Fazer proposta'))

    expect(onBuy).toHaveBeenCalledWith({
      advertisingId: advertising.id,
      breederId: DEFAULT_PROPS.breederId,
      poultryId: DEFAULT_PROPS.poultry.id
    })
  })

  it('renders birth date register', () => {
    render(<Poultry {...DEFAULT_PROPS} />)

    expect(screen.getByText('Primeiro registro do animal')).toBeInTheDocument()
  })

  it('does not render birth date register', () => {
    const poultry = {
      ...DEFAULT_PROPS.poultry,
      birthDate: undefined
    }

    render(<Poultry {...DEFAULT_PROPS} poultry={poultry} />)

    expect(screen.queryByText('Primeiro registro do animal')).not.toBeInTheDocument()
  })
})
