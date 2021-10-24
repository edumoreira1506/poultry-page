import React, { FC, useMemo } from 'react'
import ReactPlayer from 'react-player'
import { ImageGallery } from '@cig-platform/ui'
import { IPoultry, IPoultryImage } from '@cig-platform/types'

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
  StyledGalleryContainer
} from './Poultry.styles'

interface PoultryProps {
  poultry: IPoultry;
  images: IPoultryImage[];
}

const COLORS: Record<string, string> = {
  '#000000': 'Preto',
  '#ffffff': 'Branco'
}

const getColor = (originalColor = '') => {
  const color = COLORS?.[originalColor] ?? COLORS['#000000']

  return color
}

const Poultry: FC<PoultryProps> = ({ poultry, images }: PoultryProps) => {
  const formattedImagesOfGallery = useMemo(() => images.map((image) => ({
    original: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/images/${image.imageUrl}`,
    thumbnail: `https://cig-maketplace.s3.sa-east-1.amazonaws.com/poultries/images/${image.imageUrl}`,
  })), [])

  return (
    <StyledContainer>
      <StyledTitle>{poultry.name}</StyledTitle>

      <StyledDescription>
        {poultry.description}
      </StyledDescription>

      {poultry.videos.presentation && (
        <StyledVideoContainer>
          <StyledVideoTitle>Vídeo de apresentação</StyledVideoTitle>
          <ReactPlayer url={poultry.videos.presentation} />
        </StyledVideoContainer>
      )}

      {poultry.videos.walking && (
        <StyledVideoContainer>
          <StyledVideoTitle>Vídeo andando</StyledVideoTitle>
          <ReactPlayer url={poultry.videos.walking} />
        </StyledVideoContainer>
      )}

      {poultry.videos.measurement && (
        <StyledVideoContainer>
          <StyledVideoTitle>Vídeo de medição</StyledVideoTitle>
          <ReactPlayer url={poultry.videos.measurement} />
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
    </StyledContainer>
  )
}

export default Poultry
