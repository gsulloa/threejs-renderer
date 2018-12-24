import React, { PureComponent, createRef } from "react"
import styled from "styled-components"
import { Overlay, Panel } from "../components/containers"
import { Title, Text } from "../components/text"
import { TitleInput, ContentInput } from "../components/form"
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
  background-color: ${({ selected }) =>
    selected ? "#008 !important" : "#fff"};
  border-color: ${({ selected }) =>
    selected ? "#4062d4 !important" : "#d9d9d9"};
  outline: none;
  :active {
    background-color: #008 !important;
    border-color: #4062d4;
  }
  :hover {
    background-color: #d9d9d9;
  }
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
                <Column key="options">
                  <Button onClick={this.handleChangeDefaultLook}>
                    Set Camera as Default
                  </Button>
                  <Button
                    onClick={this.handleToogleReplace}
                    selected={replacing}
                  >
                    Replace
                  </Button>
                  <Button onClick={this.handleRemoveAttachment}>Remove</Button>
                </Column>,
              ]}
        </Panel>
      </Overlay>
    )
  }
}

export default InfoPanel
