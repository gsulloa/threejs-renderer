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
  background: red;
  opacity: 0.8;
  padding: 15px;
`

const Title = styled.h1``
const Text = styled.p``

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
