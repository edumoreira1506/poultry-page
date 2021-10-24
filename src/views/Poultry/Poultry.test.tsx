import React from 'react'
import { render, screen } from '@testing-library/react'
import { poultryFactory } from '@cig-platform/factories'

import Poultry from './Poultry'

const DEFAULT_PROPS = {
  poultry: poultryFactory(),
  images: [],
}

describe('Poultry', () => {
  it('renders correctly', () => {
    render(<Poultry {...DEFAULT_PROPS} />)

    expect(screen.getByText(DEFAULT_PROPS.poultry.name)).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_PROPS.poultry.description)).toBeInTheDocument()
  })
})
