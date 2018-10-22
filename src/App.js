import React, { Component, createRef } from 'react';

import Renderer3D from "./renderer3d"
 
class App extends Component {
  constructor(props) {
    super(props)
    this.render3d = createRef()
    this.renderer = {}
  }
  
  componentDidMount() {
    this.renderer = new Renderer3D({
      container: this.render3d.current,
    })
    this.renderer.animate()
  }
  
  reset = () => {
    this.renderer.resetControls()
    console.log("reset")
  }

  render() {
    console.log("render")
    return (
      <div>
        <div ref={this.render3d}></div>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default App;
