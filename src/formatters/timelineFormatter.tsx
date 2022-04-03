import React, { ReactNode } from 'react'
import { IPoultry, IPoultryRegister } from '@cig-platform/types'
import { AiFillFileImage, AiOutlineRollback } from 'react-icons/ai'
import { BiPlusMedical, BiTransfer } from 'react-icons/bi'
import { BsRulers, BsFillEggFill, BsFillMegaphoneFill } from 'react-icons/bs'
import { RegisterTypeEnum } from '@cig-platform/enums'

const icons: Record<string, ReactNode> = {
  [RegisterTypeEnum.Images]: <AiFillFileImage />,
  [RegisterTypeEnum.MeasurementAndWeighing]: <BsRulers />,
  [RegisterTypeEnum.Vaccination]: <BiPlusMedical />,
  [RegisterTypeEnum.Advertising]: <BsFillMegaphoneFill />,
  [RegisterTypeEnum.RemoveAdvertising]: <AiOutlineRollback />,
  [RegisterTypeEnum.Transfer]: <BiTransfer />
}

export default function timelineFormatter(registers: IPoultryRegister[] = [], poultry: Partial<IPoultry>) {
  const birthDateRegister = {
    key: 'BIRTH_DATE',
    description: 'Primeiro registro do animal',
    date: poultry?.birthDate,
    icon: <BsFillEggFill />
  }

  return [
    poultry?.birthDate ? birthDateRegister : undefined,
    ...registers.reverse().map(register => ({
      key: register.id,
      description: register.description,
      date: register.date,
      icon: icons?.[register.type] ?? null
    }))
  ].filter(Boolean)
}
