import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import PoultryContainer from './containers/PoultryContainer/PoultryContainer'

const queryClient = new QueryClient();

(window as any).renderPoultryPage = (containerId: string, breederId: string, poultryId: string) => {
  const targetDocument = document.getElementById(containerId)

  if (targetDocument) {
    ReactDOM.render(
      <QueryClientProvider client={queryClient}>
        <PoultryContainer poultryId={poultryId} breederId={breederId} />
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
