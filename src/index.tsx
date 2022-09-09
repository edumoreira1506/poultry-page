import { queryClient } from '@cig-platform/data-helper'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { PoultryProps } from './components/Poultry/Poultry'

import PoultryContainer from './containers/PoultryContainer/PoultryContainer'

type Callbacks = {
  onEditAdvertising?: PoultryProps['onEditAdvertising'];
  onSeeConfig?: PoultryProps['onSeeConfig'];
  onComment?: PoultryProps['onComment'];
  onAnswer?: PoultryProps['onAnswer'];
  onBuy?: PoultryProps['onBuy'];
}

(window as any).renderPoultryPage = (
  containerId: string,
  { breederId, poultryId, refetch = false }: { breederId: string; poultryId: string; refetch?: boolean },
  {
    onEditAdvertising,
    onSeeConfig,
    onAnswer,
    onComment,
    onBuy,
  }: Callbacks = {}
) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <PoultryContainer
          onEditAdvertising={onEditAdvertising}
          poultryId={poultryId}
          breederId={breederId}
          onSeeConfig={onSeeConfig}
          onComment={onComment}
          onAnswer={onAnswer}
          onBuy={onBuy}
          refetch={refetch}
        />
      </QueryClientProvider>,
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
