import React, { Component, createRef } from "react"

import Loading from "./renderer3d/loading"
import Renderer3D from "./renderer3d"
import InfoPanel from "./renderer3d/infoPanel"
import ConfigGui from "./renderer3d/config/gui"
import Controls from "./renderer3d/controls";

class App extends Component {
  state = {
    url: "https://s3.us-east-2.amazonaws.com/idea-files-s3/1508165679197",
  }
  constructor(props) {
    super(props)
    this.render3d = createRef()
    this.loading = createRef()
    this.infoPanel = createRef()
    this.configGui = createRef()
    this.renderer = {}
  }

  loadModel = () => {
    this.renderer = new Renderer3D({
      modelUrl: this.state.url,
      loading: this.loading.current,
      infoPanel: this.infoPanel.current,
      container: this.render3d.current,
      configGui: this.configGui.current,
      initial: {
        position: {
          x: 17,
          y: 13,
          z: 550,
        },
        rotation: {
          x: 1.633995837560991,
          y: 0.049426731896162514,
          z: -3.001684471665421,
        },
      },
    })
    this.renderer.animate()
  }

  reset = () => {
    this.renderer.resetControls()
  }
  setCurrentAsInitial = () => {
    this.renderer.setCurrentAsInitial()
  }

  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            this.loadModel()
          }}
        >
          <input
            value={this.state.url}
            onChange={({ target: { value: url } }) => this.setState({ url })}
          />
        </form>
        <div ref={this.render3d}>
          <Loading ref={this.loading} />
          <InfoPanel ref={this.infoPanel} />
          <ConfigGui ref={this.configGui} />
          <Controls />
        </div>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.setCurrentAsInitial}>ChangeInitial</button>
      </div>
    )
  }
}

export default App
