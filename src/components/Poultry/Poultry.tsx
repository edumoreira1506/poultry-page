import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import ReactPlayer from 'react-player'
import { ImageGallery, Timeline, Modal, Table, LinksBar, Button } from '@cig-platform/ui'
import { IAdvertising, IBreederContact, IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'
import { BsFillEggFill, BsFillMegaphoneFill } from 'react-icons/bs'
import { AiOutlineRollback } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'
import { BsShareFill } from 'react-icons/bs'
import copy from 'copy-to-clipboard'

import 'react-image-gallery/styles/css/image-gallery.css'

import imageFormatter from '../../formatters/imageFormatter'
import timelineFormatter from '../../formatters/timelineFormatter'
import dateFormatter from '../../formatters/dateFormatter'

import {
  StyledContainer,
  StyledHeaderText,
  StyledHeader,
  StyledInfoItem,
  StyledInfoKey,
  StyledInfoList,
  StyledInfoValue,
  StyledVideoContainer,
  StyledVideoTitle,
  StyledGalleryContainer,
  StyledTimeline,
  StyledTimelineTitle,
  StyledBirthDate,
  StyledBirhDateText,
  StyledPrice,
  StyledTable,
  StyledTableTitle,
  StyledTableModal,
  StyledDescription,
  StyledDescriptionTitle,
  StyledPriceContainer,
  StyledPriceDetails,
  StyledPriceButton
} from './Poultry.styles'
import { MARKETPLACE_URL } from '../../constants/url'

interface PoultryProps {
  poultry: Partial<IPoultry> & { code?: string; };
  images: IPoultryImage[];
  registers?: IPoultryRegister[];
  advertising?: IAdvertising;
  breederId?: string;
  contacts?: IBreederContact[];
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
  registers = [],
  advertising,
  breederId,
  contacts = []
}: PoultryProps) => {
  const [isPriceFixed, setIsPriceFixed] = useState(true)

  const [selectedRegister, setSelectedRegister] = useState<Partial<IPoultryRegister>>()

  const formattedImagesOfGallery = useMemo(() => images.map(i => imageFormatter(i.imageUrl)), [images])

  const formattedTimelineItems = useMemo(() => timelineFormatter(registers, poultry), [registers])

  const vaccines = useMemo(() => registers?.filter(({ type }) => type === 'VACINAÇÃO') ?? [], [registers])
  const measurementsAndWeighint = useMemo(() => registers?.filter(({ type }) => type === 'MEDIÇÃO E PESAGEM') ?? [], [registers])

  const handleScrollWindow = useCallback(() => {
    const isScrolledToBottom = (window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 140
   
    if (isScrolledToBottom && isPriceFixed) {
      setIsPriceFixed(false)
      return
    }

    if (!isScrolledToBottom && !isPriceFixed) {
      setIsPriceFixed(true)
      return
    }
  }, [isPriceFixed])

  const handleExpandTimelineItem = useCallback((key: string) => {
    if (key === 'BIRTH_DATE') setSelectedRegister({ type: 'BIRTH_DATE' })

    const register = registers.find((r) => r.id === key)

    if (!register) return

    setSelectedRegister(register)
  }, [registers])

  const handleSharePoultry = useCallback(async () => {
    const url = `${MARKETPLACE_URL}breeders/${breederId}/poultries/${poultry?.id}`

    if (navigator.share) {
      const shareDetails = { url, title: poultry.name, text: url }
      
      try {
        await navigator.share(shareDetails)
      } catch (error) {
        console.error(error)
      }
    } else {
      copy(url)

      alert('Link copiado com sucesso!')
    }
  }, [breederId, poultry])

  const handleBuy = useCallback(() => {
    alert('comprando!')
  }, [])

  const handleMessage = useCallback(() => {
    const [whatsAppContact] = contacts

    if (whatsAppContact) {
      window.location.assign(`https://api.whatsapp.com/send?phone=55${whatsAppContact.value.replace(/\D/g, '')}`)
    }
  }, [contacts])
  
  const items = useMemo(() => ([
    {
      onClick: handleSharePoultry,
      children: <BsShareFill />
    }
  ]), [handleSharePoultry])

  const handleCloseRegisterModal = useCallback(() => {
    setSelectedRegister(undefined)
  }, [])

  const formattedVaccinesRows = useMemo(() => vaccines.map(vaccine => ({
    items: [dateFormatter(String(vaccine.date)), vaccine?.metadata?.name, `${vaccine?.metadata?.dose}ª`],
    expandedContent: vaccine.description
  })).reverse(), [vaccines])

  const formattedMeasurementAndWeighintRows = useMemo(() => measurementsAndWeighint.map(register => ({
    items: [dateFormatter(String(register.date)), `${register?.metadata?.weight} KG`, `${register?.metadata?.measurement} CM`],
    expandedContent: register.description
  })).reverse(), [measurementsAndWeighint])

  useEffect(() => {
    document.addEventListener('scroll', handleScrollWindow)

    return () => document.removeEventListener('scroll', handleScrollWindow)
  }, [handleScrollWindow])

  return (
    <StyledContainer>
      <LinksBar items={items} />
      
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

        {selectedRegister?.type === 'ANÚNCIO' && (
          <StyledBirthDate>
            <StyledBirhDateText>
              {selectedRegister?.description} 
            </StyledBirhDateText>
            <BsFillMegaphoneFill />
          </StyledBirthDate>
        )}

        {selectedRegister?.type === 'REMOÇÃO DE ANÚNCIO' && (
          <StyledBirthDate>
            <StyledBirhDateText>
              {selectedRegister?.description} 
            </StyledBirhDateText>
            <AiOutlineRollback />
          </StyledBirthDate>
        )}

        {selectedRegister?.type === 'TRANSFERÊNCIA' && (
          <StyledBirthDate>
            <StyledBirhDateText>
              {selectedRegister?.description} 
            </StyledBirhDateText>
            <BiTransfer />
          </StyledBirthDate>
        )}

        {selectedRegister?.type === 'VACINAÇÃO' && (
          <StyledTableModal>
            <Table
              columns={['Data', 'Nome', 'Dose']}
              rows={[{ items: [dateFormatter(String(selectedRegister?.date)), selectedRegister?.metadata?.name, `${selectedRegister?.metadata?.dose}ª`], expandedContent: String(selectedRegister?.description) }]}
              hasExpandColumn
            />
          </StyledTableModal>
        )}

        {selectedRegister?.type === 'MEDIÇÃO E PESAGEM' && (
          <StyledTableModal>
            <Table
              columns={['Data', 'Peso', 'Medida']}
              rows={[{ items: [dateFormatter(String(selectedRegister?.date)), `${selectedRegister?.metadata?.weight} KG`, `${selectedRegister?.metadata?.measurement} CM`], expandedContent: String(selectedRegister?.description) }]}
              hasExpandColumn
            />
          </StyledTableModal>
        )}
      </Modal>

      <StyledHeader>
        <StyledHeaderText>{poultry.name}</StyledHeaderText>
        <StyledHeaderText>{poultry.code}</StyledHeaderText>
      </StyledHeader>

      {Boolean(images.length) && (
        <StyledGalleryContainer>
          <ImageGallery
            items={formattedImagesOfGallery}
            showPlayButton={false}
          />
        </StyledGalleryContainer>
      )}

      {poultry?.description && (
        <>
          <StyledDescriptionTitle>
          Descrição
          </StyledDescriptionTitle>
          <StyledDescription>
            {poultry.description}
          </StyledDescription>
        </>
      )}

      <StyledInfoList>
        {poultry?.type && (
          <StyledInfoItem>
            <StyledInfoKey>
            Raça
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry.type}
            </StyledInfoValue>
          </StyledInfoItem>
        )}        

        {poultry?.birthDate && (
          <StyledInfoItem>
            <StyledInfoKey>
            Data de nascimento
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry?.birthDate?.toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.colors?.plumage && (
          <StyledInfoItem>
            <StyledInfoKey>
              Cor da plumagem
            </StyledInfoKey>
            <StyledInfoValue>
              {getColor(poultry?.colors?.plumage)}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.colors?.eyes && (
          <StyledInfoItem>
            <StyledInfoKey>
              Cor dos olhos
            </StyledInfoKey>
            <StyledInfoValue>
              {getColor(poultry?.colors?.eyes)}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.colors?.shins && (
          <StyledInfoItem>
            <StyledInfoKey>
            Cor das canelas
            </StyledInfoKey>
            <StyledInfoValue>
              {getColor(poultry?.colors?.shins)}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.tail && (
          <StyledInfoItem>
            <StyledInfoKey>
            Rabo
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry.tail}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.crest && (
          <StyledInfoItem>
            <StyledInfoKey>
              Crista
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry.crest}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.dewlap && (
          <StyledInfoItem>
            <StyledInfoKey>
              Barbela
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry.dewlap}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.gender && (
          <StyledInfoItem>
            <StyledInfoKey>
            Sexagem
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry.gender}
            </StyledInfoValue>
          </StyledInfoItem>
        )}
      </StyledInfoList>

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

      {Boolean(formattedTimelineItems.length) && (
        <StyledTimeline>
          <StyledTimelineTitle>Histórico</StyledTimelineTitle>
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

      {advertising && (
        <StyledPriceContainer isFixed={isPriceFixed}>
          <StyledPrice>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(advertising.price / 100)} à Vista
          </StyledPrice>
          <StyledPriceDetails>
            {Boolean(contacts.length) && (
              <StyledPriceButton>
                <Button onClick={handleMessage} type='button'>
                  Mensagem
                </Button>
              </StyledPriceButton>
            )}

            <StyledPriceButton>
              <Button onClick={handleBuy} type='button'>
                Comprar
              </Button>
            </StyledPriceButton>
          </StyledPriceDetails>
        </StyledPriceContainer>
      )}
    </StyledContainer>
  )
}

export default Poultry
