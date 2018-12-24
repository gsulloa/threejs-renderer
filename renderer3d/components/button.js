import styled from "styled-components"

export const CircleButton = styled.button`
  background: ${({ selected }) => (selected ? "#bbb" : "#eaeaea")};
  fill: ${({ selected }) => (selected ? "#666" : "#000")};
  border: solid black 1px;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin: 10px;
  outline: none;
`
