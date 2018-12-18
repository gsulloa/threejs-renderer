import React, { PureComponent } from "react"
import styled from "styled-components"

const Overlay = styled.div`
  position: absolute;
  width: 300px;
  height: 100%;
`

const Panel = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  padding: 15px;
`

const Title = styled.h1`
  color: white;
  font-family: sans-serif;
`
const Text = styled.p`
  color: white;
  font-family: sans-serif;
`

class InfoPanel extends PureComponent {
  state = {
    show: false,
    title: "",
    content: "",
  }
  showPanel = ({ title, content }) => {
    this.setState(() => ({
      show: true,
      title,
      content
    }))
  }
  hidePanel = () => {
    this.setState(() => ({
      show: false,
      title: "",
      content: ""
    }))
  }
  render() {
    console.log(this.state)
    const { show, title, content } = this.state
    return (
      <Overlay hidden={!show}>
        <Panel>
          <Title>{title}</Title>
          <Text>{content}</Text>
        </Panel>
      </Overlay>
    )
  }
}

export default InfoPanel
