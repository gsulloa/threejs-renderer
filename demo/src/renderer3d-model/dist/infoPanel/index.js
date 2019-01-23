import React, { PureComponent, createRef } from "react"
import styled from "styled-components"
import { Overlay, Panel } from "../components/containers"
import { Title, Text, SubTitle } from "../components/text"
import { TitleInput, ContentInput } from "../components/form"
import { InverseCircleButton as Button } from "../components/button"
import config from "../config"

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
    editing: config.object.editing,
    replacing: config.object.replacing,
    titleHeight: 10,
    contentHeight: 10,
  }
  constructor(props) {
    super(props)
    this.titleElement = createRef()
    this.contentElement = createRef()
  }
  componentDidMount() {
    config.object._editing.subscribe(() => {
      this.setState({ editing: config.object.editing })
    })
    config.object._replacing.subscribe(() => {
      this.setState({ replacing: config.object.replacing })
    })
  }
  showPanel = ({ title, content }) => {
    this.setState(() => ({
      show: true,
      title,
      content,
    }))
    this.prepareForm()
  }
  prepareForm = () => {
    if (!this.state.editing) return
    this.autoGrow("title")
    this.autoGrow("content")
    this.titleElement.current.focus()
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
  handleWrite = (key, value) => {
    this.setState({ [key]: value }, () => {
      config.controllers.attachmentsController.updateSelectedData({
        [key]: value,
      })
      this.autoGrow(key)
    })
  }
  autoGrow(key) {
    this.setState(
      {
        [`${key}Height`]: 5,
      },
      () => {
        this.setState({
          [`${key}Height`]: this[`${key}Element`].current.scrollHeight,
        })
      }
    )
  }
  handleMoveAttachment({ x, y, z }) {
    config.controllers.attachmentsController.moveSelectedObject({ x, y, z })
  }
  render() {
    const {
      show,
      title,
      content,
      editing,
      replacing,
      titleHeight,
      contentHeight,
    } = this.state
    return (
      <Overlay hidden={!show} width="300px">
        <Panel>
          {!editing
            ? [
                <Title key="title">{title}</Title>,
                <Text key="content">{content}</Text>,
              ]
            : [
                <TitleInput
                  key="title"
                  ref={this.titleElement}
                  value={title}
                  onChange={({ target: { value } }) =>
                    this.handleWrite("title", value)
                  }
                  height={titleHeight}
                />,
                <ContentInput
                  key="content"
                  ref={this.contentElement}
                  value={content}
                  onChange={({ target: { value } }) =>
                    this.handleWrite("content", value)
                  }
                  height={contentHeight}
                />,
                <hr key="divider" />,
                <Row key="options">
                  <Button onClick={this.handleChangeDefaultLook}>
                    <svg viewBox="0 0 60 60" width="30px" height="30px">
                      <path d="M40.693,17.777H36v-5c0-1.654-1.346-3-3-3H1c-0.552,0-1,0.447-1,1s0.448,1,1,1h32c0.551,0,1,0.448,1,1v5H3.307   C1.483,17.777,0,19.261,0,21.084v25.387c0,1.823,1.483,3.307,3.307,3.307h37.386c1.824,0,3.307-1.483,3.307-3.307V21.084   C44,19.261,42.517,17.777,40.693,17.777z" />
                      <path d="M56.234,17.332c-0.545,0-1.077,0.117-1.58,0.35L46,22.138v23.279l8.654,4.456c0.503,0.232,1.035,0.35,1.58,0.35   c2.076,0,3.766-1.69,3.766-3.77V21.102C60,19.022,58.311,17.332,56.234,17.332z" />
                    </svg>
                  </Button>
                  <Button
                    onClick={this.handleToogleReplace}
                    selected={replacing}
                  >
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 430.114 430.114"
                    >
                      <path d="M356.208,107.051c-1.531-5.738-4.64-11.852-6.94-17.205C321.746,23.704,261.611,0,213.055,0   C148.054,0,76.463,43.586,66.905,133.427v18.355c0,0.766,0.264,7.647,0.639,11.089c5.358,42.816,39.143,88.32,64.375,131.136   c27.146,45.873,55.314,90.999,83.221,136.106c17.208-29.436,34.354-59.259,51.17-87.933c4.583-8.415,9.903-16.825,14.491-24.857   c3.058-5.348,8.9-10.696,11.569-15.672c27.145-49.699,70.838-99.782,70.838-149.104v-20.262   C363.209,126.938,356.581,108.204,356.208,107.051z M214.245,199.193c-19.107,0-40.021-9.554-50.344-35.939   c-1.538-4.2-1.414-12.617-1.414-13.388v-11.852c0-33.636,28.56-48.932,53.406-48.932c30.588,0,54.245,24.472,54.245,55.06   C270.138,174.729,244.833,199.193,214.245,199.193z" />
                    </svg>
                  </Button>
                  <Button onClick={this.handleRemoveAttachment}>
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 408.483 408.483"
                    >
                      <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316    H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293    c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329    c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355    c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356    c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z" />
                      <path d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916    c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z" />
                    </svg>
                  </Button>
                </Row>,
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
                        +
                      </Button>
                      <Text>X</Text>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ x: -1 })}
                      >
                        -
                      </Button>
                    </Column>
                    <Column>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ y: 1 })}
                      >
                        +
                      </Button>
                      <Text>Y</Text>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ y: -1 })}
                      >
                        -
                      </Button>
                    </Column>
                    <Column>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ z: 1 })}
                      >
                        +
                      </Button>
                      <Text>Z</Text>
                      <Button
                        size={30}
                        onClick={() => this.handleMoveAttachment({ z: -1 })}
                      >
                        -
                      </Button>
                    </Column>
                  </Row>
                </Column>,
              ]}
        </Panel>
      </Overlay>
    )
  }
}

export default InfoPanel
