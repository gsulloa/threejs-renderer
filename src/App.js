import React, { Component, createRef } from 'react';

import Renderer3D from "./renderer3d"
 
class App extends Component {
  constructor(props) {
    super(props)
    this.render3d = createRef()
    this.loadingOverlay = createRef()
    this.progress = createRef()
    this.renderer = {}
  }
  
  componentDidMount() {
    this.renderer = new Renderer3D({
      loadingContainers: {
        overlay: this.loadingOverlay.current,
        progress: this.progress.current,
      },
      container: this.render3d.current,
      initial: {
        position: {
          x: 17,
          y: 13,
          z: 580,
        },
        rotation: {
          x: -1.516631,
          y: 0.088158,
          z: 0.234383311,
        }
      }
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
    console.log("render")
    return (
      <div>
        <div ref={this.render3d}>

          <div ref={this.loadingOverlay} id="loading-overlay">
            <div id="loading-bar">
                <span ref={this.progress} id="progress"></span>
            </div>
          </div>
        </div>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.setCurrentAsInitial}>ChangeInitial</button>
      </div>
    );
  }
}

export default App;
