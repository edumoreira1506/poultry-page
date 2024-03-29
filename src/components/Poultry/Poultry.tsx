import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import ReactPlayer from 'react-player'
import {
  ImageGallery,
  Timeline,
  Modal,
  Table,
  LinksBar,
  Button,
  CommentList,
  InfoCounter,
  Colors,
  Tree,
  SocialMediaShareModal
} from '@cig-platform/ui'
import { IBreeder, IBreederContact, IPoultry, IPoultryImage, IPoultryRegister } from '@cig-platform/types'
import { BsFillEggFill, BsFillMegaphoneFill } from 'react-icons/bs'
import { AiOutlineRollback, AiFillEdit, AiFillHeart } from 'react-icons/ai'
import { BiTransfer } from 'react-icons/bi'
import { BsShareFill, BsFillGearFill } from 'react-icons/bs'
import { GiReceiveMoney, GiHastyGrave } from 'react-icons/gi'
import { RegisterTypeEnum } from '@cig-platform/enums'

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
  StyledPriceButton,
  StyledCommentsContainer,
  StyledCommentsTitle,
  StyledDetails,
  StyledDetail,
  StyledDeathWarning,
  StyledTree
} from './Poultry.styles'
import { MARKETPLACE_URL } from '../../constants/url'
import { Advertising } from '../../hooks/useData'

export interface PoultryProps {
  poultry: Partial<IPoultry> & { code?: string; };
  images: IPoultryImage[];
  registers?: IPoultryRegister[];
  advertising?: Advertising;
  breederId?: string;
  contacts?: IBreederContact[];
  onEditAdvertising?: ({ breederId, advertisingId, poultryId }: { breederId: string; poultryId: string; advertisingId: string; }) => void;
  onComment?: ({ comment, advertisingId }: { comment: string; advertisingId: string }) => void;
  onAnswer?: ({ comment, advertisingId, commentId }: { comment: string; advertisingId: string; commentId: string; }) => void;
  onSeeConfig?: () => void;
  onBuy?: ({ advertisingId, breederId, poultryId }: { breederId: string; poultryId: string; advertisingId: string; }) => void;
  breeder: IBreeder;
  poultries?: IPoultry[]
  onExpandTree?: (poultryId: string) => void;
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
  images = [],
  registers = [],
  advertising,
  breederId,
  contacts = [],
  onEditAdvertising,
  onSeeConfig,
  breeder,
  onAnswer,
  onComment,
  onBuy,
  poultries = [],
  onExpandTree
}: PoultryProps) => {
  const [isPriceFixed, setIsPriceFixed] = useState(true)
  const [isSocialMediaShareModalOpen, setIsSocialMediaShareModalOpen] = useState(false)
  const [selectedRegister, setSelectedRegister] = useState<Partial<IPoultryRegister>>()

  const url = `${MARKETPLACE_URL}breeders/${breederId}/poultries/${poultry?.id}`

  const formattedImagesOfGallery = useMemo(() => images?.map(i => imageFormatter(i.imageUrl) ?? []), [images])

  const formattedTimelineItems = useMemo(() => timelineFormatter(registers, poultry), [registers])

  const vaccines = useMemo(() => registers?.filter(({ type }) => type === RegisterTypeEnum.Vaccination) ?? [], [registers])
  const measurementsAndWeighint = useMemo(() => registers?.filter(({ type }) => type === RegisterTypeEnum.MeasurementAndWeighing) ?? [], [registers])

  const hasAdvertising = useMemo(() => Boolean(advertising), [advertising])

  const lastMeasurement = useMemo(() =>
    measurementsAndWeighint.find(item => Boolean(Number(item?.metadata?.measurement))),
  [measurementsAndWeighint]
  )
  const lastWeighint = useMemo(() =>
    measurementsAndWeighint.find(item => Boolean(Number(item?.metadata?.weight))),
  [measurementsAndWeighint]
  )

  const handleComment = useCallback((comment: string) => {
    const advertisingId = advertising?.id ?? ''

    onComment?.({ comment, advertisingId })
  }, [onComment, advertising?.id])

  const handleAnswer = useCallback((comment: string, commentId: string) => {
    const advertisingId = advertising?.id ?? ''

    onAnswer?.({ comment, advertisingId, commentId })
  }, [onAnswer, advertising?.id])

  const handleEditAdvertising = useCallback(() => {
    if (!advertising || !poultry?.id || !breederId || !onEditAdvertising) return

    const advertisingId = advertising?.id
    
    onEditAdvertising({ poultryId: poultry.id, breederId, advertisingId })
  }, [onEditAdvertising, poultry, breederId, advertising])

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
    if (navigator.share) {
      const shareDetails = { url, title: poultry.name, text: url }
      
      try {
        await navigator.share(shareDetails)
      } catch (error) {
        console.error(error)
      }
    } else {
      setIsSocialMediaShareModalOpen(true)
    }
  }, [breederId, poultry, url])

  const handleCloseSocialMediaShareModal = useCallback(() => {
    setIsSocialMediaShareModalOpen(false)
  }, [])

  const handleBuy = useCallback(() => {
    const advertisingId = advertising?.id ?? ''
    const poultryId = poultry?.id ?? ''

    onBuy?.({
      advertisingId,
      breederId: String(breederId),
      poultryId
    })
  }, [onBuy, advertising, breederId, poultry])

  const handleMessage = useCallback(() => {
    const [whatsAppContact] = contacts

    if (whatsAppContact) {
      window.location.assign(`https://api.whatsapp.com/send?phone=55${whatsAppContact.value.replace(/\D/g, '')}`)
    }
  }, [contacts])
  
  const items = useMemo<any>(() => ([
    {
      onClick: handleSharePoultry,
      children: <BsShareFill />,
      identifier: 'share-poultry'
    },
    advertising && onEditAdvertising && poultry.isAlive && {
      onClick: handleEditAdvertising,
      children: <AiFillEdit />,
      identifier: 'edit-advertising'
    },
    onSeeConfig && poultry.isAlive && {
      onClick: onSeeConfig,
      children: <BsFillGearFill />,
      identifier: 'see-config'
    }
  ].filter(Boolean)), [handleSharePoultry, advertising, onSeeConfig, poultry?.isAlive])

  const handleCloseRegisterModal = useCallback(() => {
    setSelectedRegister(undefined)
  }, [])

  const formattedVaccinesRows = useMemo(() => vaccines.map(vaccine => ({
    items: [dateFormatter(String(vaccine.date)), vaccine?.metadata?.name, `${vaccine?.metadata?.dose}ª`],
    expandedContent: vaccine.description
  })).reverse(), [vaccines])

  const formattedMeasurementAndWeighintRows = useMemo(() => measurementsAndWeighint.map(register => ({
    items: [
      dateFormatter(String(register.date)),
      `${register?.metadata?.weight ? `${register?.metadata?.weight} KG` : 'Não informado'}`,
      `${register?.metadata?.measurement ? `${register?.metadata?.measurement} CM` : 'Não informado'}`
    ],
    expandedContent: register.description
  })).reverse(), [measurementsAndWeighint])

  const comments = useMemo(() => advertising?.questions.map(question => ({
    name: question.breeder ? `${question.breeder.name} - ${question.user.name}` : question.user.name,
    content: question.content,
    date: new Date(question.createdAt),
    image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
    answers: question.answers.map(answer => ({
      name: `${breeder?.name} - ${answer.user.name}`,
      content: answer.content,
      date: new Date(answer.createdAt),
      image: 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png',
      identifier: answer.id
    })),
    identifier: question.id
  })) ?? [], [
    advertising?.questions,
    breeder?.name
  ])

  useEffect(() => {
    document.addEventListener('scroll', handleScrollWindow)

    return () => document.removeEventListener('scroll', handleScrollWindow)
  }, [handleScrollWindow])

  return (
    <StyledContainer>
      <SocialMediaShareModal
        isOpen={isSocialMediaShareModalOpen}
        onClose={handleCloseSocialMediaShareModal}
        url={url}
        description={url}
        title={poultry?.name}
      />

      <LinksBar items={items} />
      
      <Modal isOpen={Boolean(selectedRegister)} onClose={handleCloseRegisterModal}>
        {selectedRegister?.type === RegisterTypeEnum.Images && (
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

        {([
          RegisterTypeEnum.Advertising,
          RegisterTypeEnum.RemoveAdvertising,
          RegisterTypeEnum.Transfer,
          RegisterTypeEnum.Death
        ] as string[]).includes(selectedRegister?.type ?? '') && (
          <StyledBirthDate>
            <StyledBirhDateText>
              {selectedRegister?.description} 
            </StyledBirhDateText>

            {selectedRegister?.type === RegisterTypeEnum.Advertising && <BsFillMegaphoneFill />}
            {selectedRegister?.type === RegisterTypeEnum.RemoveAdvertising && <AiOutlineRollback />}
            {selectedRegister?.type === RegisterTypeEnum.Transfer && <BiTransfer />}
            {selectedRegister?.type === RegisterTypeEnum.Death && <GiHastyGrave />}
          </StyledBirthDate>
        )}

        {selectedRegister?.type === RegisterTypeEnum.Vaccination && (
          <StyledTableModal>
            <Table
              columns={['Data', 'Nome', 'Dose']}
              rows={[{ items: [dateFormatter(String(selectedRegister?.date)), selectedRegister?.metadata?.name, `${selectedRegister?.metadata?.dose}ª`], expandedContent: String(selectedRegister?.description) }]}
              hasExpandColumn={Boolean(selectedRegister?.description)}
            />
          </StyledTableModal>
        )}

        {selectedRegister?.type === RegisterTypeEnum.MeasurementAndWeighing && (
          <StyledTableModal>
            <Table
              columns={['Data', 'Peso', 'Medida']}
              rows={[{
                items: [
                  dateFormatter(String(selectedRegister?.date)), 
                  selectedRegister?.metadata?.weight ? `${selectedRegister.metadata.weight} KG` : 'Não informado',
                  selectedRegister?.metadata?.measurement ? `${selectedRegister.metadata.measurement} CM` : 'Não informado'
                ],
                expandedContent: String(selectedRegister?.description)
              }]}
              hasExpandColumn={Boolean(selectedRegister?.description)}
            />
          </StyledTableModal>
        )}
      </Modal>

      <StyledHeader>
        <StyledHeaderText>{poultry.name}</StyledHeaderText>
        <StyledHeaderText>{poultry.code}</StyledHeaderText>
      </StyledHeader>

      {!poultry.isAlive && (
        <StyledDeathWarning>
          Ave falecida
        </StyledDeathWarning>
      )}

      {Boolean(images?.length) && (
        <StyledGalleryContainer>
          <ImageGallery
            items={formattedImagesOfGallery}
            showPlayButton={false}
          />
        </StyledGalleryContainer>
      )}

      {hasAdvertising && (
        <StyledDetails>
          <StyledDetail>
            <InfoCounter
              amount={advertising?.favorites ?? 0}
              description="favoritos"
              icon={<AiFillHeart />}
              iconColor={Colors.DarkBlue}
            />
          </StyledDetail>

          <StyledDetail>
            <InfoCounter
              amount={advertising?.deals ?? 0}
              description="propostas"
              icon={<GiReceiveMoney />}
              iconColor={Colors.DarkBlue}
            />
          </StyledDetail>
        </StyledDetails>
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
              Sexo
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry.gender}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        {poultry?.register && (
          <StyledInfoItem>
            <StyledInfoKey>
              Nº Anilha Interna
            </StyledInfoKey>
            <StyledInfoValue>
              {poultry.register}
            </StyledInfoValue>
          </StyledInfoItem>
        )}

        <StyledInfoItem>
          <StyledInfoKey>
            Peso
          </StyledInfoKey>
          <StyledInfoValue>
            {lastWeighint?.metadata?.weight ? `${lastWeighint.metadata.weight}kg` : 'Não informado'}
          </StyledInfoValue>
        </StyledInfoItem>

        <StyledInfoItem>
          <StyledInfoKey>
            Medida
          </StyledInfoKey>
          <StyledInfoValue>
            {lastMeasurement?.metadata?.measurement ? `${lastMeasurement.metadata.measurement}cm` : 'Não informado'}
          </StyledInfoValue>
        </StyledInfoItem>
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

      {Boolean(poultries.length) && (
        <StyledTree>
          <Tree
            poultries={poultries as any}
            rootId={poultry?.id ?? ''}
            onExpand={onExpandTree}
          />
        </StyledTree>
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

      {hasAdvertising && (
        <StyledCommentsContainer>
          <StyledCommentsTitle>Perguntas</StyledCommentsTitle>
          <CommentList
            comments={comments}
            onComment={onComment ? handleComment : undefined}
            onAnswer={onAnswer ? handleAnswer : undefined}
            commentNameButton='Comentar'
          />
        </StyledCommentsContainer>
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

            {onBuy && (
              <StyledPriceButton>
                <Button onClick={handleBuy} type='button'>
                  Fazer proposta
                </Button>
              </StyledPriceButton>
            )}
          </StyledPriceDetails>
        </StyledPriceContainer>
      )}
    </StyledContainer>
  )
}

export default Poultry
