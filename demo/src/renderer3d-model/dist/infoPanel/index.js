import React, { PureComponent, Fragment } from "react"
import styled from "styled-components"
import { Overlay, Panel } from "../components/containers"
import { Title, Text, SubTitle } from "../components/text"
import { InverseCircleButton as Button } from "../components/button"
import config from "../config"
import EditingForm from "./EditingForm"
import { SavePosition, NewTarget, Trash } from "../assets/icons"

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

class InfoPanel extends PureComponent {
  state = {
    show: false,
    title: "",
    content: "",
    uuid: "",
    editing: config.object.editing,
    replacing: config.object.replacing,
  }
  componentDidMount() {
    config.object._editing.subscribe(() => {
      this.setState({ editing: config.object.editing })
    })
    config.object._replacing.subscribe(() => {
      this.setState({ replacing: config.object.replacing })
    })
  }
  showPanel = ({ title, content, uuid }) => {
    this.setState(() => ({
      show: true,
      title,
      content,
      uuid,
    }))
  }
  hidePanel = () => {
    this.setState(() => ({
      show: false,
      title: "",
      content: "",
      uuid: "",
    }))
  }
  handleChangeDefaultLook = () => {
    config.controllers.attachmentsController.updateScreenPosition()
  }
  handleRemoveAttachment = () => {
    if (window.confirm(`Do yo really want to remove ${this.state.title}`)) {
      this.hidePanel()
      config.controllers.attachmentsController.removeSelectedAttachment()
      config.controllers.objectController.resetControls()
      config.controllers.attachmentsController.replaceAllNumbers()
    }
  }
  handleToogleReplace = () => {
    config.object.replacing = !config.object.replacing
  }
  handleMoveAttachment({ x, y, z }) {
    config.controllers.attachmentsController.moveSelectedObject({ x, y, z })
  }
  render() {
    const { show, title, content, editing, replacing, uuid } = this.state
    return (
      <Overlay hidden={!show} width="300px">
        <Panel>
          {!editing ? (
            <Fragment>
              <Title>{title}</Title>
              <Text>{content}</Text>
            </Fragment>
          ) : (
            show && (
              <Fragment>
                <EditingForm
                  title={title}
                  content={content}
                  show={show}
                  uuid={uuid}
                />
                <hr />
                <Row>
                  <Button onClick={this.handleChangeDefaultLook}>
                    <SavePosition width={30} height={30}/>
                  </Button>
                  <Button
                    onClick={this.handleToogleReplace}
                    selected={replacing}
                  >
                    <NewTarget width={30} height={30}/>
                  </Button>
                  <Button onClick={this.handleRemoveAttachment}>
                    <Trash width={30} height={30}/>
                  </Button>
                </Row>
                <Column key="dx-move">
                  <Row>
                    <SubTitle>Posición</SubTitle>
                  </Row>
                  <Row>
                    <Column>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ x: 1 })}
                      >
                        <span>+</span>
                      </Button>
                      <Text>X</Text>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ x: -1 })}
                      >
                        <span>-</span>
                      </Button>
                    </Column>
                    <Column>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ y: 1 })}
                      >
                        <span>+</span>
                      </Button>
                      <Text>Y</Text>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ y: -1 })}
                      >
                        <span>-</span>
                      </Button>
                    </Column>
                    <Column>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ z: 1 })}
                      >
                        <span>+</span>
                      </Button>
                      <Text>Z</Text>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ z: -1 })}
                      >
                        <span>-</span>
                      </Button>
                    </Column>
                  </Row>
                </Column>
              </Fragment>
            )
          )}
        </Panel>
      </Overlay>
    )
  }
}

export default InfoPanel
