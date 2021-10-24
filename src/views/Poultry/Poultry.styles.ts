import styled from 'styled-components'
import { MAIN_FONT, Colors, createMinWidthMediaQuery } from '@cig-platform/ui'

export const StyledContainer = styled.main`
  width: 100%;
  height: 100%;
  font-family: ${MAIN_FONT};
`

export const StyledTitle = styled.p`
  text-align: center;
  margin: 20px 0;
  font-weight: bold;
  font-size: 1.5em;
`

export const StyledDescription = styled.p`
  margin-bottom: 25px;

  ${createMinWidthMediaQuery(`
    width: 50%;
    margin: 0 auto;
    padding-bottom: 25px;
  `)}
`

export const StyledInfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${Colors.DarkGrey};

  ${createMinWidthMediaQuery(`
    margin: 0 auto;
    width: 50%;
  `)}
`

export const StyledInfoItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

export const StyledInfoKey = styled.div`
  font-weight: bold;
`

export const StyledInfoValue = styled.div`
  font-weight: light;
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

    ${createMinWidthMediaQuery(`
      width: 50% !important;
      height: 400px !important;
      max-width: 1280px;
      margin: 0 auto;
    `)}
  }
`

export const StyledVideoTitle = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`
