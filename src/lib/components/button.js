import styled from "styled-components"
import { GRAY, GRAY_HOVER, WHITE, WHITE_HOVER } from "../constants"

export const CircleButton = styled.button`
  background: ${({ selected }) => (selected ? WHITE : GRAY)};
  fill: ${({ selected }) => (selected ? GRAY : WHITE)};
  color: ${({ selected }) => (selected ? GRAY : WHITE)};
  opacity: ${({ selected }) => (selected ? "0.8" : "1")};
  border: solid black 1px;
  border-radius: 7px;
  width: ${({ size }) => (size ? size : "50")}px;
  height: ${({ size }) => (size ? size : "50")}px;
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
    color: ${GRAY};
  }
  span {
    font-size: 20px;
    font-weight: 700;
  }
  transition-duration: 0.4s;
`

export const InverseCircleButton = styled(CircleButton)`
  background: ${({ selected }) => (!selected ? WHITE : GRAY)};
  fill: ${({ selected }) => (!selected ? GRAY : WHITE)};
  color: ${({ selected }) => (!selected ? GRAY : WHITE)};
  &:hover {
    background: ${({ selected }) => (!selected ? WHITE_HOVER : GRAY_HOVER)};
  }
  &:active {
    background: ${GRAY};
    fill: ${WHITE};
    color: ${WHITE};
  }
  transition-duration: 0.4s;
`
