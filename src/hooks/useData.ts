import { IAdvertising, IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'
import { useQuery } from 'react-query'

import ContentSearchClient from '../clients/ContentSearchClient'

interface Data {
  poultry: IPoultry & {
    images: IPoultryImage[];
    code: string;
  };
  registers: IPoultryRegister[];
  advertisings: IAdvertising[];
  vaccines: IPoultryRegister[];
  measurementAndWeigthing: IPoultryRegister[];
}

export default function useData(breederId: string, poultryId: string) {
  return useQuery<Data>(
    ['getPoultryData', breederId, poultryId],
    () => ContentSearchClient.getPoultry(breederId, poultryId)
  )
}
