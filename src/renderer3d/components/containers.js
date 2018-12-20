import styled from "styled-components"

export const Overlay = styled.div`
  position: absolute;
  width: ${({ width }) => (width ? width : "100%")};
  height: 100%;
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
  background: rgba(0, 0, 0, 0.5);
  padding: 0 15px;
  overflow-y: auto;
  position: relative;
`
