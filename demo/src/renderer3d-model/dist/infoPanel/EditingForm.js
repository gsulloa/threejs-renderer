import React, { Component, Fragment, createRef } from "react"
import PropTypes from "prop-types"
import { TitleInput, ContentInput } from "../components/form"
import config from "../config"

class EditingForm extends Component {
  static propTypes = {
    uuid: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    show: PropTypes.bool,
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
    this.autoGrow("title")
    this.autoGrow("content")
  }
  componentDidUpdate() {
    if (!this.state.change) {
      this.autoGrow("title")
      this.autoGrow("content")
    }
  }
  handleWrite = (key, value) => {
    this.setState({ [key]: value }, () => {
      config.controllers.attachmentsController.updateSelectedData({
        [key]: value,
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
    const { show } = this.props
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
        />{" "}
        <ContentInput
          key="content"
          ref={this.contentElement}
          value={content}
          onChange={({ target: { value } }) =>
            this.handleWrite("content", value)
          }
          height={contentHeight}
        />{" "}
      </Fragment>
    )
  }
}
export default EditingForm
