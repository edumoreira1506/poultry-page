import React from 'react'
import { render, screen } from '@testing-library/react'
import { breederFactory, poultryFactory } from '@cig-platform/factories'

import Poultry from './Poultry'

const DEFAULT_PROPS = {
  poultry: poultryFactory(),
  images: [],
  registers: [],
  breeder: breederFactory()
}

describe('Poultry', () => {
  it('renders correctly', () => {
    render(<Poultry {...DEFAULT_PROPS} />)

    expect(screen.getByText(DEFAULT_PROPS.poultry.name)).toBeInTheDocument()
  })
})
