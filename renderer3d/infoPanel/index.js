import React, { PureComponent, Fragment } from "react"
import styled from "styled-components"
import { Overlay, Panel, Tooltip } from "../components/containers"
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
    position: {},
  }
  componentDidMount() {
    config.object._editing.subscribe(() => {
      this.setState({ editing: config.object.editing })
    })
    config.object._replacing.subscribe(() => {
      this.setState({ replacing: config.object.replacing })
    })
  }
  showPanel = ({ title, content, uuid, position: { x, y, z } }) => {
    this.setState(() => ({
      show: true,
      title,
      content,
      uuid,
      position: { x: Math.floor(x), y: Math.floor(y), z: Math.floor(z) },
    }))
  }
  hidePanel = () => {
    this.setState(() => ({
      show: false,
      title: "",
      content: "",
      uuid: "",
      position: {},
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
  handleMoveAttachment({ x = 0, y = 0, z = 0 }) {
    config.controllers.attachmentsController.moveSelectedObject({ x, y, z })
    const { position } = this.state
    this.setState({
      position: {
        x: position.x + x,
        y: position.y + y,
        z: position.z + z,
      },
    })
  }
  handleClose = () => {
    this.hidePanel()
    // config.controllers.attachmentsController.deselectObjects()
    // config.controllers.objectController.resetControls()
  }
  render() {
    const {
      show,
      title,
      content,
      editing,
      replacing,
      uuid,
      position: { x, y, z },
    } = this.state
    return (
      <Overlay hidden={!show} width="300px" smWidth="100%">
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
                  <Tooltip text="Guardar posición inicial del marcador">
                    <Button onClick={this.handleChangeDefaultLook}>
                      <SavePosition width={30} height={30} />
                    </Button>
                  </Tooltip>
                  <Tooltip text="Reposicionar marcador">
                    <Button
                      onClick={this.handleToogleReplace}
                      selected={replacing}
                    >
                      <NewTarget width={30} height={30} />
                    </Button>
                  </Tooltip>
                  <Tooltip text="Eliminar marcador">
                    <Button onClick={this.handleRemoveAttachment}>
                      <Trash width={30} height={30} />
                    </Button>
                  </Tooltip>
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
                      <Text>X ({x})</Text>
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
                      <Text>Y ({y})</Text>
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
                      <Text>Z ({z})</Text>
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
          <Button onClick={this.handleClose}>Cerrar</Button>
        </Panel>
      </Overlay>
    )
  }
}

export default InfoPanel
