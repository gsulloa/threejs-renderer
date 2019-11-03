import React from "react"
import styled from "styled-components"
import { GRAY, WHITE } from "../constants"

export const Overlay = styled.div`
  position: absolute;
  width: ${({ width }) => (width ? width : "100%")};
  height: 100%;
  pointer-events: none;
  * {
    pointer-events: auto;
  }
  ${({ smWidth }) =>
    smWidth
      ? `
    @media (max-width: 768px) {
      width: ${smWidth};
    }
  `
      : ""}
`

const FlexOverlay = styled(Overlay)`
  flex-flow: column nowrap;
  display: flex;
`

export const CenteredOverlay = styled(FlexOverlay)`
  justify-content: center;
  align-items: center;
`

export const EndOverlay = styled(FlexOverlay)`
  align-items: flex-end;
`

export const BottomEndOverlay = styled(EndOverlay)`
  justify-content: flex-end;
  flex-flow: column wrap;
  @media (max-height: 620px) {
    flex-direction: row;
  }
`

const Div = styled.div`
  display: flex;
  flex-wrap: ${({ wrap }) => (wrap ? "" : "no")}wrap;
`

export const Col = styled(Div)`
  flex-direction: column;
`
export const Row = styled(Div)`
  flex-direction: row;
`

export const LoadingBar = styled.div`
  width: 25em;
  height: 1em;
  border-radius: 0.25em;
  background-color: black;
  border: 1px solid grey;
  display: inline-flex;
`
export const Panel = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  padding: 0 15px;
  overflow-y: auto;
  position: relative;
  pointer-events: none;
`

export const SliderWrapper = styled.div`
  display: inline-block;
  color: ${WHITE}
  background: ${GRAY}
  width: 50px;
  height: 170px;
  border-radius: 7px;
  padding: 0;
  margin: 10px;
  div {
    width: 170px;
    height: 20px;
    margin: 10px -163px;
    transform-origin: 100px 100px;
    transform: rotate(90deg);
    
  }
  input {
    appearance: none;
    background: ${WHITE};
    height: 3px;
    width: 150px;
    outline: none;
    &::-webkit-slider-thumb {
      appearance: none;
      width: 14px;
      height: 32px;
      background: ${GRAY};
      border: 3px ${WHITE} solid;
      border-radius: 7px;
      cursor: pointer;
    }
    
    &::-moz-range-thumb {
      appearance: none;
      width: 14px;
      height: 32px;
      background: ${GRAY};
      border: 3px ${WHITE} solid;
      border-radius: 7px;
      cursor: pointer;
    }
  }
`

export const MaxLengthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: white;
`

const TooltipText = styled.span`
  opacity: 0;
  min-width: 120px;
  max-width: 300px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  border: solid 1px white;
  position: absolute;
  z-index: 1;
  left: -50%;
  bottom: 80%;
  transition: opacity 0.2s;
  pointer-events: none;
`

const TooltipContainer = styled.div`
  position: relative;
  pointer-events: none;
  &:hover ${TooltipText} {
    opacity: 1;
  }
`

export const Tooltip = ({ children, text, ...props }) => {
  return (
    <TooltipContainer>
      <TooltipText>{text}</TooltipText>
      {children}
    </TooltipContainer>
  )
}
