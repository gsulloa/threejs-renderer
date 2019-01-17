import styled from "styled-components"

const WHITE = "#fff"
const GRAY = "#494949"
const WHITE_HOVER = "#eaeaea"
const GRAY_HOVER = "#888"

export const CircleButton = styled.button`
  background: ${({ selected }) => (selected ? WHITE : GRAY)};
  fill: ${({ selected }) => (selected ? GRAY : WHITE)};
  opacity: ${({ selected }) => (selected ? "0.8" : "1")};
  border: solid black 1px;
  border-radius: 7px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 10px;
  outline: none;
  &:hover {
    background: ${({ selected }) => (selected ? WHITE_HOVER : GRAY_HOVER)};
    opacity: 1;
  }
  &:active {
    background: ${WHITE};
    fill: ${GRAY};
  }
  transition-duration: 0.4s;
`

export const InverseCircleButton = styled(CircleButton)`
  background: ${({ selected }) => (!selected ? WHITE : GRAY)};
  fill: ${({ selected }) => (!selected ? GRAY : WHITE)};
  &:hover {
    background: ${({ selected }) => (!selected ? WHITE_HOVER : GRAY_HOVER)};
  }
  &:active {
    background: ${GRAY};
    fill: ${WHITE};
  }
  transition-duration: 0.4s;
`
