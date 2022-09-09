import { IPoultry } from '@cig-platform/types'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import Poultry, { PoultryProps } from '../../components/Poultry/Poultry'
import useData from '../../hooks/useData'
import stringToDate from '../../utils/stringToDate'
import ContentSearchClient from '../../clients/ContentSearchClient'

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

  const [poultries, setPoultries] = useState<IPoultry[]>([])

  const poultry = useMemo(() => ({
    ...(data?.poultry ?? {}),
    birthDate: data?.poultry?.birthDate && stringToDate(String(data?.poultry?.birthDate))
  }), [data?.poultry])

  const registers = useMemo(() => data?.registers?.map((register) => ({
    ...register,
    date: stringToDate(register.date as any),
  })), [data?.registers])

  const handleClickExpandButton = useCallback(async (poultryId: string) => {
    try {
      const poultryData = await ContentSearchClient.getPoultry(breederId, poultryId)
      const poultry = poultryData?.poultry
      const parents: IPoultry[] = []

      if (poultry?.mom) {
        parents.push(poultry.mom)
      }

      if (poultry?.dad) {
        parents.push(poultry.dad)
      }

      setPoultries(prevPoultries => [
        ...prevPoultries,
        ...parents
      ])
    } catch (error) {
      console.log(error)
    } 
  }, [breederId, poultryId])

  useEffect(() => {
    if (isLoading || !data?.poultry) return

    (async () => {
      try {
        const poultry = data?.poultry
        const parents = []

        if (poultry?.mom) {
          parents.push(poultry.mom)
        }

        if (poultry?.dad) {
          parents.push(poultry.dad)
        }

        setPoultries([
          poultry,
          ...parents
        ])
      } catch (error) {
        console.log(error)
      }
    })()
  }, [isLoading])

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
      onExpandTree={handleClickExpandButton}
      poultries={poultries}
    />
  )
}

export default PoultryContainer
