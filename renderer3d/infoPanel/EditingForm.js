import React, { Component, Fragment, createRef } from "react"
import PropTypes from "prop-types"
import { TitleInput, ContentInput } from "../components/form"
import config from "../config"
import { MaxLengthContainer } from "../components/containers"
import { InverseCircleButton as Button } from "../components/button"

const MAX_LENGTH = { title: 30, content: 300 }

class EditingForm extends Component {
  static propTypes = {
    uuid: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    show: PropTypes.bool,
    type: PropTypes.string.isRequired,
  }
  static getDerivedStateFromProps(props, state) {
    return {
      title: state.uuid === props.uuid ? state.title : props.title,
      content: state.uuid === props.uuid ? state.content : props.content,
      type: state.uuid === props.uuid ? state.type : props.type,
      uuid: props.uuid,
      change: state.uuid === props.uuid,
    }
  }
  state = {
    titleHeight: 0,
    contentHeight: 0,
    title: this.props.title,
    content: this.props.content,
    type: this.props.type,
    uuid: this.props.uuid,
    change: true,
  }
  titleElement = createRef()
  contentElement = createRef()
  componentDidMount() {
    const { type } = this.state
    this.autoGrow("title")
    if (type === "text") this.autoGrow("content")
  }
  componentDidUpdate() {
    const { type } = this.state
    if (!this.state.change) {
      this.autoGrow("title")
      if (type === "text") this.autoGrow("content")
    }
  }
  handleWrite = (key, value) => {
    const text = value.slice(0, MAX_LENGTH[key])
    this.setState({ [key]: text }, () => {
      config.controllers.attachmentsController.updateSelectedData({
        [key]: text,
      })
      this.autoGrow(key)
    })
  }
  autoGrow = key => {
    this.reduceHeight(key, () => this.growHeight(key))
  }
  reduceHeight(key, cb = () => {}) {
    this.setState(
      {
        [`${key}Height`]: 5,
      },
      cb
    )
  }
  growHeight(key) {
    if (this[`${key}Element`])
      this.setState({
        [`${key}Height`]: this[`${key}Element`].current.scrollHeight,
      })
  }

  render() {
    const { show, showImageModal } = this.props
    if (!show) return null
    const { title, content, titleHeight, contentHeight, type } = this.state
    return (
      <Fragment>
        <TitleInput
          key="title"
          ref={this.titleElement}
          value={title}
          onChange={({ target: { value } }) => this.handleWrite("title", value)}
          height={titleHeight}
        />
        <MaxLengthContainer>
          {title.length} / {MAX_LENGTH.title}
        </MaxLengthContainer>
        <select
          value={type}
          onChange={({ target: { value } }) => this.handleWrite("type", value)}
        >
          <option value="text">Texto</option>
          <option value="image">Imagen Microscópica</option>
        </select>
        {type === "text" && (
          <>
            <ContentInput
              key="content"
              ref={this.contentElement}
              value={content}
              onChange={({ target: { value } }) =>
                this.handleWrite("content", value)
              }
              height={contentHeight}
            />
            <MaxLengthContainer>
              {content.length} / {MAX_LENGTH.content}
            </MaxLengthContainer>
          </>
        )}
        {type === "image" && (
          <>
            <Button onClick={showImageModal}>Ver</Button>
          </>
        )}
      </Fragment>
    )
  }
}
export default EditingForm
