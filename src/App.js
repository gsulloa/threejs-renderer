import React, { Component, createRef } from 'react';

import Renderer3D from "./Renderer3D"
 
class App extends Component {
  constructor(props) {
    super(props)
    this.render3d = createRef()
  }
  
  componentDidMount() {
    const renderer = new Renderer3D({
      container: this.render3d.current,
    })
    renderer.animate()
  }

  render() {
    console.log("render")
    return (
      <div ref={this.render3d}></div>
    );
  }
}

export default App;
