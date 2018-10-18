import React, { Component } from 'react';
import * as THREE  from "three"

 
class App extends Component {
  init(config) {
    config["camera"] = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    config["camera"].position.z = 1;
    config["scene"] = new THREE.Scene();
    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();
    config["mesh"] = new THREE.Mesh( geometry, material );
    config["scene"].add( config["mesh"] );
    config["renderer"] = new THREE.WebGLRenderer( { antialias: true } );
    config["renderer"].setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( config["renderer"].domElement );
  }
  
  animate(config) {
      requestAnimationFrame( () => this.animate(config) );
      config["mesh"].rotation.x += 0.01;
      config["mesh"].rotation.y += 0.02;
      config["renderer"].render( config["scene"], config["camera"] );
  }

  componentDidMount() {
    const config = {}
    console.log("preini", {...config})
    this.init(config)
    console.log("postini", {...config})
    this.animate(config)
    console.log("postanimate", {...config})
  }

  render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
}

export default App;
