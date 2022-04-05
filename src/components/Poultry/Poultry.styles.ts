import styled, { css } from 'styled-components'
import { MAIN_FONT, Colors, createMinWidthMediaQuery, DEFAULT_BORDER_RADIUS } from '@cig-platform/ui'

export const StyledContainer = styled.main`
  width: 100%;
  height: 100%;
  font-family: ${MAIN_FONT};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;

  & > ul {
    top: 115px;
  }
`

export const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: fixed;
  top: 50px;
  background-color: ${Colors.White};
  z-index: 8;
  padding: 0 5px;
  width: calc(100% - 10px);
  box-shadow: 0px -3px 5px 5px rgba(0,0,0,0.74);

  ${createMinWidthMediaQuery(`
    width: calc(100% - 30px);
    padding: 0 15px;
  `)}
`

export const StyledHeaderText = styled.p`
  font-weight: bold;
  font-size: 1em;
  color: ${Colors.Black};

  &:nth-child(1) {
    text-align: left;
  }

  &:nth-child(2) {
    text-align: right;
  }
`

export const StyledDescriptionTitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  margin: 35px 0 0;
`

export const StyledDescription = styled.p`
  text-align: center;
  max-width: 800px;

  ${createMinWidthMediaQuery(`
    margin: 0 auto;
    padding-bottom: 35px;
    padding-top: 15px;
  `)}
`

export const StyledInfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 800px;

  ${createMinWidthMediaQuery(`
    margin: 0 auto;
  `)}
`

export const StyledInfoItem = styled.li`
  width: 100%;
  height: 70px;
  font-weight: bold;

  ${createMinWidthMediaQuery(`
    width: calc(50% - 15px);
  `)}
`

export const StyledInfoKey = styled.p`
  background-color: ${Colors.DarkBlue};
  color: ${Colors.White};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  padding: 4px 0;
  display: inline-block;
  font-size: 15px;
  margin: 0 0 10px;
  width: 100%;
  text-align: center;
`

export const StyledInfoValue = styled.div`
  font-size: 15px;
  text-align: center;
`

export const StyledVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;

  & > div {
    width: 100% !important;
    height: 200px !important;
    border-radius: ${DEFAULT_BORDER_RADIUS};
    overflow: hidden;
    max-width: 800px;

    ${createMinWidthMediaQuery(`
      height: 400px !important;
      margin: 0 auto;
    `)}
  }
`

export const StyledVideoTitle = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  color: ${Colors.Black};
  text-align: left;
  width: 100%;
  max-width: 800px;
`

export const StyledGalleryContainer = styled.div`
  margin-bottom: 15px;

  ${createMinWidthMediaQuery(`
    width: 50%;
    margin: 0 auto;
  `)}
`

export const StyledTimeline = styled.div`
  margin: 10px 0;
  width: 100%;
`

export const StyledTimelineTitle = styled.p`
  font-family: ${MAIN_FONT};
  text-align: left;
  color: ${Colors.Black};
  font-weight: bold;
  font-size: 1.5em;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
`

export const StyledBirthDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: lighter;
  font-size: 2em;
  text-transform: uppercase;
  color: ${Colors.LightGrey};
  font-family: ${MAIN_FONT};

  svg {
    font-size: 4em;
  }
`

export const StyledBirhDateText = styled.p`
  margin-bottom: 30px;
  text-align: center;
  font-size: 0.5em;

  ${createMinWidthMediaQuery(`
    font-size: 1em;
  `)}
`

export const StyledPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  z-index: 5;

  ${({ isFixed }: { isFixed: boolean }) => isFixed && css`
    position: fixed;
    bottom: -65px;
  `}
`

export const StyledPriceDetails = styled.div`
  background-color: ${Colors.LightGrey};
  width: calc(100% - 20px);
  transform: translateY(-15px);
  padding: 30px 10px 15px;
  border-radius: ${DEFAULT_BORDER_RADIUS};
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 35px;
`

export const StyledPriceButton = styled.div`
  width: 48%;

  &:last-child {
    button {
      background-color: #00b332;
    }
  }
`

export const StyledPrice = styled.p`
  display: inline-block;
  margin: 0 auto;
  background-color: ${Colors.DarkBlue};
  padding: 10px 15px;
  border-radius: ${DEFAULT_BORDER_RADIUS};
  color: ${Colors.White};
  font-weight: bold;
  z-index: 2;
`

export const StyledTableTitle = styled.p`
  text-align: left;
  font-weight: 600;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
  font-size: 1.5em;
`

export const StyledTable = styled.div`
  margin-bottom: 15px;
  max-width: 800px;
  width: 100%;

  ${createMinWidthMediaQuery(`
    margin: 0 auto;
    padding-bottom: 15px;
  `)}
`

export const StyledTableModal = styled.div``

export const StyledCommentsContainer = styled.div`
  width: 100%;
  max-width: 800px;
`

export const StyledCommentsTitle = styled.p``

export const StyledDetails = styled.div`
  width: 160px;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`

export const StyledDetail = styled.div`
  width: calc(50% - 5px);
`
