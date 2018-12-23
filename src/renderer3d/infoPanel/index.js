import React, { PureComponent } from "react"
import styled from "styled-components"
import { Overlay, Panel } from "../components/containers"
import { Title, Text } from "../components/text"
import config from "../config"

const Column = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
`

const Button = styled.button`
  line-height: 1.499;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  height: 32px;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: relative;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  border-color: #d9d9d9;
`
class InfoPanel extends PureComponent {
  state = {
    show: false,
    title: "",
    content: "",
    editing: config.object.editing,
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
  handleChangeDefaultLook = () => {
    config.controllers.attachmentsController.updateScreenPosition()
  }
  render() {
    const { show, title, content, editing } = this.state
    return (
      <Overlay hidden={!show} width="300px">
        <Panel>
          <Title>{title}</Title>
          <Text>{content}</Text>
          {editing && [
            <hr key="divider" />,
            <Column key="options">
              <Button onClick={this.handleChangeDefaultLook}>
                Set Camera as Default
              </Button>
              <Button>Replace</Button>
              <Button>Remove</Button>
            </Column>,
          ]}
        </Panel>
      </Overlay>
    )
  }
}

export default InfoPanel
