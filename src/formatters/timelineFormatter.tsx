import React, { ReactNode } from 'react'
import { IPoultry, IPoultryRegister } from '@cig-platform/types'
import { AiFillFileImage, AiOutlineRollback } from 'react-icons/ai'
import { BiPlusMedical, BiTransfer } from 'react-icons/bi'
import { BsRulers, BsFillEggFill, BsFillMegaphoneFill } from 'react-icons/bs'

const icons: Record<string, ReactNode> = {
  IMAGENS: <AiFillFileImage />,
  'MEDIÇÃO E PESAGEM': <BsRulers />,
  'VACINAÇÃO': <BiPlusMedical />,
  'ANÚNCIO': <BsFillMegaphoneFill />,
  'REMOÇÃO DE ANÚNCIO': <AiOutlineRollback />,
  'TRANSFERÊNCIA': <BiTransfer />
}

export default function timelineFormatter(registers: IPoultryRegister[], poultry: IPoultry) {
  const birthDateRegister = {
    key: 'BIRTH_DATE',
    description: 'Primeiro registro do animal',
    date: poultry.birthDate,
    icon: <BsFillEggFill />
  }

  return [
    birthDateRegister,
    ...registers.reverse().map(register => ({
      key: register.id,
      description: register.description,
      date: register.date,
      icon: icons?.[register.type] ?? null
    }))
  ]
}
