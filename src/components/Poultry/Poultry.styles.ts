import styled from 'styled-components'
import { MAIN_FONT, Colors, createMinWidthMediaQuery, DEFAULT_BORDER_RADIUS } from '@cig-platform/ui'

export const StyledContainer = styled.main`
  width: 100%;
  height: 100%;
  font-family: ${MAIN_FONT};
  display: flex;
  flex-direction: column;
`

export const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
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
  width: calc(50% - 5px);
  height: 70px;
  font-weight: bold;
`

export const StyledInfoKey = styled.p`
  background-color: ${Colors.DarkBlue};
  color: ${Colors.White};
  border-radius: ${DEFAULT_BORDER_RADIUS};
  padding: 4px 10px;
  display: inline-block;
  font-size: 15px;
  margin: 0 0 10px;
`

export const StyledInfoValue = styled.div`
  font-size: 15px;
  padding-left: 5px;
`

export const StyledVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

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

export const StyledPrice = styled.p`
  display: inline-block;
  margin: 0 auto;
  background-color: ${Colors.DarkBlue};
  padding: 10px 15px;
  border-radius: ${DEFAULT_BORDER_RADIUS};
  color: ${Colors.White};
  font-weight: bold;
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
