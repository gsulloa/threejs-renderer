import React, { Component, createRef } from "react"

import Renderer3D, { Renderer2D } from "../lib"

import Loading from "../lib/loading"
import InfoPanel from "../lib/infoPanel"
import Controls from "../lib/controls"

class App extends Component {
  state = {
    url: "https://s3.us-east-2.amazonaws.com/idea-files-s3/1508165679197",
    // url:
    //   "http://d2gg5obs453f89.cloudfront.net/1586141746501IMG_20191222_170033.jpg",
  }
  constructor(props) {
    super(props)
    this.render3d = createRef()
    this.loading = createRef()
    this.infoPanel = createRef()
    this.configGui = createRef()
    this.renderer = {}
    window.a = this.getCurrentState
  }
  componentDidMount() {
    this.loadModel()
  }

  loadModel = () => {
    const renderer = this.state.url.match(/\.(jpg|jpeg|png)$/i)
      ? Renderer2D
      : Renderer3D
    this.renderer = new renderer({
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
            data: {
              type: "image",
              content: "Change me description!",
              title: "Morita",
              screen_position: {
                position: {
                  x: 0,
                  y: 0,
                  z: 0,
                },
                rotation: {
                  x: -1.0957577276479316,
                  y: 0.15284281007523226,
                  z: 0.04952244607182217,
                },
              },
            },
            // { x: -106.01104736238287, y: 56.927966316339365, z: 7.105427357601002e-15 }
            position: {
              x: -105.535535098531,
              y: 205.2415755788482,
              z: 17.022181729049514,
            },
            id: "728060f0- c627 - 47d6- a998 - 921425685ff7",
          },
          {
            data: {
              content: "",
              title: "Clarita",
              screen_position: {
                position: {
                  x: 56.50612082693818,
                  y: 19.189864962634203,
                  z: 0,
                },
                rotation: {
                  x: -1.0957577276479316,
                  y: 0.15284281007523226,
                  z: 0.04952244607182217,
                },
              },
            },
            position: {
              x: 79.75266073679225,
              y: 164.11985474156236,
              z: 1.0520452128519466,
            },
            id: "20fc337c - 6df1 - 4cba - 8875 - c931784d8fd8",
          },
          {
            data: {
              content: "Change me description!",
              title: "Change me!",
              screen_position: {
                position: { x: 5, y: 151, z: 410 },
                rotation: {
                  x: -1.0957577276479316,
                  y: 0.15284281007523226,
                  z: 0.04952244607182217,
                },
              },
            },
            position: {
              x: 81.22726901487485,
              y: 8.487289134047359,
              z: 4.000000000000002,
            },
            id: "cccd4c9d - 8ed0 - 4458 - b6fa - c9fecb2fb1f1",
          },
          {
            data: {
              content: "Change me description!",
              title: "Change me!",
              screen_position: {
                position: { x: 5, y: 151, z: 410 },
                rotation: {
                  x: 1.633995837560991,
                  y: 0.049426731896162514,
                  z: -3.001684471665421,
                },
              },
            },
            position: {
              x: 79.17644702835447,
              y: 8.312991104178849,
              z: 1.9999999999999432,
            },
            id: "dbb3aa8b - e8c5 - 44bd - 9670 - 33b064c01e8d",
          },
          {
            data: {
              content: "Change me description!",
              title: "Change me!",
              screen_position: {
                position: { x: 5, y: 151, z: 410 },
                rotation: {
                  x: 1.633995837560991,
                  y: 0.049426731896162514,
                  z: -3.001684471665421,
                },
              },
            },
            position: {
              x: -23.23468538006437,
              y: 113.9457250317578,
              z: 5.551115123125783e-17,
            },
            id: "0daad22c - 8164 - 4219 - a137 - bfc8af34b98c",
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
        getCurrentState: console.log,
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
  getCurrentState = () => {
    return this.renderer.getCurrentState()
  }

  render() {
    return (
      <>
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
          <div style={{ width: "90%", height: "90%", position: "absolute" }}>
            <div
              ref={this.render3d}
              style={{ width: "90%", height: "90%", position: "relative" }}
            >
              <Loading ref={this.loading} />
              <InfoPanel ref={this.infoPanel} />
              <Controls />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default App
