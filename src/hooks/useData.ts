import {
  IAdvertising,
  IBreederContact,
  IPoultry,
  IPoultryImage,
  IPoultryRegister,
  IAdvertisingQuestion,
  IAdvertisingQuestionAnswer
} from '@cig-platform/types'
import { useQuery } from 'react-query'

import ContentSearchClient from '../clients/ContentSearchClient'

interface Question extends IAdvertisingQuestion {
  answers: IAdvertisingQuestionAnswer[];
}

interface Advertising extends IAdvertising {
  questions: Question[];
}

interface Data {
  poultry: IPoultry & {
    images: IPoultryImage[];
    code: string;
  };
  registers: IPoultryRegister[];
  advertisings: Advertising[];
  vaccines: IPoultryRegister[];
  measurementAndWeigthing: IPoultryRegister[];
  whatsAppContacts: IBreederContact[]
}

export default function useData(breederId: string, poultryId: string) {
  return useQuery<Data>(
    ['getPoultryData', breederId, poultryId],
    () => ContentSearchClient.getPoultry(breederId, poultryId)
  )
}
