import React, { Component, createRef } from 'react';
import * as THREE  from "three"
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader"
 
class App extends Component {
  constructor(props) {
    super(props)
    this.render3d = createRef()
  }
  init(config) {
    config["camera"] = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    config["camera"].position.z = 250;
    // scene
    config["scene"] = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight( 0xcccccc, 1 );
    config["scene"].add( ambientLight );
    config["scene"].add( config["camera"] );
    // model
    const onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
      }
    };
    const onError = function ( xhr ) { };
    new MTLLoader()
      .setPath( 'models/obj/abdomen/' )
      .load( 'ToraxAbdomen2.mtl', function ( materials ) {
        materials.preload();
        new OBJLoader()
        .setMaterials( materials )
        .setPath( 'models/obj/abdomen/' )
        .load( 'ToraxAbdomen2.obj', function ( object ) {
          object.position.y = - 95;
          config["scene"].add( object );
          }, onProgress, onError );
      });
    //
    config["renderer"] = new THREE.WebGLRenderer();
    config["renderer"].setPixelRatio( window.devicePixelRatio );
    config["renderer"].setSize( window.innerWidth, window.innerHeight );
    this.render3d.current.appendChild( config["renderer"].domElement );
    this.onWindowResize(config)
    document.addEventListener( 'mousemove', e => this.onDocumentMouseMove(e, config), false );
    //
    window.addEventListener( 'resize',() => this.onWindowResize(config), false );
  }
  onWindowResize(config) {
    config["windowHalfX"] = window.innerWidth / 2;
    config["windowHalfY"] = window.innerHeight / 2;
    config["camera"].aspect = window.innerWidth / window.innerHeight;
    config["camera"].updateProjectionMatrix();
    config["renderer"].setSize( window.innerWidth, window.innerHeight );
  }
  onDocumentMouseMove( event, config ) {
    config["mouseX"] = ( event.clientX - config["windowHalfX"] ) / 2;
    config["mouseY"] = ( event.clientY - config["windowHalfY"] ) / 2;
  }
  //
  animate(config) {
    requestAnimationFrame( () => this.animate(config) );
    config["camera"].position.x += ( config["mouseX"] - config["camera"].position.x ) * .05;
    config["camera"].position.y += ( - config["mouseY"] - config["camera"].position.y ) * .05;
    config["camera"].lookAt( config["scene"].position );
    config["renderer"].render( config["scene"], config["camera"] );
  }

  componentDidMount() {
    const config = { mouseX: 0, mouseY: 0 }
    console.log("preini", {...config})
    this.init(config)
    console.log("postini", {...config})
    this.animate(config)
    console.log("postanimate", {...config})
  }

  render() {
    console.log("render")
    return (
      <div ref={this.render3d}></div>
    );
  }
}

export default App;
