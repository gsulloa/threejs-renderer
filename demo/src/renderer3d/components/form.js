import styled from "styled-components"

export const TitleInput = styled.textarea`
  background: transparent;
  border: none;
  color: white;
  font-family: sans-serif;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  height: ${props => props.height}px;
  width: 100%;
  outline: none;
  resize: none;
  overflow: hidden;
  border-bottom: 1px solid;
`

export const ContentInput = styled.textarea`
  background: transparent;
  border: none;
  color: white;
  font-family: sans-serif;
  font-size: 1em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  height: ${props => props.height}px;
  width: 100%;
  outline: none;
  resize: none;
  overflow: hidden;
  border-bottom: 1px solid;
`
