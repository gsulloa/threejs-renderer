import styled from "styled-components"

export const Overlay = styled.div`
  position: absolute;
  width: ${({ width }) => (width ? width : "100%")};
  height: 100%;
  pointer-events: none;
  * {
    pointer-events: auto;
  }
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
  flex-flow: row nowrap;
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
  background: rgba(255, 255, 255, 0.2);
  padding: 0 15px;
  overflow-y: auto;
  position: relative;
  pointer-events: none;
`

export const SliderWrapper = styled.div`
  display: inline-block;
  width: 20px;
  height: 150px;
  padding: 0;
  input {
    width: 150px;
    height: 20px;
    margin: -175px;
    transform-origin: 100px 100px;
    transform: rotate(90deg);
  }
`

export const MaxLengthContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: white;
`
