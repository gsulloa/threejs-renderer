import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { devlogerror } from "../utils/log"

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  display: flex;
`
const LoadingBar = styled.div`
  width: 25em;
  height: 1em;
  border-radius: 0.25em;
  background-color: black;
  border: 1px solid grey;
  display: inline-flex;
`

const ProgressBar = styled.span`
  height: inherit;
  border-radius: inherit;
  width: ${props => (props.width ? props.width : "1%")}
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "#75b800"}
`

const Title = styled.h2`
  color: #fff;
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
    this.setState({ title })
    if (this.frameID !== null) return
    this.animateBar()
  }

  onLoad = function() {
    this.setState({ percentComplete: 0 })
    if (this.props.last) {
      this.setState({ showLoading: false })
      cancelAnimationFrame(this.frameID)
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
      <Overlay>
        <Title>{title}</Title>
        <LoadingBar>
          <ProgressBar
            width={`${percentComplete}%`}
            backgroundColor={backgroundColor}
          />
        </LoadingBar>
      </Overlay>
    )
  }
}

export default Loading
