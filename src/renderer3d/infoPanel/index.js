import React, { PureComponent } from "react"
import { Overlay, Panel } from "../components/containers"
import { Title, Text } from "../components/text"

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
      content,
    }))
  }
  hidePanel = () => {
    this.setState(() => ({
      show: false,
      title: "",
      content: "",
    }))
  }
  render() {
    const { show, title, content } = this.state
    return (
      <Overlay hidden={!show} width="300px">
        <Panel>
          <Title>{title}</Title>
          <Text>{content}</Text>
        </Panel>
      </Overlay>
    )
  }
}

export default InfoPanel
