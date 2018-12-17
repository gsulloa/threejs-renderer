import React, { Component, createRef } from 'react';

import Loading from "./renderer3d/loading"
import Renderer3D from "./renderer3d"
 
class App extends Component {
  state = {
    url: 'https://s3.us-east-2.amazonaws.com/idea-files-s3/1508165679197'
  }
  constructor(props) {
    super(props)
    this.render3d = createRef()
    this.loading = createRef()
    this.renderer = {}
  }

  loadModel = () => {
    this.renderer = new Renderer3D({
      modelUrl: this.state.url,
      loading: this.loading.current,
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
    console.log(this.state)
    return (
      <div>
        <form onSubmit={e => { e.preventDefault();this.loadModel() }}>
          <input value={this.state.url} onChange={({ target: { value: url }}) => this.setState({ url })} />
        </form>
        <div ref={this.render3d}>
          <Loading ref={this.loading}/>
        </div>
        <button onClick={this.reset}>Reset</button>
        <button onClick={this.setCurrentAsInitial}>ChangeInitial</button>
      </div>
    );
  }
}

export default App;
