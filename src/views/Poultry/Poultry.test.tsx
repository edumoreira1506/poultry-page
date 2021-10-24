import React from 'react'
import { render, screen } from '@testing-library/react'

import Poultry from './Poultry'

describe('Poultry', () => {
  it('renders correctly', () => {
    render(<Poultry />)

    expect(screen.getByText('Poultry')).toBeInTheDocument()
  })
})
