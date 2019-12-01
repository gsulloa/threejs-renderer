import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { devlogerror } from "../utils/log"
import { CenteredOverlay, LoadingBar } from "../components/containers"
import { SubTitle } from "../components/text"

const ProgressBar = styled.span`
  height: inherit;
  border-radius: inherit;
  width: ${props => (props.width ? props.width : "1%")}
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#75b800"}
`

class Loading extends PureComponent {
  static propTypes = {
    last: PropTypes.bool,
  }
  static defaultProps = {
    last: true,
  }
  state = {
    percentComplete: 1,
    backgroundColor: "#75b800",
    showLoading: true,
  }
  constructor(props) {
    super(props)
    this.frameID = null
  }
  animateBar = () => {
    const { percentComplete } = this.state
    if (percentComplete >= 100) {
      this.setState({
        percentComplete: 100,
        backgroundColor: "blue",
      })
    }
    this.frameID = requestAnimationFrame(this.animateBar)
  }

  onStart = ({ title = "Downloading..." } = {}) => {
    this.setState({ title, showLoading: true })
    if (this.frameID !== null) return
    this.animateBar()
  }

  onLoad = function() {
    this.setState({ percentComplete: 0, showLoading: true })
    if (this.props.last) {
      this.setState({ showLoading: false })
      cancelAnimationFrame(this.frameID)
      this.frameID = null
    }
  }

  onError = function(e) {
    devlogerror(e)
    this.setState({
      backgroundColor: "red",
      title: "Error!",
    })
  }

  onProgress = ({ loaded, total }) => {
    this.setState({
      percentComplete: (loaded / total) * 100,
    })
  }

  render() {
    const { percentComplete, showLoading, backgroundColor, title } = this.state
    if (!showLoading) return null
    return (
      <CenteredOverlay>
        <SubTitle>{title}</SubTitle>
        <LoadingBar>
          <ProgressBar
            width={`${percentComplete}%`}
            backgroundColor={backgroundColor}
          />
        </LoadingBar>
      </CenteredOverlay>
    )
  }
}

export default Loading
