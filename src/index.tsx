import React from 'react'
import ReactDOM from 'react-dom'
import { IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'

import Poultry from './views/Poultry/Poultry';

(window as any).renderPoultryPage = (
  containerId: string,
  poultry: IPoultry,
  images: IPoultryImage[] = [],
  registers: IPoultryRegister[] = [],
) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.render(
      <Poultry poultry={poultry} images={images} registers={registers} />,
      targetDocument,
    )
  }
};

(window as any).unmountPoultryPage = (containerId: string) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.unmountComponentAtNode(targetDocument)
  }
}
