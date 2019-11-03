import React, { Component, Fragment, createRef } from "react"
import PropTypes from "prop-types"
import { TitleInput, ContentInput } from "../components/form"
import config from "../config"
import { MaxLengthContainer } from "../components/containers"

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
      uuid: props.uuid,
      change: state.uuid === props.uuid,
    }
  }
  state = {
    titleHeight: 0,
    contentHeight: 0,
    title: this.props.title,
    content: this.props.content,
    uuid: this.props.uuid,
    change: true,
  }
  titleElement = createRef()
  contentElement = createRef()
  componentDidMount() {
    const { type } = this.props
    this.autoGrow("title")
    if (type === "text") this.autoGrow("content")
  }
  componentDidUpdate() {
    const { type } = this.props
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
    this.setState({
      [`${key}Height`]: this[`${key}Element`].current.scrollHeight,
    })
  }

  render() {
    const { show, type } = this.props
    if (!show) return null
    const { title, content, titleHeight, contentHeight } = this.state
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
      </Fragment>
    )
  }
}
export default EditingForm
