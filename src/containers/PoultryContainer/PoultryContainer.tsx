import React, { FC, useMemo } from 'react'

import Poultry, { PoultryProps } from '../../components/Poultry/Poultry'
import useData from '../../hooks/useData'
import stringToDate from '../../utils/stringToDate'

export interface PoultryContainerProps {
  breederId: string;
  poultryId: string;
  onEditAdvertising?: PoultryProps['onEditAdvertising'];
  onSeeConfig?: PoultryProps['onSeeConfig'];
  onAnswer?: PoultryProps['onAnswer'];
  onComment?: PoultryProps['onComment'];
  onBuy?: PoultryProps['onBuy'];
}

const PoultryContainer: FC<PoultryContainerProps> = ({
  breederId,
  poultryId,
  onEditAdvertising,
  onSeeConfig,
  onComment,
  onAnswer,
  onBuy
}: PoultryContainerProps) => {
  const { data, isLoading } = useData(breederId, poultryId)

  const poultry = useMemo(() => ({
    ...(data?.poultry ?? {}),
    birthDate: data?.poultry?.birthDate && stringToDate(String(data?.poultry?.birthDate))
  }), [data?.poultry])

  const registers = useMemo(() => data?.registers?.map((register) => ({
    ...register,
    date: stringToDate(register.date as any),
  })), [data?.registers])

  if (isLoading || !data?.poultry) return null

  return (
    <Poultry
      images={data?.poultry?.images}
      poultry={poultry}
      registers={registers}
      advertising={data?.advertisings?.[0]}
      breederId={breederId}
      contacts={data?.whatsAppContacts}
      onEditAdvertising={onEditAdvertising}
      onSeeConfig={onSeeConfig}
      breeder={data?.breeder}
      onComment={onComment}
      onAnswer={onAnswer}
      onBuy={onBuy}
    />
  )
}

export default PoultryContainer
