import React, { FC } from 'react'

import Poultry from '../../components/Poultry/Poultry'
import useData from '../../hooks/useData'

export interface PoultryContainerProps {
  breederId: string;
  poultryId: string;
}

const PoultryContainer: FC<PoultryContainerProps> = ({ breederId, poultryId }: PoultryContainerProps) => {
  const { data, isLoading } = useData(breederId, poultryId)

  if (isLoading || !data?.poultry) return null

  return (
    <Poultry
      images={data?.poultry?.images}
      poultry={data?.poultry}
      registers={data?.registers}
      advertising={data?.advertisings?.[0]}
    />
  )
}

export default PoultryContainer
