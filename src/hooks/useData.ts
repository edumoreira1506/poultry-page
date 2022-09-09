import {
  IAdvertising,
  IBreederContact,
  IPoultry,
  IPoultryImage,
  IPoultryRegister,
  IAdvertisingQuestion,
  IAdvertisingQuestionAnswer,
  IUser,
  IBreeder
} from '@cig-platform/types'
import { useData as useDataFromDataHelper } from '@cig-platform/data-helper'

import ContentSearchClient from '../clients/ContentSearchClient'

interface AdvertisingQuestionAnswer extends IAdvertisingQuestionAnswer {
  user: IUser;
}

interface Question extends IAdvertisingQuestion {
  answers: AdvertisingQuestionAnswer[];
  user: IUser;
  breeder?: IBreeder;
}

export interface Advertising extends IAdvertising {
  questions: Question[];
  favorites: number;
  deals: number;
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
  whatsAppContacts: IBreederContact[];
  breeder: IBreeder;
}

export default function useData(breederId: string, poultryId: string) {
  return useDataFromDataHelper<Data>(
    'getPoultryData',
    () => ContentSearchClient.getPoultry(breederId, poultryId),
    [breederId, poultryId],
    {}
  )
}
