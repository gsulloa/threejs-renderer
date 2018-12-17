import React, { PureComponent } from "react"
import * as THREE from "three"

/*  TODO: use styled-components */
const styles = {
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexFlow: "column nowrap",
    display: "flex"
  },

  loadingBar: {
    width: "25em",
    height: "1em",
    borderRadius: "0.25em",
    backgroundColor: "black",
    border: "1px solid grey",
    display: "inline-flex",
  },
  progress: {
    height: "inherit",
    borderRadius: "inherit",
  }
}

class Loading extends PureComponent {
  static defaultProps = {
    last: true,
    title: "Downloading..."
  }
  state = {
    percentComplete: 1,
    backgroundColor: '#75b800',
    showLoading: true,
  }
  constructor(props) {
    super(props)
    this.frameID = null
  }
  animateBar = () => {
    const { percentComplete } = this.state
    if ( percentComplete >= 100 ) {
      this.setState({
        percentComplete: 100,
        backgroundColor: 'blue',
      })
    }
    this.frameID = requestAnimationFrame(this.animateBar)

  }

  onStart = () => {
    if (this.frameID !== null) return;
    this.animateBar();
  };

  onLoad = function ( ) {
    this.setState({ percentComplete: 0 })
    if (this.props.last) {
      this.setState({ showLoading: false })
      cancelAnimationFrame(this.frameID);
    }
  };
  
  onError = function ( e ) { 
    console.error( e ); 
    this.setState({
      backgroundColor: 'red'
    })
  }

  onProgress = ({ loaded, total }) => {
    this.setState({
      percentComplete: (loaded / total) * 100
    })
  }

  render() {
    const { percentComplete, showLoading, backgroundColor } = this.state
    const { title } = this.props
    if (!showLoading) return null
    return (
      <div style={styles.overlay}>
        <h2 style={{ color: "white" }}>{title}</h2>
        <div style={styles.loadingBar}>
            <span style={{
              width: `${percentComplete}%`,
              backgroundColor,
              ...styles.progress,
            }}></span>
        </div>
      </div>
    )
  }
}

export default Loading
