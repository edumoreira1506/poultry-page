import React, { FC, useCallback, useMemo, useState } from 'react'
import ReactPlayer from 'react-player'
import { ImageGallery, Timeline, Modal, Table } from '@cig-platform/ui'
import { IAdvertising, IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'
import { BsFillEggFill } from 'react-icons/bs'

import 'react-image-gallery/styles/css/image-gallery.css'

import imageFormatter from '../../formatters/imageFormatter'
import timelineFormatter from '../../formatters/timelineFormatter'

import {
  StyledContainer,
  StyledTitle,
  StyledInfoItem,
  StyledInfoKey,
  StyledInfoList,
  StyledInfoValue,
  StyledDescription,
  StyledVideoContainer,
  StyledVideoTitle,
  StyledGalleryContainer,
  StyledTimeline,
  StyledTimelineTitle,
  StyledBirthDate,
  StyledBirhDateText,
  StyledPrice,
  StyledTable,
  StyledTableTitle
} from './Poultry.styles'

interface PoultryProps {
  poultry: IPoultry;
  images: IPoultryImage[];
  registers: IPoultryRegister[];
  advertising?: IAdvertising;
}

const COLORS: Record<string, string> = {
  '#000000': 'Preto',
  '#ffffff': 'Branco'
}

const getColor = (originalColor = '') => {
  const color = COLORS?.[originalColor] ?? COLORS['#000000']

  return color
}

const Poultry: FC<PoultryProps> = ({
  poultry,
  images,
  registers,
  advertising
}: PoultryProps) => {
  const [selectedRegister, setSelectedRegister] = useState<Partial<IPoultryRegister>>()

  const formattedImagesOfGallery = useMemo(() => images.map(i => imageFormatter(i.imageUrl)), [images])

  const formattedTimelineItems = useMemo(() => timelineFormatter(registers, poultry), [registers])

  const vaccines = useMemo(() => registers?.filter(({ type }) => type === 'VACINAÇÃO') ?? [], [registers])
  const measurementsAndWeighint = useMemo(() => registers?.filter(({ type }) => type === 'MEDIÇÃO E PESAGEM') ?? [], [registers])

  const handleExpandTimelineItem = useCallback((key: string) => {
    if (key === 'BIRTH_DATE') setSelectedRegister({ type: 'BIRTH_DATE' })

    const register = registers.find((r) => r.id === key)

    if (!register) return

    setSelectedRegister(register)
  }, [registers])

  const handleCloseRegisterModal = useCallback(() => {
    setSelectedRegister(undefined)
  }, [])

  const formattedVaccinesRows = useMemo(() => vaccines.map(vaccine => ({
    items: [new Intl.DateTimeFormat('pt-BR').format(new Date(vaccine.date)), vaccine?.metadata?.name, `${vaccine?.metadata?.dose}ª`],
    expandedContent: vaccine.description
  })).reverse(), [vaccines])

  const formattedMeasurementAndWeighintRows = useMemo(() => measurementsAndWeighint.map(register => ({
    items: [new Intl.DateTimeFormat('pt-BR').format(new Date(register.date)), `${register?.metadata?.weight} KG`, `${register?.metadata?.measurement} CM`],
    expandedContent: register.description
  })).reverse(), [measurementsAndWeighint])

  return (
    <StyledContainer>
      <Modal isOpen={Boolean(selectedRegister)} onClose={handleCloseRegisterModal}>
        {selectedRegister?.type === 'IMAGENS' && (
          <ImageGallery
            showPlayButton={false}
            items={selectedRegister?.files?.map(file => imageFormatter(file.fileName, 'registers')) ?? []}
          />
        )}

        {selectedRegister?.type === 'BIRTH_DATE' && (
          <StyledBirthDate>
            <StyledBirhDateText>
              {['Animal foi registrado em', new Intl.DateTimeFormat('pt-BR').format(poultry.birthDate)].join(' ')} 
            </StyledBirhDateText>
            <BsFillEggFill />
          </StyledBirthDate>
        )}
      </Modal>

      <StyledTitle>{poultry.name}</StyledTitle>

      <StyledDescription>
        {poultry.description}
      </StyledDescription>

      {poultry.videos?.presentation && (
        <StyledVideoContainer>
          <StyledVideoTitle>Vídeo de apresentação</StyledVideoTitle>
          <ReactPlayer url={poultry.videos?.presentation} />
        </StyledVideoContainer>
      )}

      {poultry.videos?.walking && (
        <StyledVideoContainer>
          <StyledVideoTitle>Vídeo andando</StyledVideoTitle>
          <ReactPlayer url={poultry.videos?.walking} />
        </StyledVideoContainer>
      )}

      {poultry.videos?.measurement && (
        <StyledVideoContainer>
          <StyledVideoTitle>Vídeo de medição</StyledVideoTitle>
          <ReactPlayer url={poultry.videos?.measurement} />
        </StyledVideoContainer>
      )}

      {Boolean(images.length) && (
        <StyledGalleryContainer>
          <ImageGallery
            items={formattedImagesOfGallery}
            showPlayButton={false}
          />
        </StyledGalleryContainer>
      )}

      {Boolean(formattedTimelineItems.length) && (
        <StyledTimeline>
          <StyledTimelineTitle>Registros do animal</StyledTimelineTitle>
          <Timeline items={formattedTimelineItems} onExpandItem={handleExpandTimelineItem} />
        </StyledTimeline>
      )}

      {Boolean(vaccines.length) && (
        <>
          <StyledTableTitle>Vacinas aplicadas</StyledTableTitle>
          <StyledTable>
            <Table
              hasExpandColumn
              columns={['Data', 'Nome', 'Dose']}
              rows={formattedVaccinesRows}
            />
          </StyledTable>
        </>
      )}

      {Boolean(measurementsAndWeighint.length) && (
        <>
          <StyledTableTitle>AMFA</StyledTableTitle>
          <StyledTable>
            <Table
              hasExpandColumn
              columns={['Data', 'Peso', 'Medida']}
              rows={formattedMeasurementAndWeighintRows}
            />
          </StyledTable>
        </>
      )}

      <StyledInfoList>
        <StyledInfoItem>
          <StyledInfoKey>
            Raça
          </StyledInfoKey>
          <StyledInfoValue>
            {poultry.type}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Data de nascimento
          </StyledInfoKey>
          <StyledInfoValue>
            {poultry.birthDate.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Cor da plumagem
          </StyledInfoKey>
          <StyledInfoValue>
            {getColor(poultry.colors.plumage)}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Cor dos olhos
          </StyledInfoKey>
          <StyledInfoValue>
            {getColor(poultry.colors.eyes)}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Cor das canelas
          </StyledInfoKey>
          <StyledInfoValue>
            {getColor(poultry.colors.shins)}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Rabo
          </StyledInfoKey>
          <StyledInfoValue>
            {poultry.tail}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Crista
          </StyledInfoKey>
          <StyledInfoValue>
            {poultry.crest}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Barbela
          </StyledInfoKey>
          <StyledInfoValue>
            {poultry.dewlap}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Sexagem
          </StyledInfoKey>
          <StyledInfoValue>
            {poultry.gender}
          </StyledInfoValue>
        </StyledInfoItem>
      </StyledInfoList>

      {advertising && (
        <StyledPrice>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(advertising.price / 100)}</StyledPrice>
      )}
    </StyledContainer>
  )
}

export default Poultry
