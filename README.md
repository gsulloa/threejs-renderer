# Renderer3D

## Install

```sh
yarn add renderer3d-model
```

## Usage

```js
  import React, { Component, createRef } from "react"

import Renderer3D, {
  Loading,
  InfoPanel,
  ConfigGui,
  Controls,
} from "./renderer3d"

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
  componentDidMount() {
    this.loadModel()
  }

  loadModel = () => {
    this.renderer = new Renderer3D({
      modelUrl: this.state.url,
      loading: this.loading.current,
      infoPanel: this.infoPanel.current,
      container: this.render3d.current,
      configGui: this.configGui.current,
      editable: true,
      initial: {
        orbit: {
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
        attachments: [
          {
            position: {
              x: 8.622963458826547,
              y: -15.567126364801993,
              z: 43.52801210469018,
            },
            data: {
              title: "Etiqueta 1",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
            },
          },
          {
            position: {
              x: 21.519644123023504,
              y: -12.001333004591629,
              z: 96.02675761908205,
            },
            data: {
              title: "Etiqueta 2",
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ligula dapibus, tempor nunc in, interdum ante. Etiam luctus et.",
              screenPosition: {
                rotation: {
                  x: 1.5699221202943565,
                  y: -0.007921343880529572,
                  z: -3.0901915692326813,
                },
                position: { x: -5, y: -1, z: 290 },
              },
            },
          },
        ],
      },
      callbacks: {
        addAttachment: console.log,
        removeAttachment: console.log,
        updateAttachmentData: console.log,
        updateAttachmentDefaultScreen: console.log,
        updateAttachmentPosition: console.log,
        updateDefaultOrbit: console.log,
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
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
        <div style={{ height: 800 }}>
          <div
            ref={this.render3d}
            style={{ width: 1200, height: 800, position: "absolute" }}
          >
            <Loading ref={this.loading} />
            <InfoPanel ref={this.infoPanel} />
            <ConfigGui ref={this.configGui} />
            <Controls />
          </div>
        </div>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.setCurrentAsInitial}>ChangeInitial</button>
      </div>
    )
  }
}

export default App

```
